document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('mobile-menu-button');
    const navMenu = document.getElementById('nav-menu');

    menuButton.addEventListener('click', function() {
        menuButton.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        // Only close menu if click is outside menu and button
        if (!menuButton.contains(event.target) && !navMenu.contains(event.target)) {
            menuButton.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });  // Remove capture phase

    // Close menu when clicking navigation items (except search button and modal)
    navMenu.addEventListener('click', (event) => {
        const isNavLink = event.target.tagName === 'A';
        
        if (isNavLink) {
            menuButton.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});
