
/**
 * Toast notification utilities for OtakuVerse
 */

// Create namespace to avoid global scope pollution
window.utils = window.utils || {};

/**
 * Show a toast notification
 * @param {Object} options - Toast options
 * @param {string} options.title - Toast title
 * @param {string} options.description - Toast description
 * @param {string} [options.variant='default'] - Toast variant (default, success, error, warning, info)
 * @param {number} [options.duration=5000] - Duration in milliseconds
 */
window.utils.showToast = (options) => {
  const { title, description, variant = 'default', duration = 5000 } = options;
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast ${variant}`;
  
  // Set icon based on variant
  let icon = 'info';
  if (variant === 'success') icon = 'check-circle';
  if (variant === 'error') icon = 'x-circle';
  if (variant === 'warning') icon = 'alert-triangle';
  
  // Build toast HTML
  toast.innerHTML = `
    <div class="toast-icon">
      <i data-lucide="${icon}"></i>
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      ${description ? `<div class="toast-description">${description}</div>` : ''}
    </div>
    <button class="toast-close" aria-label="Close toast">
      <i data-lucide="x"></i>
    </button>
  `;
  
  // Get toast container
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  // Add toast to container
  container.appendChild(toast);
  
  // Initialize icons
  if (window.lucide) {
    window.lucide.createIcons({
      icons: {
        'check-circle': true,
        'x-circle': true,
        'alert-triangle': true,
        'info': true,
        'x': true
      }
    });
  }
  
  // Add close functionality
  const closeButton = toast.querySelector('.toast-close');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      removeToast(toast);
    });
  }
  
  // Auto close after duration
  setTimeout(() => {
    removeToast(toast);
  }, duration);
  
  /**
   * Remove toast with animation
   * @param {HTMLElement} toastElement - Toast element to remove
   */
  function removeToast(toastElement) {
    toastElement.style.animation = 'toast-slide-out 0.3s ease forwards';
    
    // Remove element after animation
    setTimeout(() => {
      if (toastElement.parentNode === container) {
        container.removeChild(toastElement);
      }
    }, 300);
  }
};
