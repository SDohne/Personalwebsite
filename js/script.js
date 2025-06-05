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
- Expandable cards (training, work experience, projects)
- Row synchronization for project cards
- Technical skills section interactivity
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
    
    // Modal elements
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
    This section handles switching between different pages (Portfolio, Work Experience, etc.)
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
    
    // Handle direct links to specific pages (e.g., yoursite.com#work-experience)
    // This runs when someone visits a direct link to a specific page
    function handleInitialPageLoad() {
        const urlHash = window.location.hash.substring(1); // Remove the # symbol
        const validPages = ['home', 'work-experience', 'training', 'publications'];
        
        if (urlHash && validPages.includes(urlHash) && document.getElementById(urlHash)) {
            switchToPage(urlHash);
        } else {
            // If no valid hash or invalid page, make sure home page is shown
            switchToPage('home');
        }
    }
    
    // Run initial page load handling
    handleInitialPageLoad();
    
    /*
    =================================================================
    PDF MODAL AND GITHUB FUNCTIONALITY
    =================================================================
    Functions to handle PDF viewing and GitHub repository opening
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
    ROW SYNCHRONIZATION FUNCTIONALITY
    =================================================================
    Functions to make project cards in the same row expand together
    */
    
    // Function to get cards that are on the same row
    function getCardsInSameRow(targetCard, allCards) {
        const targetRect = targetCard.getBoundingClientRect();
        const targetRow = Math.floor(targetRect.top);
        const tolerance = 50; // Increased tolerance for better row detection
        
        return Array.from(allCards).filter(card => {
            const cardRect = card.getBoundingClientRect();
            const cardRow = Math.floor(cardRect.top);
            return Math.abs(targetRow - cardRow) <= tolerance;
        });
    }

    // Function to expand all cards in the same row
    function expandCardsInRow(targetCard, allCards) {
        const rowCards = getCardsInSameRow(targetCard, allCards);
        
        // Expand all cards in the row
        rowCards.forEach(card => {
            if (!card.classList.contains('expanded')) {
                const modulesContent = card.querySelector('.modules-content');
                const expandIcon = card.querySelector('.expand-icon i');
                
                if (modulesContent && expandIcon) {
                    card.classList.add('expanded');
                    modulesContent.style.display = 'block';
                    expandIcon.style.transform = 'rotate(180deg)';
                }
            }
        });
        
        return rowCards;
    }

    // Function to collapse all cards in the same row
    function collapseCardsInRow(targetCard, allCards) {
        const rowCards = getCardsInSameRow(targetCard, allCards);
        
        // Collapse all cards in the row
        rowCards.forEach(card => {
            if (card.classList.contains('expanded')) {
                const modulesContent = card.querySelector('.modules-content');
                const expandIcon = card.querySelector('.expand-icon i');
                
                if (modulesContent && expandIcon) {
                    card.classList.remove('expanded');
                    modulesContent.style.display = 'none';
                    expandIcon.style.transform = 'rotate(0deg)';
                }
            }
        });
        
        return rowCards;
    }
    
    /*
    =================================================================
    EXPANDABLE INSTITUTION CARDS FUNCTIONALITY
    =================================================================
    This section handles the expand/collapse functionality for 
    institution cards (training, work experience, projects)
    */
    
    // Get all institution cards
    const institutionCards = document.querySelectorAll('.institution-card');
    
    // Function to toggle institution card expansion
    function toggleInstitutionCard(card) {
        const modulesContent = card.querySelector('.modules-content');
        const expandIcon = card.querySelector('.expand-icon i');
        const isExpanded = card.classList.contains('expanded');
        
        // For project cards in the portfolio grid, handle row synchronization
        if (card.closest('.projects-grid')) {
            const allProjectCards = document.querySelectorAll('.projects-grid .project-card');
            
            if (isExpanded) {
                // Collapse all cards in the row
                collapseCardsInRow(card, allProjectCards);
                
                // Smooth scroll to card top when collapsing
                card.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            } else {
                // Expand all cards in the row
                const expandedCards = expandCardsInRow(card, allProjectCards);
                
                // Add staggered animations for the newly expanded cards
                setTimeout(() => {
                    expandedCards.forEach((expandedCard, index) => {
                        if (expandedCard !== card) { // Don't re-animate the clicked card
                            setTimeout(() => {
                                animateModuleItems(expandedCard);
                                animateProjectActions(expandedCard);
                            }, index * 100);
                        }
                    });
                }, 100);
            }
        } else {
            // For non-project cards (work experience, training), use individual toggle
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
            }
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
    
    /*
    =================================================================
    PROJECT CARDS SPECIFIC FUNCTIONALITY
    =================================================================
    Handle PDF and GitHub actions within collapsible project cards
    */
    
    // Get all project cards
    const projectCards = document.querySelectorAll('.projects-grid .project-card, .publications-list .project-card');
    
    // Function to handle project card interactions
    function setupProjectCards() {
        projectCards.forEach(card => {
            const projectName = card.querySelector('.training-name').textContent;
            const pdfPath = card.getAttribute('data-pdf');
            const githubUrl = card.getAttribute('data-github');
            
            // Find action buttons within the expanded content
            const pdfButton = card.querySelector('.pdf-button');
            const githubButton = card.querySelector('.github-button');
            
            // Add click handlers for PDF button
            if (pdfButton && pdfPath) {
                pdfButton.addEventListener('click', function(event) {
                    event.stopPropagation(); // Prevent card from collapsing
                    openPdfModal(pdfPath);
                    trackProjectInteraction(projectName, 'pdf_opened');
                });
            }

            /*
=================================================================
PUBLICATION CARDS SPECIFIC FUNCTIONALITY
=================================================================
Handle PDF buttons in publication cards specifically
*/

// Handle publication cards separately
const publicationCards = document.querySelectorAll('.publication-card');

publicationCards.forEach(card => {
    const pdfPath = card.getAttribute('data-pdf');
    const pdfButton = card.querySelector('.pdf-button, .action-button.pdf-button');
    
    if (pdfButton && pdfPath) {
        pdfButton.addEventListener('click', function(event) {
            event.stopPropagation();
            event.preventDefault();
            openPdfModal(pdfPath);
            console.log('Publication PDF opened:', pdfPath);
        });
    }
});
            
            // Add click handlers for GitHub button  
            if (githubButton && githubUrl) {
                githubButton.addEventListener('click', function(event) {
                    event.stopPropagation(); // Prevent card from collapsing
                    openGitHubRepository(githubUrl);
                    trackProjectInteraction(projectName, 'github_opened');
                });
            }
            
            // Track project expansion/collapse
            const institutionHeader = card.querySelector('.institution-header');
            if (institutionHeader) {
                institutionHeader.addEventListener('click', function() {
                    const isExpanding = !card.classList.contains('expanded');
                    const action = isExpanding ? 'expanded' : 'collapsed';
                    trackProjectInteraction(projectName, action);
                });
            }
        });
    }
    
    // Function to track project interactions
    function trackProjectInteraction(projectName, action) {
        console.log(`Project ${action}: ${projectName}`);
        // You can add analytics tracking here
    }
    
    // Initialize project cards functionality
    setupProjectCards();
    
    /*
    =================================================================
    TECHNICAL SKILLS SECTION INTERACTIVITY
    =================================================================
    Add interactive elements to the skills section
    */
    
    // Add hover effects and click interactions for skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(function(tag) {
        // Add click interaction to skill tags for potential future filtering
        tag.addEventListener('click', function() {
            const skillName = tag.textContent;
            console.log('Skill clicked:', skillName);
            // Future: Could implement project filtering by skill
        });
        
        // Add keyboard accessibility
        tag.setAttribute('tabindex', '0');
        tag.addEventListener('keypress', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                tag.click();
            }
        });
    });
    
    // Add animation to skills section when it comes into view
    const skillsSection = document.querySelector('.technical-skills-section');
    if (skillsSection && window.IntersectionObserver) {
        const skillsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    // Animate skill categories one by one
                    const categories = entry.target.querySelectorAll('.skill-category');
                    categories.forEach((category, index) => {
                        setTimeout(() => {
                            category.style.opacity = '1';
                            category.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });
        
        // Set initial state and start observing
        const skillCategories = skillsSection.querySelectorAll('.skill-category');
        skillCategories.forEach(category => {
            category.style.opacity = '0';
            category.style.transform = 'translateY(20px)';
            category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        skillsObserver.observe(skillsSection);
    }
    
    /*
    =================================================================
    ENHANCED ANIMATIONS FOR EXPANDABLE CARDS
    =================================================================
    Special animations when cards are expanded
    */
    
    // Add staggered animation for project action buttons
    function animateProjectActions(card) {
        const actionButtons = card.querySelectorAll('.project-actions .action-button');
        
        actionButtons.forEach((button, index) => {
            // Reset animation
            button.style.opacity = '0';
            button.style.transform = 'translateY(10px)';
            
            // Stagger the animation
            setTimeout(() => {
                button.style.transition = 'all 0.3s ease';
                button.style.opacity = '1';
                button.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
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
    const originalToggleFunction = toggleInstitutionCard;
    toggleInstitutionCard = function(card) {
        const wasExpanded = card.classList.contains('expanded');
        
        // Call the original toggle function
        originalToggleFunction(card);
        
        // If card was just expanded, animate content
        if (!wasExpanded && card.classList.contains('expanded')) {
            // Small delay to ensure the content is visible
            setTimeout(() => {
                animateModuleItems(card);
                
                // If it's a project card, also animate action buttons
                if (card.closest('.projects-grid')) {
                    animateProjectActions(card);
                }
            }, 50);
        }
    };
    
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
            '.project-card, .training-card, .publication-card, .work-card'
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
    EXTERNAL LINK HANDLING AND CONTACT FUNCTIONALITY
    =================================================================
    This section ensures external links (like social media) open in new tabs
    and handles contact link interactions.
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
    
    // Add click tracking for contact links
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const linkType = link.querySelector('span').textContent.toLowerCase();
            console.log('Contact link clicked:', linkType);
            // You can add analytics tracking here
        });
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
            // On resize, we don't need to do anything special for row synchronization
            // The CSS grid will handle the responsive layout automatically
            // and the expanded state will be preserved
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
    ANALYTICS AND TRACKING
    =================================================================
    Functions for tracking user interactions (for future analytics)
    */
    
    // Function to track page views (for analytics)
    function trackPageView(pageName) {
        console.log('Page viewed: ' + pageName);
        // You can add Google Analytics tracking here
    }
    
    // Function to track institution interactions
    function trackInstitutionInteraction(institutionName, action) {
        console.log(`Institution ${action}: ${institutionName}`);
        // You can add analytics tracking here
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
    HELPFUL FUNCTIONS FOR MAINTENANCE AND DEBUGGING
    =================================================================
    These functions can be called from the browser console for testing
    and maintenance purposes.
    */
    
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
    
    // Function to filter projects by category (ready for future use)
    function filterProjectsByCategory(category) {
        projectCards.forEach(card => {
            const projectCategory = card.querySelector('.project-category').textContent.toLowerCase();
            if (category === 'all' || projectCategory.includes(category.toLowerCase())) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Function to search projects by title or description (ready for future use)
    function searchProjects(searchTerm) {
        const term = searchTerm.toLowerCase();
        
        projectCards.forEach(card => {
            const title = card.querySelector('.training-name').textContent.toLowerCase();
            const description = card.querySelector('.institution-description').textContent.toLowerCase();
            const summary = card.querySelector('.project-summary')?.textContent.toLowerCase() || '';
            
            if (title.includes(term) || description.includes(term) || summary.includes(term)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    /*
    =================================================================
    INITIALIZATION COMPLETE
    =================================================================
    */
    
    // Log that everything loaded successfully (remove this in production)
    console.log('Portfolio website initialized successfully!');
    console.log('Features loaded: Navigation, PDF viewer, GitHub links, Expandable cards, Row synchronization, Animations, Accessibility, Skills section, Contact integration');
    
    // Make functions available globally for testing and debugging
    window.portfolioDebug = {
        // Navigation functions
        switchToPage: switchToPage,
        trackPageView: trackPageView,
        
        // Modal functions
        openPdfModal: openPdfModal,
        closePdfModal: closePdfModal,
        
        // Training/Institution functions
        expandAllInstitutions: expandAllInstitutions,
        collapseAllInstitutions: collapseAllInstitutions,
        toggleCard: toggleInstitutionCard,
        
        // Work experience functions
        expandAllWork: function() {
            const workCards = document.querySelectorAll('.work-card');
            workCards.forEach(card => {
                if (!card.classList.contains('expanded')) {
                    toggleInstitutionCard(card);
                }
            });
        },
        collapseAllWork: function() {
            const workCards = document.querySelectorAll('.work-card');
            workCards.forEach(card => {
                if (card.classList.contains('expanded')) {
                    toggleInstitutionCard(card);
                }
            });
        },
        
        // Project functions
        expandAllProjects: function() {
            projectCards.forEach(card => {
                if (!card.classList.contains('expanded')) {
                    toggleInstitutionCard(card);
                }
            });
        },
        collapseAllProjects: function() {
            const allProjectCards = document.querySelectorAll('.projects-grid .project-card');
            allProjectCards.forEach(card => {
                if (card.classList.contains('expanded')) {
                    const modulesContent = card.querySelector('.modules-content');
                    const expandIcon = card.querySelector('.expand-icon i');
                    
                    card.classList.remove('expanded');
                    if (modulesContent) modulesContent.style.display = 'none';
                    if (expandIcon) expandIcon.style.transform = 'rotate(0deg)';
                }
            });
        },
        filterByCategory: filterProjectsByCategory,
        searchProjects: searchProjects,
        
        // Row synchronization functions
        expandRowByCard: function(cardIndex) {
            const allProjectCards = document.querySelectorAll('.projects-grid .project-card');
            const targetCard = allProjectCards[cardIndex];
            if (targetCard) {
                expandCardsInRow(targetCard, allProjectCards);
            }
        },
        collapseRowByCard: function(cardIndex) {
            const allProjectCards = document.querySelectorAll('.projects-grid .project-card');
            const targetCard = allProjectCards[cardIndex];
            if (targetCard) {
                collapseCardsInRow(targetCard, allProjectCards);
            }
        },
        getRowInfo: function() {
            const allProjectCards = document.querySelectorAll('.projects-grid .project-card');
            const rows = [];
            const processedCards = new Set();
            
            allProjectCards.forEach((card, index) => {
                if (!processedCards.has(card)) {
                    const rowCards = getCardsInSameRow(card, allProjectCards);
                    rowCards.forEach(rowCard => processedCards.add(rowCard));
                    rows.push({
                        rowIndex: rows.length,
                        cardCount: rowCards.length,
                        cardIndices: rowCards.map(rowCard => Array.from(allProjectCards).indexOf(rowCard)),
                        expandedCount: rowCards.filter(rowCard => rowCard.classList.contains('expanded')).length
                    });
                }
            });
            
            console.table(rows);
            return rows;
        },
        
        // Skills section functions
        animateSkills: function() {
            const skillTags = document.querySelectorAll('.skill-tag');
            skillTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        tag.style.transform = 'scale(1)';
                    }, 200);
                }, index * 50);
            });
        },
        
        // Contact functions
        getContactInfo: function() {
            const contactLinks = document.querySelectorAll('.contact-link');
            const contacts = {};
            contactLinks.forEach(link => {
                const type = link.querySelector('span').textContent;
                const href = link.getAttribute('href');
                contacts[type] = href;
            });
            console.table(contacts);
            return contacts;
        },
        
        // Utility functions
        getProjectStats: function() {
            const stats = {
                total: projectCards.length,
                withPdf: 0,
                withGithub: 0,
                withBoth: 0
            };
            
            projectCards.forEach(card => {
                const hasPdf = card.getAttribute('data-pdf');
                const hasGithub = card.getAttribute('data-github');
                
                if (hasPdf) stats.withPdf++;
                if (hasGithub) stats.withGithub++;
                if (hasPdf && hasGithub) stats.withBoth++;
            });
            
            console.table(stats);
            return stats;
        },
        
        // Page validation
        validateNavigation: function() {
            const validPages = ['home', 'work-experience', 'training', 'publications'];
            const navButtons = document.querySelectorAll('.nav-button');
            const issues = [];
            
            navButtons.forEach(button => {
                const targetPage = button.getAttribute('data-page');
                if (!validPages.includes(targetPage)) {
                    issues.push(`Invalid navigation target: ${targetPage}`);
                }
                if (!document.getElementById(targetPage)) {
                    issues.push(`Missing page element: ${targetPage}`);
                }
            });
            
            if (issues.length === 0) {
                console.log('Navigation validation passed ✓');
            } else {
                console.warn('Navigation issues found:', issues);
            }
            
            return issues;
        }
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