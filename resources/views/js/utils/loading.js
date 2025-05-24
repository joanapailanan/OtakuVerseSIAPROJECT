
/**
 * Loading utilities for OtakuVerse
 */

// Create namespace to avoid global scope pollution
window.utils = window.utils || {};

/**
 * Show loading spinner in a container
 * @param {HTMLElement} container - Container to show loading in
 * @param {string} message - Loading message
 */
window.utils.showLoading = (container, message = 'Loading...') => {
  if (!container) return;
  
  // Clear container first
  container.innerHTML = '';
  
  // Create loading spinner
  const loadingSpinner = document.createElement('div');
  loadingSpinner.className = 'loading-spinner-container';
  loadingSpinner.innerHTML = `
    <div class="spinner-outer">
      <div class="spinner-inner"></div>
    </div>
    <p class="loading-text">${message}</p>
  `;
  
  // Add to container
  container.appendChild(loadingSpinner);
};

/**
 * Hide loading spinner and clear container
 * @param {HTMLElement} container - Container to clear
 */
window.utils.hideLoading = (container) => {
  if (!container) return;
  
  // Find loading spinner
  const spinner = container.querySelector('.loading-spinner-container');
  if (spinner) {
    container.removeChild(spinner);
  }
};
