
/**
 * Anime detail component for OtakuVerse
 */

// Create namespace to avoid global scope pollution
window.components = window.components || {};

/**
 * Create an anime detail view element
 * @param {Object} anime - Anime data object
 * @return {HTMLElement} - Detail element
 */
window.components.createAnimeDetail = (anime) => {
  if (!anime) return document.createElement('div');
  
  const container = document.createElement('div');
  container.className = 'anime-detail';
  
  // Format information
  const imageUrl = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url || '/placeholder.svg';
  const title = anime.title || 'Unknown Title';
  const titleEnglish = anime.title_english || '';
  const score = anime.score ? `${anime.score.toFixed(1)}/10` : 'N/A';
  const rating = anime.rating || 'N/A';
  const type = anime.type || 'Unknown';
  const episodes = anime.episodes || 'N/A';
  const status = anime.status || 'Unknown';
  const duration = anime.duration || 'N/A';
  const aired = anime.aired?.string || 'Unknown';
  const synopsis = anime.synopsis || 'No synopsis available.';
  const genres = anime.genres?.map(g => g.name).join(', ') || 'Not specified';
  const studios = anime.studios?.map(s => s.name).join(', ') || 'Not specified';
  
  // Create anime detail view
  container.innerHTML = `
    <img src="${imageUrl}" alt="${title}" class="anime-detail-image">
    
    <div class="anime-detail-info">
      <h2 class="anime-detail-title">${title}</h2>
      ${titleEnglish ? `<h3 class="anime-detail-subtitle">${titleEnglish}</h3>` : ''}
      
      <div class="anime-detail-meta">
        <div class="anime-detail-meta-item">
          <i data-lucide="star"></i>
          <span>${score}</span>
        </div>
        <div class="anime-detail-meta-item">
          <i data-lucide="film"></i>
          <span>${type}</span>
        </div>
        <div class="anime-detail-meta-item">
          <i data-lucide="tv"></i>
          <span>${episodes} eps</span>
        </div>
        <div class="anime-detail-meta-item">
          <i data-lucide="calendar"></i>
          <span>${aired}</span>
        </div>
      </div>
      
      <div class="anime-detail-section">
        <h4 class="anime-detail-section-title">Synopsis</h4>
        <p class="anime-detail-description">${synopsis}</p>
      </div>
      
      <div class="anime-detail-section">
        <h4 class="anime-detail-section-title">Details</h4>
        <div class="anime-detail-meta">
          <div class="anime-detail-meta-item">
            <strong>Status:</strong> ${status}
          </div>
          <div class="anime-detail-meta-item">
            <strong>Duration:</strong> ${duration}
          </div>
          <div class="anime-detail-meta-item">
            <strong>Rating:</strong> ${rating}
          </div>
        </div>
      </div>
      
      <div class="anime-detail-section">
        <h4 class="anime-detail-section-title">Genres</h4>
        <p>${genres}</p>
      </div>
      
      ${studios ? `
        <div class="anime-detail-section">
          <h4 class="anime-detail-section-title">Studios</h4>
          <p>${studios}</p>
        </div>
      ` : ''}
      
      <div class="anime-detail-actions">
        <button id="add-to-watchlist" class="primary-button">
          <i data-lucide="plus"></i>
          Add to Watchlist
        </button>
        <a href="https://myanimelist.net/anime/${anime.mal_id}" target="_blank" rel="noopener noreferrer" class="outline-button">
          <i data-lucide="external-link"></i>
          View on MyAnimeList
        </a>
      </div>
    </div>
  `;
  
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons({
      icons: {
        star: true,
        film: true,
        tv: true,
        calendar: true,
        plus: true,
        'external-link': true,
        check: true
      }
    });
  }
  
  // Set up watchlist functionality
  setupAnimeWatchlist(container, anime);
  
  return container;
};

/**
 * Set up watchlist functionality for anime detail view
 * @param {HTMLElement} container - Detail container element
 * @param {Object} anime - Anime data object
 */
function setupAnimeWatchlist(container, anime) {
  const watchlistBtn = container.querySelector('#add-to-watchlist');
  if (!watchlistBtn) return;
  
  // Get current watchlist
  const watchlist = window.utils.getFromStorage('animeWatchlist', {});
  const currentStatus = watchlist[anime.mal_id];
  
  // Change button text based on current status
  if (currentStatus) {
    watchlistBtn.innerHTML = `
      <i data-lucide="check"></i>
      In Watchlist
    `;
    
    // Reinitialize icons
    if (window.lucide) {
      window.lucide.createIcons({
        icons: {
          check: true
        }
      });
    }
  }
  
  watchlistBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create and show dropdown
    const dropdown = document.createElement('div');
    dropdown.className = 'watchlist-options';
    dropdown.innerHTML = `
      <button class="watchlist-option" data-status="watching">
        <span class="status-icon">📺</span>
        <span>Watching</span>
      </button>
      <button class="watchlist-option" data-status="completed">
        <i data-lucide="check">✔️</i>
        <span>Completed</span>
      </button>
      <button class="watchlist-option" data-status="plan">
        <i data-lucide="plus">📔</i>
        <span>Plan to Watch</span>
      </button>
      <button class="watchlist-option" data-status="dropped">
        <i data-lucide="x">🗑️</i>
        <span>Dropped</span>
      </button>
    `;
    
    // Position the dropdown - FIXED positioning to ensure it's visible
    const rect = watchlistBtn.getBoundingClientRect();
    const dropdownHeight = 100;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    
    dropdown.style.position = 'fixed';
    
    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
      dropdown.style.top = `${rect.top - dropdownHeight - 50}px`;
    } else {
      dropdown.style.top = `${rect.bottom + 5}px`;
    }
    // Added to change the left position to be more centered
    dropdown.style.left = `${rect.left - 225}px`; 
    dropdown.style.zIndex = '5000';
    
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
        
        // Update watchlist
        const watchlist = window.utils.getFromStorage('animeWatchlist', {});
        watchlist[anime.mal_id] = status;
        window.utils.saveToStorage('animeWatchlist', watchlist);
        
        // Also save extended info for this anime
        const watchlistInfo = window.utils.getFromStorage('watchlistInfo', {});
        watchlistInfo[anime.mal_id] = {
          id: anime.mal_id,
          title: anime.title,
          image: anime.images?.jpg?.image_url,
          score: anime.score,
          type: anime.type,
          episodes: anime.episodes,
          status: status,
          notes: watchlistInfo[anime.mal_id]?.notes || '',
          addedAt: watchlistInfo[anime.mal_id]?.addedAt || new Date().toISOString()
        };
        window.utils.saveToStorage('watchlistInfo', watchlistInfo);
        
        // Update button state
        watchlistBtn.innerHTML = `
          <i data-lucide="check"></i>
          In Watchlist
        `;
        
        // Initialize Lucide icons
        if (window.lucide) {
          window.lucide.createIcons({
            icons: {
              check: true
            }
          });
        }
        
        // Show toast notification
        window.utils.showToast({
          title: "Watchlist updated",
          description: `${anime.title} marked as ${status}`,
          variant: "success"
        });
        
        // Remove dropdown
        dropdown.remove();
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

// Export to the global namespace
window.components.setupAnimeWatchlist = setupAnimeWatchlist;
