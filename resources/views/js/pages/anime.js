
/**
 * Anime page functionality for OtakuVerse
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const resultsTitle = document.getElementById('results-title');
  const animeGrid = document.getElementById('anime-grid');
  const loadingSpinner = document.getElementById('loading-spinner');
  const animeDetailModal = document.getElementById('anime-detail-modal');
  const modalContent = document.getElementById('modal-content');
  const closeModal = document.getElementById('close-modal');
  
  // Variables
  let selectedAnimeId = null;
  
  // Fetch trending anime on initial load
  fetchTrendingAnime();
  
  // Event listeners
  if (searchForm) {
    searchForm.addEventListener('submit', handleSearch);
  }
  
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      animeDetailModal.style.display = 'none';
      document.body.style.overflow = '';
    });
  }
  
  // Close the modal when clicking outside of it
  window.addEventListener('click', (e) => {
    if (e.target === animeDetailModal) {
      animeDetailModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
  
  /**
   * Handle search form submission
   * @param {Event} e - Form submit event
   */
  function handleSearch(e) {
    e.preventDefault();
    const query = searchInput.value.trim();
    
    if (query) {
      resultsTitle.textContent = `Search results for "${query}"`;
      searchAnime(query);
    }
  }
  
  /**
   * Fetch trending anime
   */
  async function fetchTrendingAnime() {
    loadingSpinner.style.display = 'flex';
    animeGrid.innerHTML = '';
    
    try {
      const response = await fetch('https://api.jikan.moe/v4/top/anime?limit=20');
      if (!response.ok) throw new Error('Failed to fetch trending anime');
      
      const data = await response.json();
      displayAnimeResults(data.data);
    } catch (error) {
      console.error('Error fetching trending anime:', error);
      window.utils.showToast({
        title: "Error",
        description: "Failed to load trending anime. Please try again later.",
        variant: "error",
      });
      animeGrid.innerHTML = `
        <div class="error-message">
          <p>Failed to load anime. Please try again later.</p>
        </div>
      `;
    } finally {
      loadingSpinner.style.display = 'none';
    }
  }
  
  /**
   * Search for anime by query
   * @param {string} query - Search query
   */
  async function searchAnime(query) {
    loadingSpinner.style.display = 'flex';
    animeGrid.innerHTML = '';
    
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=20`);
      if (!response.ok) throw new Error('Failed to fetch search results');
      
      const data = await response.json();
      displayAnimeResults(data.data);
    } catch (error) {
      console.error('Error searching anime:', error);
      window.utils.showToast({
        title: "Error",
        description: "Failed to search for anime. Please try again later.",
        variant: "error",
      });
      animeGrid.innerHTML = `
        <div class="error-message">
          <p>Failed to search anime. Please try again.</p>
        </div>
      `;
    } finally {
      loadingSpinner.style.display = 'none';
    }
  }
  
  /**
   * Display anime results in the grid
   * @param {Array} animeList - List of anime objects
   */
  function displayAnimeResults(animeList) {
    animeGrid.innerHTML = '';
    
    if (animeList.length === 0) {
      animeGrid.innerHTML = `
        <div class="error-message">
          <p>No anime found. Try a different search.</p>
        </div>
      `;
      return;
    }
    
    // Get watchlist data
    const watchlist = window.utils.getFromStorage('animeWatchlist', {});
    
    animeList.forEach(anime => {
      const watchlistStatus = watchlist[anime.mal_id];
      
      const animeCard = window.components.createAnimeCard(
        anime,
        watchlistStatus,
        handleStatusChange,
        handleAnimeClick
      );
      
      animeGrid.appendChild(animeCard);
    });
    
    // Initialize Lucide icons in the cards
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
  
  /**
   * Handle watchlist status change
   * @param {number} animeId - Anime ID
   * @param {string} title - Anime title
   * @param {string} status - New watchlist status
   */
  function handleStatusChange(animeId, title, status) {
    // Update watchlist
    const watchlist = window.utils.getFromStorage('animeWatchlist', {});
    watchlist[animeId] = status;
    window.utils.saveToStorage('animeWatchlist', watchlist);
    
    // Find the anime element
    const animeElement = document.querySelector(`.anime-card[data-id="${animeId}"]`);
    if (animeElement) {
      const statusContainer = animeElement.querySelector('.anime-status');
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
      
      if (statusContainer) {
        // Update existing status badge
        statusContainer.className = `anime-status ${statusClasses[status] || ''}`;
        statusContainer.textContent = statusLabels[status] || status;
      } else {
        // Create new status badge
        const imageContainer = animeElement.querySelector('.anime-image-container');
        if (imageContainer) {
          const badge = document.createElement('div');
          badge.className = `anime-status ${statusClasses[status] || ''}`;
          badge.textContent = statusLabels[status] || status;
          imageContainer.appendChild(badge);
        }
      }
      
      // Update heart icon
      const heartIcon = animeElement.querySelector('.watchlist-btn i');
      if (heartIcon) {
        heartIcon.classList.add('fill-heart');
      }
    }
    
    window.utils.showToast({
      title: "Watchlist updated",
      description: `${title} marked as ${status}`,
      variant: "success"
    });
    
    // Also save extended info for this anime
    const selectedAnime = document.querySelector(`.anime-card[data-id="${animeId}"]`);
    if (selectedAnime) {
      fetchAnimeDetails(animeId, true);
    }
  }
  
  /**
   * Handle anime card click
   * @param {Object} anime - Anime object
   */
  function handleAnimeClick(anime) {
    selectedAnimeId = anime.mal_id;
    openAnimeDetailModal(anime.mal_id);
  }
  
  /**
   * Open anime detail modal
   * @param {number} animeId - Anime ID
   */
  function openAnimeDetailModal(animeId) {
    modalContent.innerHTML = '';
    window.utils.showLoading(modalContent, 'Loading anime details...');
    
    animeDetailModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    fetchAnimeDetails(animeId);
  }
  
  /**
   * Fetch anime details
   * @param {number} animeId - Anime ID
   * @param {boolean} saveOnly - Whether to only save the details without displaying
   */
  async function fetchAnimeDetails(animeId, saveOnly = false) {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/full`);
      if (!response.ok) throw new Error('Failed to fetch anime details');
      
      const data = await response.json();
      const anime = data.data;
      
      // Save to watchlist info
      const watchlist = window.utils.getFromStorage('animeWatchlist', {});
      const watchlistInfo = window.utils.getFromStorage('watchlistInfo', {});
      
      if (watchlist[animeId]) {
        // Save extended info if the anime is in the watchlist
        watchlistInfo[animeId] = {
          id: anime.mal_id,
          title: anime.title,
          image: anime.images?.jpg?.image_url,
          score: anime.score,
          type: anime.type,
          episodes: anime.episodes,
          status: watchlist[animeId],
          notes: watchlistInfo[animeId]?.notes || '',
          addedAt: watchlistInfo[animeId]?.addedAt || new Date().toISOString()
        };
        window.utils.saveToStorage('watchlistInfo', watchlistInfo);
      }
      
      if (!saveOnly) {
        // Display the details
        const detailView = window.components.createAnimeDetail(anime);
        modalContent.innerHTML = '';
        modalContent.appendChild(detailView);
        
        // Initialize Lucide icons
        if (window.lucide) {
          window.lucide.createIcons();
        }
        
        // Fix for watchlist button not clickable due to z-index
        const watchlistOptionsInModal = modalContent.querySelectorAll('.watchlist-options');
        watchlistOptionsInModal.forEach(options => {
          options.style.zIndex = '1050';
        });
      }
    } catch (error) {
      console.error('Error fetching anime details:', error);
      if (!saveOnly) {
        window.utils.showToast({
          title: "Error",
          description: "Failed to load anime details. Please try again later.",
          variant: "error",
        });
        modalContent.innerHTML = `
          <div class="error-message">
            <p>Failed to load anime details. Please try again.</p>
          </div>
        `;
      }
    }
  }
});
