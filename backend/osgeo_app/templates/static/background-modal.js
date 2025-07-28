// Background Info Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Background modal script loaded');
    
    // Show the background modal when the page loads
    showBackgroundModal();
    
    // Set up close button functionality
    const closeButton = document.querySelector('.close-background-modal');
    if (closeButton) {
        closeButton.addEventListener('click', closeBackgroundModal);
        console.log('Close button event listener added');
    }
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('backgroundModal');
        if (event.target === modal) {
            closeBackgroundModal();
        }
    });
});

function showBackgroundModal() {
    const modal = document.getElementById('backgroundModal');
    if (modal) {
        modal.style.display = 'block';
        console.log('Background modal displayed');
    } else {
        console.error('Background modal element not found');
    }
}

function closeBackgroundModal() {
    const modal = document.getElementById('backgroundModal');
    if (modal) {
        modal.style.display = 'none';
        console.log('Background modal closed');
    }
}