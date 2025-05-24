/**
 * Watchlist page functionality for OtakuVerse
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const watchlistContainer = document.getElementById('watchlist-container');
  const watchlistEmpty = document.getElementById('watchlist-empty');
  const watchlistStatsContainer = document.getElementById('watchlist-stats-container');
  const totalCountElement = document.getElementById('total-count');
  const watchingCountElement = document.getElementById('watching-count');
  const completedCountElement = document.getElementById('completed-count');
  const planCountElement = document.getElementById('plan-count');
  const droppedCountElement = document.getElementById('dropped-count');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const animeDetailModal = document.getElementById('anime-detail-modal');
  const modalContent = document.getElementById('modal-content');
  const closeModal = document.getElementById('close-modal');
  
  // Variables
  let currentFilter = 'all';
  let activeNotesPopup = null;
  
  // Load watchlist
  loadWatchlist();
  
  // Event listeners
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      
      // Update active state
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Apply filter
      currentFilter = filter;
      loadWatchlist();
    });
  });
  
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      animeDetailModal.style.display = 'none';
      document.body.style.overflow = '';
    });
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === animeDetailModal) {
      animeDetailModal.style.display = 'none';
      document.body.style.overflow = '';
    }
    
    // Close notes popup when clicking outside
    if (activeNotesPopup && !activeNotesPopup.contains(e.target) && e.target.className !== 'watchlist-action-btn') {
      activeNotesPopup.classList.remove('active');
      activeNotesPopup = null;
    }
  });
  
  /**
   * Load watchlist from storage
   */
  function loadWatchlist() {
    // Get watchlist data
    const watchlist = window.utils.getFromStorage('animeWatchlist', {});
    const watchlistInfo = window.utils.getFromStorage('watchlistInfo', {});
    
    // Convert to array for filtering
    const watchlistItems = Object.entries(watchlist).map(([id, status]) => {
      const itemInfo = watchlistInfo[id] || { 
        id, 
        title: 'Unknown Anime',
        status
      };
      return {
        id: parseInt(id),
        status,
        ...itemInfo
      };
    });
    
    // Apply filter
    const filteredItems = currentFilter === 'all' 
      ? watchlistItems 
      : watchlistItems.filter(item => item.status === currentFilter);
    
    // Update UI
    updateWatchlistUI(filteredItems);
    updateStats(watchlistItems);
  }
  
  /**
   * Update the watchlist UI with items
   * @param {Array} items - Array of watchlist items
   */
  function updateWatchlistUI(items) {
    watchlistContainer.innerHTML = '';
    
    if (items.length === 0) {
      watchlistEmpty.style.display = 'block';
      watchlistStatsContainer.style.display = 'none';
    } else {
      watchlistEmpty.style.display = 'none';
      watchlistStatsContainer.style.display = 'block';
      
      items.forEach(item => {
        const watchlistItem = createWatchlistItem(item);
        watchlistContainer.appendChild(watchlistItem);
      });
      
      // Initialize Lucide icons
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }
  }
  
  /**
   * Update watchlist statistics
   * @param {Array} items - Array of all watchlist items
   */
  function updateStats(items) {
    const total = items.length;
    const watching = items.filter(item => item.status === 'watching').length;
    const completed = items.filter(item => item.status === 'completed').length;
    const plan = items.filter(item => item.status === 'plan').length;
    const dropped = items.filter(item => item.status === 'dropped').length;
    
    totalCountElement.textContent = total;
    watchingCountElement.textContent = watching;
    completedCountElement.textContent = completed;
    planCountElement.textContent = plan;
    droppedCountElement.textContent = dropped;
  }
  
  /**
   * Create a watchlist item element
   * @param {Object} item - Watchlist item data
   * @returns {HTMLElement} Watchlist item element
   */
  function createWatchlistItem(item) {
    const element = document.createElement('div');
    element.className = 'watchlist-item';
    element.dataset.id = item.id;
    element.dataset.status = item.status;
    
    // Apply animation to items
    element.style.animation = 'fade-in 0.5s ease forwards';
    element.style.opacity = '0';
    
    // Status label
    const statusLabels = {
      'watching': 'Watching',
      'completed': 'Completed',
      'plan': 'Plan to Watch',
      'dropped': 'Dropped'
    };
    
    // Format date
    const formattedDate = item.addedAt 
      ? new Date(item.addedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      : 'Unknown date';
    
    element.innerHTML = `
      <div class="watchlist-image-container">
        <img src="${item.image || 'https://via.placeholder.com/120x180?text=No+Image'}" alt="${item.title}" class="watchlist-image" loading="lazy" />
      </div>
      <div class="watchlist-info">
        <div class="watchlist-status ${item.status}">${statusLabels[item.status]}</div>
        <h3 class="watchlist-title">${item.title}</h3>
        
        <div class="watchlist-meta">
          ${item.type ? `
            <div class="watchlist-meta-item">
              <i data-lucide="film"></i>
              <span>${item.type}</span>
            </div>
          ` : ''}
          
          ${item.episodes ? `
            <div class="watchlist-meta-item">
              <i data-lucide="tv-2"></i>
              <span>${item.episodes} episodes</span>
            </div>
          ` : ''}
          
          ${item.score ? `
            <div class="watchlist-meta-item">
              <i data-lucide="star"></i>
              <span>${item.score}</span>
            </div>
          ` : ''}
          
          <div class="watchlist-meta-item">
            <i data-lucide="calendar"></i>
            <span>Added on ${formattedDate}</span>
          </div>
        </div>
        
        ${item.notes ? `
          <div class="watchlist-notes">
            <div class="watchlist-notes-label">Notes:</div>
            <div class="watchlist-notes-content">${item.notes}</div>
          </div>
        ` : ''}
        
        <div class="watchlist-actions">
          <button class="watchlist-action-btn view-btn" data-id="${item.id}">
            <i data-lucide="external-link"></i>
            <span>View Details</span>
          </button>
          
          <button class="watchlist-action-btn notes-btn" data-id="${item.id}">
            <i data-lucide="sticky-note"></i>
            <span>Add Notes</span>
          </button>
          
          <button class="watchlist-action-btn remove-btn" data-id="${item.id}">
            <i data-lucide="trash-2"></i>
            <span>Remove</span>
          </button>
          
          <div class="watchlist-notes-popup">
            <textarea class="notes-textarea" placeholder="Add your notes here...">${item.notes || ''}</textarea>
            <div class="notes-actions">
              <button class="outline-button cancel-notes-btn">Cancel</button>
              <button class="primary-button save-notes-btn" data-id="${item.id}">Save Notes</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add event listeners
    const viewBtn = element.querySelector('.view-btn');
    const notesBtn = element.querySelector('.notes-btn');
    const removeBtn = element.querySelector('.remove-btn');
    const notesPopup = element.querySelector('.watchlist-notes-popup');
    const cancelNotesBtn = element.querySelector('.cancel-notes-btn');
    const saveNotesBtn = element.querySelector('.save-notes-btn');
    
    if (viewBtn) {
      viewBtn.addEventListener('click', () => {
        viewAnimeDetails(item.id);
      });
    }
    
    if (notesBtn) {
      notesBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Close any open popup
        if (activeNotesPopup) {
          activeNotesPopup.classList.remove('active');
        }
        
        // Show this popup
        notesPopup.classList.add('active');
        activeNotesPopup = notesPopup;
        
        // Focus textarea
        const textarea = notesPopup.querySelector('.notes-textarea');
        if (textarea) {
          textarea.focus();
        }
      });
    }
    
    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        removeFromWatchlist(item.id, item.title);
      });
    }
    
    if (cancelNotesBtn) {
      cancelNotesBtn.addEventListener('click', () => {
        notesPopup.classList.remove('active');
        activeNotesPopup = null;
      });
    }
    
    if (saveNotesBtn) {
      saveNotesBtn.addEventListener('click', () => {
        const textarea = notesPopup.querySelector('.notes-textarea');
        if (textarea) {
          saveNotes(item.id, textarea.value);
        }
        notesPopup.classList.remove('active');
        activeNotesPopup = null;
      });
    }
    
    return element;
  }
  
  /**
   * View anime details
   * @param {number} animeId - Anime ID
   */
  function viewAnimeDetails(animeId) {
    modalContent.innerHTML = '';
    window.utils.showLoading(modalContent, 'Loading anime details...');
    
    animeDetailModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    fetchAnimeDetails(animeId);
  }
  
  /**
   * Fetch anime details from API and render them
   * @param {number} animeId - Anime ID
   */
  async function fetchAnimeDetails(animeId) {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/full`);
      if (!response.ok) throw new Error('Failed to fetch anime details');
      
      const data = await response.json();
      const anime = data.data;
      
      // Render the anime details directly
      modalContent.innerHTML = `
        <div class="modal-header">
          <h2>${anime.title || 'Unknown Title'}</h2>
        </div>
        <div class="modal-body-content">
          ${anime.images?.jpg?.large_image_url ? `
            <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 1rem;" />
          ` : ''}
          <p><strong>Type:</strong> ${anime.type || 'N/A'}</p>
          <p><strong>Episodes:</strong> ${anime.episodes || 'N/A'}</p>
          <p><strong>Score:</strong> ${anime.score || 'N/A'}</p>
          <p><strong>Status:</strong> ${anime.status || 'N/A'}</p>
          <p><strong>Synopsis:</strong> ${anime.synopsis || 'No synopsis available.'}</p>
        </div>
      `;
      
      // Initialize Lucide icons
      if (window.lucide) {
        window.lucide.createIcons();
      }
    } catch (error) {
      console.error('Error fetching anime details:', error);
      modalContent.innerHTML = `
        <div class="error-message">
          <p>Failed to load anime details. Please try again later.</p>
        </div>
      `;
    }
  }
  
  /**
   * Remove an anime from the watchlist
   * @param {number} animeId - Anime ID
   * @param {string} title - Anime title
   */
  function removeFromWatchlist(animeId, title) {
    // Get storage data
    const watchlist = window.utils.getFromStorage('animeWatchlist', {});
    const watchlistInfo = window.utils.getFromStorage('watchlistInfo', {});
    
    // Remove from storage
    delete watchlist[animeId];
    delete watchlistInfo[animeId];
    
    // Save back to storage
    window.utils.saveToStorage('animeWatchlist', watchlist);
    window.utils.saveToStorage('watchlistInfo', watchlistInfo);
    
    // Show toast
    window.utils.showToast({
      title: "Watchlist updated",
      description: `${title} removed from your watchlist`,
      variant: "success"
    });
    
    // Update UI
    loadWatchlist();
  }
  
  /**
   * Save notes for an anime
   * @param {number} animeId - Anime ID
   * @param {string} notes - Notes text
   */
  function saveNotes(animeId, notes) {
    // Get watchlist info
    const watchlistInfo = window.utils.getFromStorage('watchlistInfo', {});
    
    // Update notes
    if (watchlistInfo[animeId]) {
      watchlistInfo[animeId].notes = notes;
      
      // Save back to storage
      window.utils.saveToStorage('watchlistInfo', watchlistInfo);
      
      // Show toast
      window.utils.showToast({
        title: "Notes saved",
        description: "Your notes have been saved",
        variant: "success"
      });
      
      // Update UI
      loadWatchlist();
    }
  }
});