// Background Info Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Background modal script loaded');
    
    // Determine which page we're on
    const currentPage = getCurrentPageType();
    console.log('Current page type:', currentPage);
    
    // Check if this is a page reload/refresh
    const isReload = isPageReload();
    console.log('Is page reload:', isReload);
    
    // Check if modal has been shown for this page in this session
    const modalAlreadyShown = hasModalBeenShown(currentPage);
    console.log('Modal already shown for', currentPage, ':', modalAlreadyShown);
    
    // Only show modal if:
    // 1. It hasn't been shown for this page type in this session AND
    // 2. This is not a page reload/refresh
    if (!modalAlreadyShown && !isReload) {
        // Show the background modal when the page loads
        showBackgroundModal(currentPage);
    } else {
        console.log('Modal not shown because:', {
            alreadyShown: modalAlreadyShown,
            isReload: isReload
        });
    }
    
    // Set up close button functionality
    const closeButton = document.querySelector('.close-background-modal');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            closeBackgroundModal(currentPage);
        });
        console.log('Close button event listener added');
    }
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('backgroundModal');
        if (event.target === modal) {
            closeBackgroundModal(currentPage);
        }
    });
});

function getCurrentPageType() {
    // Determine page type based on URL or page elements
    const url = window.location.pathname;
    if (url.includes('intersect') || document.getElementById('intersect')) {
        return 'intersect';
    } else if (url.includes('overview') || document.getElementById('overview')) {
        return 'overview';
    } else {
        return 'unknown';
    }
}

function isPageReload() {
    // Check if this is a page reload/refresh rather than initial navigation
    // Multiple indicators can suggest a reload:
    
    // 1. Check if there are URL parameters (often added after form submission)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.toString() !== '') {
        console.log('URL parameters detected, likely after form submission');
        return true;
    }
    
    // 2. Check performance navigation timing (if available)
    if (performance && performance.navigation) {
        if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
            console.log('Browser reload detected');
            return true;
        }
    }
    
    // 3. Check Navigation API (modern browsers)
    if (performance && performance.getEntriesByType) {
        const navigationEntries = performance.getEntriesByType('navigation');
        if (navigationEntries.length > 0) {
            const navEntry = navigationEntries[0];
            if (navEntry.type === 'reload') {
                console.log('Navigation API reload detected');
                return true;
            }
        }
    }
    
    // 4. Check if sessionStorage already has a flag indicating we've been on this page
    const pageVisitKey = `pageVisited_${getCurrentPageType()}`;
    if (sessionStorage.getItem(pageVisitKey) === 'true') {
        console.log('Previous visit to this page type detected');
        return true;
    }
    
    // Mark that we've now visited this page
    sessionStorage.setItem(pageVisitKey, 'true');
    
    return false;
}

function hasModalBeenShown(pageType) {
    const sessionKey = `backgroundModalShown_${pageType}`;
    return sessionStorage.getItem(sessionKey) === 'true';
}

function markModalAsShown(pageType) {
    const sessionKey = `backgroundModalShown_${pageType}`;
    sessionStorage.setItem(sessionKey, 'true');
    console.log('Modal marked as shown for', pageType);
}

function showBackgroundModal(pageType) {
    const modal = document.getElementById('backgroundModal');
    if (modal) {
        modal.style.display = 'block';
        console.log('Background modal displayed for', pageType);
    } else {
        console.error('Background modal element not found');
    }
}

function closeBackgroundModal(pageType) {
    const modal = document.getElementById('backgroundModal');
    if (modal) {
        modal.style.display = 'none';
        markModalAsShown(pageType);
        console.log('Background modal closed for', pageType);
    }
}