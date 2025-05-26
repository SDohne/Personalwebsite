/*
=================================================================
SEBASTIAN DOHNE PROFESSIONAL PORTFOLIO - MAIN JAVASCRIPT FILE
=================================================================
This file handles all the interactive functionality of the website.
It's organized into clear sections for easy understanding and maintenance.

MAIN FEATURES:
- Page navigation (single-page app)
- PDF document viewing in modal
- GitHub link functionality for each project
- Smooth animations and transitions
- Keyboard accessibility
- Mobile-responsive interactions
*/

// Wait for the page to fully load before running any JavaScript
// This ensures all HTML elements are available for us to work with
document.addEventListener('DOMContentLoaded', function() {
    
    /*
    =================================================================
    GETTING REFERENCES TO HTML ELEMENTS
    =================================================================
    This section finds and stores references to the HTML elements
    we need to interact with throughout the script.
    */
    
    // Navigation elements
    const navigationButtons = document.querySelectorAll('.nav-button');
    const allPages = document.querySelectorAll('.page-content');
    
    // Project portfolio elements
    const projectCards = document.querySelectorAll('.project-card');
    const documentModal = document.getElementById('pdfModal');
    const pdfViewerFrame = document.getElementById('pdfViewer');
    const modalCloseButton = document.querySelector('.modal-close');
    
    // Footer year element
    const currentYearSpan = document.getElementById('current-year');
    
    /*
    =================================================================
    INITIAL SETUP WHEN PAGE LOADS
    =================================================================
    */
    
    // Set the current year in the footer automatically
    // This keeps the copyright notice up-to-date without manual changes
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    /*
    =================================================================
    NAVIGATION FUNCTIONALITY
    =================================================================
    This section handles switching between different pages (Portfolio, About, etc.)
    without actually reloading the webpage - creating a smooth user experience.
    */
    
    // Function to switch to a specific page
    function switchToPage(targetPageId) {
        // Hide all pages first
        allPages.forEach(function(page) {
            page.classList.remove('active');
        });
        
        // Show the target page
        const targetPage = document.getElementById(targetPageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Update the browser URL (the address bar) without refreshing the page
        // This allows users to bookmark specific pages and use back/forward buttons
        window.history.pushState({page: targetPageId}, '', '#' + targetPageId);
    }
    
    // Add click event listeners to all navigation buttons
    navigationButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            // Prevent the default link behavior (which would reload the page)
            event.preventDefault();
            
            // Get which page this button should show
            const targetPageId = button.getAttribute('data-page');
            
            // Switch to that page
            switchToPage(targetPageId);
        });
    });
    
    // Handle browser back/forward button clicks
    // This ensures navigation works properly when users use browser buttons
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.page) {
            // Switch to the page stored in browser history
            switchToPage(event.state.page);
        } else {
            // If no specific page in history, show home page
            switchToPage('home');
        }
    });
    
    // Handle direct links to specific pages (e.g., yoursite.com#about)
    // This runs when someone visits a direct link to a specific page
    function handleInitialPageLoad() {
        const urlHash = window.location.hash.substring(1); // Remove the # symbol
        if (urlHash && document.getElementById(urlHash)) {
            switchToPage(urlHash);
        } else {
            // If no valid hash, make sure home page is shown
            switchToPage('home');
        }
    }
    
    // Run initial page load handling
    handleInitialPageLoad();
    
    /*
    =================================================================
    PROJECT CARD FUNCTIONALITY
    =================================================================
    This section handles the interactive features of project cards:
    - Opening PDF documents in a modal viewer
    - Opening GitHub repositories in new tabs
    */
    
// Function to open a PDF document in the modal viewer
function openPdfModal(pdfPath) {
    if (!pdfPath) {
        // Show a helpful message if no PDF is available
        alert('PDF document not yet available for this project. Please check back later or contact me for more information.');
        return;
    }
    
    // Show the modal
    documentModal.style.display = 'flex';
    
// Simple direct PDF loading
console.log('Loading PDF from:', pdfPath);
pdfViewerFrame.src = pdfPath;
    
    // Prevent the background page from scrolling while modal is open
    document.body.style.overflow = 'hidden';
    
    // Add a loading indicator while PDF loads
    showLoadingIndicator();
}
    
    // Function to open a GitHub repository in a new tab
    function openGitHubRepository(githubUrl) {
        if (!githubUrl) {
            // Show message if no GitHub link is available
            alert('GitHub repository not yet available for this project. Please check back later.');
            return;
        }
        
        // Open GitHub link in a new tab
        window.open(githubUrl, '_blank', 'noopener,noreferrer');
    }
    
    // Function to close the PDF modal
    function closePdfModal() {
        documentModal.style.display = 'none';
        pdfViewerFrame.src = ''; // Clear the PDF to free up memory
        document.body.style.overflow = 'auto'; // Restore page scrolling
        hideLoadingIndicator();
    }
    
    // Function to show loading indicator while PDF loads
    function showLoadingIndicator() {
        // You can add a loading spinner here if desired
        // For now, we'll keep it simple
        console.log('Loading PDF...');
    }
    
    // Function to hide loading indicator
    function hideLoadingIndicator() {
        console.log('PDF loaded');
    }
    
    // Add event listeners to all project cards
    projectCards.forEach(function(card) {
        // Get the PDF and GitHub URLs from the card's data attributes
        const pdfPath = card.getAttribute('data-pdf');
        const githubUrl = card.getAttribute('data-github');
        
        // Find the action buttons within this card
        const pdfButton = card.querySelector('.pdf-button');
        const githubButton = card.querySelector('.github-button');
        
        // Add click handler for PDF/Report button
        if (pdfButton) {
            pdfButton.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent card click from also firing
                openPdfModal(pdfPath);
            });
        }
        
        // Add click handler for GitHub/Code button
        if (githubButton) {
            githubButton.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent card click from also firing
                openGitHubRepository(githubUrl);
            });
        }
        
        // Optional: Make entire card clickable to open PDF (for convenience)
        // Uncomment the lines below if you want this behavior
        /*
        card.addEventListener('click', function(event) {
            // Only trigger if user didn't click on a button
            if (!event.target.classList.contains('action-button')) {
                openPdfModal(pdfPath);
            }
        });
        */
    });
    
    /*
    =================================================================
    MODAL WINDOW CONTROLS
    =================================================================
    This section handles opening and closing the PDF viewer modal.
    */
    
    // Close modal when the X button is clicked
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', closePdfModal);
    }
    
    // Close modal when clicking outside the content area (on dark background)
    if (documentModal) {
        documentModal.addEventListener('click', function(event) {
            // Only close if user clicked on the modal background, not the content
            if (event.target === documentModal) {
                closePdfModal();
            }
        });
    }
    
    // Close modal when Escape key is pressed (accessibility feature)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && documentModal && documentModal.style.display === 'flex') {
            closePdfModal();
        }
    });
    
    /*
    =================================================================
    SMOOTH SCROLL ANIMATIONS
    =================================================================
    This section adds smooth animations as elements come into view while scrolling.
    This creates a more engaging and professional user experience.
    */
    
    // Check if the browser supports Intersection Observer (for animations)
    if (window.IntersectionObserver) {
        // Settings for when to trigger animations
        const animationSettings = {
            threshold: 0.1, // Trigger when 10% of element is visible
            rootMargin: '0px 0px -50px 0px' // Start animation before element fully enters view
        };
        
        // Create the observer that watches for elements entering the viewport
        const scrollAnimationObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    // Element is now visible, so animate it in
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Stop observing this element (animation only happens once)
                    scrollAnimationObserver.unobserve(entry.target);
                }
            });
        }, animationSettings);
        
        // Find all elements that should have scroll animations
        const elementsToAnimate = document.querySelectorAll(
            '.project-card, .training-card, .publication-card, .about-layout'
        );
        
        // Set up initial animation state and start observing each element
        elementsToAnimate.forEach(function(element) {
            // Set initial state (invisible and slightly down)
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            // Start watching this element for when it enters the viewport
            scrollAnimationObserver.observe(element);
        });
    }
    
    /*
    =================================================================
    KEYBOARD ACCESSIBILITY
    =================================================================
    This section ensures the website works well for users who navigate
    with keyboards instead of a mouse (important for accessibility).
    */
    
    // Make project cards keyboard-accessible
    projectCards.forEach(function(card, index) {
        // Make the card focusable with Tab key
        card.setAttribute('tabindex', '0');
        
        // Handle keyboard interactions
        card.addEventListener('keypress', function(event) {
            // Trigger click when Enter or Space is pressed
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                
                // Get the PDF path and open it
                const pdfPath = card.getAttribute('data-pdf');
                openPdfModal(pdfPath);
            }
        });
        
        // Add visual focus indicator
        card.addEventListener('focus', function() {
            card.style.outline = '2px solid var(--primary-color)';
            card.style.outlineOffset = '2px';
        });
        
        card.addEventListener('blur', function() {
            card.style.outline = 'none';
        });
    });
    
    /*
    =================================================================
    EXTERNAL LINK HANDLING
    =================================================================
    This section ensures external links (like social media) open in new tabs
    so users don't navigate away from your portfolio accidentally.
    */
    
    // Find all external links (links that go to other websites)
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="https"]');
    
    externalLinks.forEach(function(link) {
        // Only modify links that don't already specify where to open
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank'); // Open in new tab
            link.setAttribute('rel', 'noopener noreferrer'); // Security best practice
        }
    });
    
    /*
    =================================================================
    PERFORMANCE OPTIMIZATIONS
    =================================================================
    This section includes code to make the website run smoothly
    and efficiently, especially on slower devices.
    */
    
    // Debounce window resize events to improve performance
    // This prevents excessive calculations when the window is being resized
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Perform any necessary layout recalculations here
            // Currently, CSS Grid handles most responsive behavior automatically
            console.log('Window resized - layout updated');
        }, 250);
    });
    
    /*
    =================================================================
    ERROR HANDLING
    =================================================================
    This section gracefully handles potential errors to prevent
    the website from breaking if something goes wrong.
    */
    
    // Handle PDF loading errors
    if (pdfViewerFrame) {
        pdfViewerFrame.addEventListener('error', function() {
            // Show user-friendly error message instead of broken PDF
            const errorMessage = `
                <div style="text-align: center; padding: 2rem; color: #e74c3c;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p><strong>Unable to load document</strong></p>
                    <p style="font-size: 0.9rem; color: #7f8c8d; margin-top: 1rem;">
                        This document couldn't be loaded. Please try again later or 
                        <a href="mailto:sebdohne@gmail.com" style="color: #3498db;">contact me directly</a>.
                    </p>
                </div>
            `;
            pdfViewerFrame.parentElement.innerHTML = errorMessage;
        });
    }
    
    // Global error handler for any uncaught JavaScript errors
    window.addEventListener('error', function(event) {
        console.log('An error occurred:', event.error);
        // In a production website, you might want to send error reports to a service
        // For now, we'll just log it and continue
    });

    /*
=================================================================
EXPANDABLE TRAINING CARDS FUNCTIONALITY
=================================================================
Add this code to your existing script.js file, inside the main 
DOMContentLoaded event listener (after the existing code sections)
*/

/*
=================================================================
EXPANDABLE INSTITUTION CARDS FUNCTIONALITY
=================================================================
This section handles the expand/collapse functionality for 
institution training cards (Imperial College, Exeter, etc.)
*/

// Get all institution cards
const institutionCards = document.querySelectorAll('.institution-card');

// Function to toggle institution card expansion
function toggleInstitutionCard(card) {
    const modulesContent = card.querySelector('.modules-content');
    const expandIcon = card.querySelector('.expand-icon i');
    const isExpanded = card.classList.contains('expanded');
    
    if (isExpanded) {
        // Collapse the card
        card.classList.remove('expanded');
        modulesContent.style.display = 'none';
        expandIcon.style.transform = 'rotate(0deg)';
        
        // Smooth scroll to card top when collapsing
        card.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    } else {
        // Expand the card
        card.classList.add('expanded');
        modulesContent.style.display = 'block';
        expandIcon.style.transform = 'rotate(180deg)';
        
        // Optional: Close other expanded cards (uncomment if you want accordion behavior)
        /*
        institutionCards.forEach(otherCard => {
            if (otherCard !== card && otherCard.classList.contains('expanded')) {
                toggleInstitutionCard(otherCard);
            }
        });
        */
    }
}

// Add click event listeners to institution cards
institutionCards.forEach(card => {
    const institutionHeader = card.querySelector('.institution-header');
    
    if (institutionHeader) {
        // Make the header clickable
        institutionHeader.addEventListener('click', function(event) {
            event.preventDefault();
            toggleInstitutionCard(card);
        });
        
        // Add keyboard accessibility
        institutionHeader.setAttribute('tabindex', '0');
        institutionHeader.setAttribute('role', 'button');
        institutionHeader.setAttribute('aria-expanded', 'false');
        
        // Handle keyboard interactions
        institutionHeader.addEventListener('keypress', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleInstitutionCard(card);
                
                // Update aria-expanded attribute
                const isExpanded = card.classList.contains('expanded');
                institutionHeader.setAttribute('aria-expanded', isExpanded);
            }
        });
        
        // Add hover effect for better user experience
        institutionHeader.addEventListener('mouseenter', function() {
            if (!card.classList.contains('expanded')) {
                card.style.transform = 'translateY(-2px)';
                card.style.boxShadow = '0 6px 20px var(--shadow-medium)';
            }
        });
        
        institutionHeader.addEventListener('mouseleave', function() {
            if (!card.classList.contains('expanded')) {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 4px 15px var(--shadow-light)';
            }
        });
    }
});

// Function to expand all institution cards (useful for debugging)
function expandAllInstitutions() {
    institutionCards.forEach(card => {
        if (!card.classList.contains('expanded')) {
            toggleInstitutionCard(card);
        }
    });
}

// Function to collapse all institution cards
function collapseAllInstitutions() {
    institutionCards.forEach(card => {
        if (card.classList.contains('expanded')) {
            toggleInstitutionCard(card);
        }
    });
}

// Make functions available for debugging (remove in production)
window.trainingDebug = {
    expandAll: expandAllInstitutions,
    collapseAll: collapseAllInstitutions,
    toggleCard: toggleInstitutionCard
};

    // ↓↓↓ ADD THE WORK EXPERIENCE JAVASCRIPT HERE ↓↓↓
    
    /*
    =================================================================
    WORK EXPERIENCE SPECIFIC FUNCTIONALITY
    =================================================================
    Additional functionality specific to work experience cards
    */

    // Function to track work experience interactions
    function trackWorkExperienceInteraction(roleName, action) {
        console.log(`Work Experience ${action}: ${roleName}`);
        // You can add analytics tracking here
    }

    // Add specific functionality for work cards
    const workCards = document.querySelectorAll('.work-card');

    workCards.forEach(card => {
        const roleName = card.querySelector('.training-name').textContent;
        const institutionHeader = card.querySelector('.institution-header');
        
        if (institutionHeader) {
            // Add work-specific tracking
            institutionHeader.addEventListener('click', function() {
                const isExpanding = !card.classList.contains('expanded');
                const action = isExpanding ? 'expanded' : 'collapsed';
                trackWorkExperienceInteraction(roleName, action);
            });
            
            // Add special styling for current role
            if (card.getAttribute('data-institution') === 'risk-analyst') {
                card.classList.add('current-role');
            }
        }
    });

    // Add work experience functions to debug object
    if (window.portfolioDebug) {
        window.portfolioDebug.workExperience = {
            expandAllWork: function() {
                workCards.forEach(card => {
                    if (!card.classList.contains('expanded')) {
                        toggleInstitutionCard(card);
                    }
                });
            },
            collapseAllWork: function() {
                workCards.forEach(card => {
                    if (card.classList.contains('expanded')) {
                        toggleInstitutionCard(card);
                    }
                });
            }
        };
    }

    // ↑↑↑ END OF WORK EXPERIENCE JAVASCRIPT ↑↑↑

/*
=================================================================
SMOOTH ANIMATIONS FOR MODULE ITEMS
=================================================================
Add smooth animations when modules become visible
*/

// Animate module items when they become visible
function animateModuleItems(card) {
    const moduleItems = card.querySelectorAll('.module-item');
    
    moduleItems.forEach((item, index) => {
        // Reset animation
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        // Stagger the animation for each module
        setTimeout(() => {
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100); // 100ms delay between each item
    });
}

// Update the toggle function to include animations
const toggleInstitutionCardOriginal = toggleInstitutionCard;
toggleInstitutionCard = function(card) {
    const wasExpanded = card.classList.contains('expanded');
    
    // Call the original toggle function
    toggleInstitutionCardOriginal(card);
    
    // If card was just expanded, animate the module items
    if (!wasExpanded && card.classList.contains('expanded')) {
        // Small delay to ensure the content is visible
        setTimeout(() => {
            animateModuleItems(card);
        }, 50);
    }
};

/*
=================================================================
ANALYTICS TRACKING FOR INSTITUTION INTERACTIONS
=================================================================
Track which institutions users are most interested in
*/

function trackInstitutionInteraction(institutionName, action) {
    console.log(`Institution ${action}: ${institutionName}`);
    // You can add Google Analytics or other tracking here
    // Example: gtag('event', 'institution_' + action, { institution: institutionName });
}

// Add tracking to institution cards
institutionCards.forEach(card => {
    const institutionName = card.querySelector('.training-name').textContent;
    const institutionHeader = card.querySelector('.institution-header');
    
    if (institutionHeader) {
        institutionHeader.addEventListener('click', function() {
            const isExpanding = !card.classList.contains('expanded');
            const action = isExpanding ? 'expanded' : 'collapsed';
            trackInstitutionInteraction(institutionName, action);
        });
    }
});
    
    /*
    =================================================================
    ANALYTICS AND TRACKING (Optional)
    =================================================================
    This section can be used to track how visitors use your portfolio.
    Currently commented out, but you can enable it if you add analytics.
    */
    
    // Function to track page views (for analytics)
    function trackPageView(pageName) {
        // Example: Google Analytics tracking
        // if (typeof gtag !== 'undefined') {
        //     gtag('config', 'GA_MEASUREMENT_ID', {
        //         page_title: pageName,
        //         page_location: window.location.href
        //     });
        // }
        
        console.log('Page viewed: ' + pageName);
    }
    
    // Function to track when PDFs are opened (to see which projects get attention)
    function trackPdfOpen(projectName) {
        console.log('PDF opened: ' + projectName);
        // You could send this data to Google Analytics or another service
    }
    
    /*
    =================================================================
    INITIALIZATION COMPLETE
    =================================================================
    */
    
    // Log that everything loaded successfully (remove this in production)
    console.log('Portfolio website initialized successfully!');
    console.log('Features loaded: Navigation, PDF viewer, GitHub links, Animations, Accessibility');
    
    /*
    =================================================================
    HELPFUL FUNCTIONS FOR MAINTENANCE
    =================================================================
    These functions can be called from the browser console for testing
    and maintenance purposes.
    */
    
    // Make some functions available globally for testing
    window.portfolioDebug = {
        switchToPage: switchToPage,
        openPdfModal: openPdfModal,
        closePdfModal: closePdfModal,
        trackPageView: trackPageView
    };
    
}); // End of main DOMContentLoaded event listener

/*
=================================================================
ADDITIONAL UTILITY FUNCTIONS
=================================================================
These functions don't need to wait for the DOM to load and can be
used throughout the application.
*/

// Function to check if user is on mobile device
function isMobileDevice() {
    return window.innerWidth <= 768;
}

// Function to smoothly scroll to top of page
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Function to copy text to clipboard (useful for contact info)
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() {
            console.log('Copied to clipboard: ' + text);
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        console.log('Copied to clipboard: ' + text);
    }
}