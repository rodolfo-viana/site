document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('mobile-menu-button');
    const navMenu = document.getElementById('nav-menu');

    menuButton.addEventListener('click', function() {
        menuButton.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        // Don't handle clicks if they're on or within the search button/modal
        const searchButton = document.getElementById('search-button');
        const searchModal = document.getElementById('searchModal');
        const isSearchInteraction = searchButton && (
            searchButton.contains(event.target) || 
            (searchModal && searchModal.contains(event.target))
        );
        
        if (isSearchInteraction) {
            return;  // Just return without stopping propagation
        }

        // Only close menu if click is outside menu and button
        if (!menuButton.contains(event.target) && !navMenu.contains(event.target)) {
            menuButton.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });  // Remove capture phase

    // Close menu when clicking navigation items (except search button and modal)
    navMenu.addEventListener('click', (event) => {
        const isSearchButton = event.target.closest('#search-button');
        const isSearchModal = event.target.closest('#searchModal');
        const isNavLink = event.target.tagName === 'A';
        
        if (isSearchButton) {
            // Let the search button click event handle normally
            return;
        }
        
        if (isNavLink && !isSearchModal) {
            menuButton.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});
