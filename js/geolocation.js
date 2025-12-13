/**
 * Geolocation-based language detection for Zola multilingual site
 * Detects if user is in Brazil and redirects to appropriate language version
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        storageKey: 'site-language-preference',
        geoStorageKey: 'site-geo-detected',
        apiUrl: 'https://ipapi.co/json/',
        brazilCountryCode: 'BR',
        englishPath: '/en/',
        portuguesePath: '/',
        cacheExpiry: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
    };

    /**
     * Get stored preference with expiry check
     */
    function getStoredPreference(key) {
        try {
            const stored = localStorage.getItem(key);
            if (!stored) return null;
            
            const data = JSON.parse(stored);
            if (Date.now() > data.expiry) {
                localStorage.removeItem(key);
                return null;
            }
            return data.value;
        } catch (e) {
            return null;
        }
    }

    /**
     * Store preference with expiry
     */
    function storePreference(key, value) {
        try {
            const data = {
                value: value,
                expiry: Date.now() + CONFIG.cacheExpiry
            };
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            // localStorage might be disabled
        }
    }

    /**
     * Get current language from URL
     */
    function getCurrentLanguage() {
        return window.location.pathname.startsWith(CONFIG.englishPath) ? 'en' : 'pt';
    }

    /**
     * Check if we're on homepage (root or /en/)
     */
    function isHomepage() {
        const path = window.location.pathname;
        return path === CONFIG.portuguesePath || path === CONFIG.englishPath;
    }

    /**
     * Detect user's country using IP geolocation
     */
    async function detectCountry() {
        try {
            const response = await fetch(CONFIG.apiUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Geolocation API failed');
            }
            
            const data = await response.json();
            return data.country_code;
        } catch (error) {
            console.warn('Geolocation detection failed:', error);
            return null;
        }
    }

    /**
     * Get browser language preference
     */
    function getBrowserLanguage() {
        const lang = navigator.language || navigator.userLanguage;
        return lang.startsWith('pt') ? 'pt' : 'en';
    }

    /**
     * Perform language redirect
     */
    function redirectToLanguage(targetLang) {
        const currentLang = getCurrentLanguage();
        
        if (currentLang === targetLang) {
            return; // Already on correct language
        }

        const currentPath = window.location.pathname;
        let newPath;

        if (targetLang === 'pt') {
            // Redirect to Portuguese (remove /en/ prefix)
            newPath = currentPath.replace(/^\/en/, '') || CONFIG.portuguesePath;
        } else {
            // Redirect to English (add /en/ prefix)
            newPath = currentPath.startsWith(CONFIG.englishPath) 
                ? currentPath 
                : CONFIG.englishPath.slice(0, -1) + currentPath;
        }

        if (newPath !== currentPath) {
            window.location.href = newPath + window.location.search + window.location.hash;
        }
    }

    /**
     * Main geolocation detection logic
     */
    async function performGeolocationDetection() {
        // Check if we have a manual language preference
        const manualPreference = getStoredPreference(CONFIG.storageKey);
        if (manualPreference) {
            console.log('Using stored language preference:', manualPreference);
            return; // Respect manual choice
        }

        // Check if we already detected geo recently
        const geoDetected = getStoredPreference(CONFIG.geoStorageKey);
        if (geoDetected) {
            console.log('Using cached geo detection:', geoDetected);
            redirectToLanguage(geoDetected);
            return;
        }

        // Only run detection on homepage to avoid disrupting deep links
        if (!isHomepage()) {
            return;
        }

        console.log('Performing geolocation detection...');
        
        const countryCode = await detectCountry();
        let targetLanguage;

        if (countryCode === CONFIG.brazilCountryCode) {
            targetLanguage = 'pt';
            console.log('Brazilian user detected, using Portuguese');
        } else if (countryCode) {
            targetLanguage = 'en';
            console.log('Non-Brazilian user detected, using English');
        } else {
            // Fallback to browser language
            targetLanguage = getBrowserLanguage();
            console.log('Geolocation failed, using browser language:', targetLanguage);
        }

        // Store the geo-detected preference
        storePreference(CONFIG.geoStorageKey, targetLanguage);
        
        // Perform redirect
        redirectToLanguage(targetLanguage);
    }

    /**
     * Manual language switcher function (exposed globally)
     */
    window.switchLanguage = function(language) {
        console.log('Manual language switch to:', language);
        
        // Store manual preference
        storePreference(CONFIG.storageKey, language);
        
        // Clear geo detection to prevent override
        localStorage.removeItem(CONFIG.geoStorageKey);
        
        // Perform redirect
        redirectToLanguage(language);
    };

    /**
     * Get current language for UI updates
     */
    window.getCurrentSiteLanguage = function() {
        return getCurrentLanguage();
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', performGeolocationDetection);
    } else {
        performGeolocationDetection();
    }

})();
