
/**
 * Anime card component for OtakuVerse
 */

// Create namespace to avoid global scope pollution
window.components = window.components || {};

/**
 * Create an anime card element
 * @param {Object} anime - Anime data object
 * @param {string|null} watchlistStatus - Current watchlist status
 * @param {Function|null} onStatusChange - Function to call when status changes
 * @param {Function|null} onClick - Function to call on card click
 * @return {HTMLElement} - Card element
 */
window.components.createAnimeCard = (anime, watchlistStatus = null, onStatusChange = null, onClick = null) => {
  // Get anime details
  const { mal_id, title, images, score, type, episodes } = anime;
  const imageUrl = images?.jpg?.image_url || '/placeholder.svg';
  
  // Create the card element
  const card = document.createElement('div');
  card.className = 'anime-card';
  card.dataset.id = mal_id;
  
  // Build the HTML for the card
  let statusBadge = '';
  if (watchlistStatus) {
    const statusClasses = {
      'watching': 'status-watching',
      'completed': 'status-completed',
      'plan': 'status-plan',
      'dropped': 'status-dropped'
    };
    const statusLabels = {
      'watching': '📺 Watching',
      'completed': '✅ Completed',
      'plan': '📌 Plan to Watch',
      'dropped': '❌ Dropped'
    };
    const className = statusClasses[watchlistStatus] || '';
    const label = statusLabels[watchlistStatus] || watchlistStatus;
    statusBadge = `<div class="anime-status ${className}">${label}</div>`;
  }
  
  card.innerHTML = `
    <div class="anime-image-container">
      <img 
        src="${imageUrl}" 
        alt="${title}" 
        class="anime-image"
        loading="lazy"
        onerror="this.onerror=null; this.src='/placeholder.svg';"
      />
      ${statusBadge}
      <button class="watchlist-btn" aria-label="Add to watchlist">
        <i data-lucide="heart" class="${watchlistStatus ? 'fill-heart' : ''}"></i>
      </button>
    </div>
    <div class="anime-info">
      <h3 class="anime-title">${title}</h3>
      <div class="anime-meta">
        ${score ? `<div>⭐ ${score.toFixed(1)}</div>` : ''}
        <div>${type || 'Unknown'} ${episodes ? `• ${episodes} ep` : ''}</div>
      </div>
    </div>
  `;
  
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons({
      icons: {
        heart: true
      }
    });
  }
  
  // Add event listeners
  if (onClick) {
    card.addEventListener('click', (e) => {
      // Prevent click when clicking on watchlist button
      if (!e.target.closest('.watchlist-btn')) {
        onClick(anime);
      }
    });
  }
  
  // Add watchlist functionality
  const watchlistBtn = card.querySelector('.watchlist-btn');
  if (watchlistBtn && onStatusChange) {
    watchlistBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Create and show dropdown
      const dropdown = document.createElement('div');
      dropdown.className = 'watchlist-options';
      dropdown.innerHTML = `
        <button class="watchlist-option" data-status="watching">
          <span class="status-icon">📺</span>
          <span>Watching</span>
        </button>
        <button class="watchlist-option" data-status="completed">
          <i data-lucide="check"></i>
          <span>Completed</span>
        </button>
        <button class="watchlist-option" data-status="plan">
          <i data-lucide="plus"></i>
          <span>Plan to Watch</span>
        </button>
        <button class="watchlist-option" data-status="dropped">
          <i data-lucide="x"></i>
          <span>Dropped</span>
        </button>
      `;
      
      // Position the dropdown - FIXED positioning to ensure it's visible above other elements
      const rect = watchlistBtn.getBoundingClientRect();
      dropdown.style.position = 'fixed';
      dropdown.style.top = `${rect.bottom + 5}px`;
      dropdown.style.left = `${rect.left - dropdown.offsetWidth + rect.width}px`;
      
      // Add dropdown to the page
      document.body.appendChild(dropdown);
      
      // Initialize Lucide icons in the dropdown
      if (window.lucide) {
        window.lucide.createIcons({
          icons: {
            check: true,
            plus: true,
            x: true
          }
        });
      }
      
      // Handle option click
      dropdown.querySelectorAll('.watchlist-option').forEach(option => {
        option.addEventListener('click', () => {
          const status = option.dataset.status;
          onStatusChange(mal_id, title, status);
          dropdown.remove();
          
          // Update button appearance
          const heartIcon = watchlistBtn.querySelector('[data-lucide="heart"]');
          if (heartIcon) {
            heartIcon.classList.add('fill-heart');
          }
        });
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', function closeDropdown(e) {
        if (!dropdown.contains(e.target) && e.target !== watchlistBtn) {
          dropdown.remove();
          document.removeEventListener('click', closeDropdown);
        }
      });
    });
  }
  
  return card;
};
