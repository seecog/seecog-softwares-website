/**
 * Mobile Menu JavaScript
 * Handles the new custom mobile hamburger menu
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        const toggle = document.getElementById('mobileMenuToggle');
        const overlay = document.getElementById('mobileMenuOverlay');
        const panel = document.getElementById('mobileMenuPanel');
        const menuLinks = document.querySelectorAll('.mobile-menu-nav a');

        if (!toggle || !overlay || !panel) {
            return; // Exit if elements don't exist
        }

        // Toggle menu function
        function toggleMenu() {
            toggle.classList.toggle('active');
            overlay.classList.toggle('active');
            panel.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (panel.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }

        // Close menu function
        function closeMenu() {
            toggle.classList.remove('active');
            overlay.classList.remove('active');
            panel.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Toggle button click
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });

        // Overlay click to close
        overlay.addEventListener('click', function() {
            closeMenu();
        });

        // Close menu when clicking on a link
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                // Small delay to allow navigation
                setTimeout(function() {
                    closeMenu();
                }, 300);
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && panel.classList.contains('active')) {
                closeMenu();
            }
        });

        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                // Close menu if window is resized to desktop size
                if (window.innerWidth > 991) {
                    closeMenu();
                }
            }, 250);
        });

        // Set active menu item based on current page
        const currentPath = window.location.pathname;
        menuLinks.forEach(function(link) {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    });
})();

