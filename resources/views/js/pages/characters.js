
/**
 * Characters page functionality for OtakuVerse
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const resultsTitle = document.getElementById('results-title');
  const characterGrid = document.getElementById('character-grid');
  const loadingSpinner = document.getElementById('loading-spinner');
  const characterDetailModal = document.getElementById('character-detail-modal');
  const modalContent = document.getElementById('modal-content');
  const closeModal = document.getElementById('close-modal');
  
  // Fetch popular characters on initial load
  fetchPopularCharacters();
  
  // Event listeners
  if (searchForm) {
    searchForm.addEventListener('submit', handleSearch);
  }
  
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      characterDetailModal.style.display = 'none';
      document.body.style.overflow = '';
    });
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === characterDetailModal) {
      characterDetailModal.style.display = 'none';
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
      searchCharacters(query);
    }
  }
  
  /**
   * Fetch popular characters
   */
  async function fetchPopularCharacters() {
    loadingSpinner.style.display = 'flex';
    characterGrid.innerHTML = '';
    
    try {
      const response = await fetch('https://api.jikan.moe/v4/top/characters');
      if (!response.ok) throw new Error('Failed to fetch popular characters');
      
      const data = await response.json();
      displayCharacterResults(data.data);
    } catch (error) {
      console.error('Error fetching popular characters:', error);
      window.utils.showToast({
        title: "Error",
        description: "Failed to load characters. Please try again later.",
        variant: "error",
      });
      characterGrid.innerHTML = `
        <div class="error-message">
          <p>Failed to load characters. Please try again later.</p>
        </div>
      `;
    } finally {
      loadingSpinner.style.display = 'none';
    }
  }
  
  /**
   * Search for characters by query
   * @param {string} query - Search query
   */
  async function searchCharacters(query) {
    loadingSpinner.style.display = 'flex';
    characterGrid.innerHTML = '';
    
    try {
      const response = await fetch(`https://api.jikan.moe/v4/characters?q=${encodeURIComponent(query)}&order_by=favorites&sort=desc`);
      if (!response.ok) throw new Error('Failed to fetch search results');
      
      const data = await response.json();
      displayCharacterResults(data.data);
    } catch (error) {
      console.error('Error searching characters:', error);
      window.utils.showToast({
        title: "Error",
        description: "Failed to search for characters. Please try again later.",
        variant: "error",
      });
      characterGrid.innerHTML = `
        <div class="error-message">
          <p>Failed to search characters. Please try again.</p>
        </div>
      `;
    } finally {
      loadingSpinner.style.display = 'none';
    }
  }
  
  /**
   * Display character results in the grid
   * @param {Array} characterList - List of character objects
   */
  function displayCharacterResults(characterList) {
    characterGrid.innerHTML = '';
    
    if (characterList.length === 0) {
      characterGrid.innerHTML = `
        <div class="error-message">
          <p>No characters found. Try a different search.</p>
        </div>
      `;
      return;
    }
    
    characterList.forEach(character => {
      const characterCard = window.components.createCharacterCard(
        character,
        handleCharacterClick
      );
      
      characterGrid.appendChild(characterCard);
    });
    
    // Initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
  
  /**
   * Handle character card click
   * @param {Object} character - Character object
   */
  function handleCharacterClick(character) {
    openCharacterDetailModal(character.mal_id);
  }
  
  /**
   * Open character detail modal
   * @param {number} characterId - Character ID
   */
  function openCharacterDetailModal(characterId) {
    modalContent.innerHTML = '';
    window.utils.showLoading(modalContent, 'Loading character details...');
    
    characterDetailModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    fetchCharacterDetails(characterId);
  }
  
  /**
   * Fetch character details
   * @param {number} characterId - Character ID
   */
  async function fetchCharacterDetails(characterId) {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/characters/${characterId}/full`);
      if (!response.ok) throw new Error('Failed to fetch character details');
      
      const data = await response.json();
      const character = data.data;
      
      // Display character details
      const detailView = window.components.createCharacterDetail(character);
      modalContent.innerHTML = '';
      modalContent.appendChild(detailView);
      
      // Initialize Lucide icons
      if (window.lucide) {
        window.lucide.createIcons();
      }
    } catch (error) {
      console.error('Error fetching character details:', error);
      window.utils.showToast({
        title: "Error",
        description: "Failed to load character details. Please try again later.",
        variant: "error",
      });
      modalContent.innerHTML = `
        <div class="error-message">
          <p>Failed to load character details. Please try again.</p>
        </div>
      `;
    }
  }
});
