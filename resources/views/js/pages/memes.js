
/**
 * Memes page functionality for OtakuVerse
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const sortSelect = document.getElementById('sort-select');
  const memeGrid = document.getElementById('meme-grid');
  const loadingSpinner = document.getElementById('loading-spinner');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const memeDetailModal = document.getElementById('meme-detail-modal');
  const modalContent = document.getElementById('modal-content');
  const closeModal = document.getElementById('close-modal');
  
  // Variables
  let currentSort = 'hot';
  let after = null;
  let isLoading = false;
  
  // Fetch memes on initial load
  fetchMemes();
  
  // Event listeners
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      after = null;
      memeGrid.innerHTML = '';
      fetchMemes();
    });
  }
  
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', fetchMemes);
  }
  
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      memeDetailModal.style.display = 'none';
      document.body.style.overflow = '';
    });
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === memeDetailModal) {
      memeDetailModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
  
  /**
   * Fetch memes from Reddit
   */
  async function fetchMemes() {
    if (isLoading) return;
    
    isLoading = true;
    loadingSpinner.style.display = 'flex';
    if (loadMoreBtn) loadMoreBtn.disabled = true;
    
    try {
      // These are popular anime meme subreddits
      const subreddits = ['animemes', 'goodanimemes', 'animememes', 'wholesomeanimemes'];
      const randomSubreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
      
      // Build URL with pagination
      let url = `https://www.reddit.com/r/${randomSubreddit}/${currentSort}.json?limit=10`;
      if (after) url += `&after=${after}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch memes');
      
      const data = await response.json();
      
      // Update pagination token
      after = data.data.after;
      
      // Filter posts to only include image memes
      const memes = data.data.children
        .filter(post => {
          const { data } = post;
          return (
            !data.stickied && // Skip stickied posts
            !data.over_18 && // Skip NSFW content
            data.post_hint === 'image' && // Only image posts
            data.url.match(/\.(jpeg|jpg|gif|png)$/) // Only image URLs
          );
        })
        .map(post => {
          const { data } = post;
          return {
            id: data.id,
            title: data.title,
            author: data.author,
            subreddit: data.subreddit,
            url: data.url,
            permalink: `https://reddit.com${data.permalink}`,
            ups: data.ups,
            num_comments: data.num_comments,
            created_utc: data.created_utc
          };
        });
      
      displayMemes(memes);
      
      // Hide load more button if no more results
      if (!after) {
        loadMoreBtn.style.display = 'none';
      }
    } catch (error) {
      console.error('Error fetching memes:', error);
      window.utils.showToast({
        title: "Error",
        description: "Failed to load memes. Please try again later.",
        variant: "error",
      });
      
      if (memeGrid.children.length === 0) {
        memeGrid.innerHTML = `
          <div class="error-message">
            <p>Failed to load memes. Please try again later.</p>
          </div>
        `;
      }
    } finally {
      loadingSpinner.style.display = 'none';
      if (loadMoreBtn) loadMoreBtn.disabled = false;
      isLoading = false;
    }
  }
  
  /**
   * Display memes in the grid
   * @param {Array} memes - List of meme objects
   */
  function displayMemes(memes) {
    if (memes.length === 0 && memeGrid.children.length === 0) {
      memeGrid.innerHTML = `
        <div class="error-message">
          <p>No memes found. Try a different sort option.</p>
        </div>
      `;
      return;
    }
    
    memes.forEach(meme => {
      const memeCard = window.components.createMemeCard(
        meme,
        handleMemeClick
      );
      
      memeGrid.appendChild(memeCard);
    });
    
    // Initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
  
  /**
   * Handle meme card click
   * @param {Object} meme - Meme object
   */
  function handleMemeClick(meme) {
    openMemeDetailModal(meme);
  }
  
  /**
   * Open meme detail modal
   * @param {Object} meme - Meme object
   */
  function openMemeDetailModal(meme) {
    modalContent.innerHTML = '';
    window.utils.showLoading(modalContent, 'Loading meme details...');
    
    memeDetailModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Display meme details
    setTimeout(() => {
      const detailView = window.components.createMemeDetail(meme);
      modalContent.innerHTML = '';
      modalContent.appendChild(detailView);
      
      // Initialize Lucide icons
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }, 300);
  }
});
