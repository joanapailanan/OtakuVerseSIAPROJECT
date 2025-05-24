
/**
 * Waifu generator page functionality for OtakuVerse
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const categorySelect = document.getElementById('category-select');
  const generateBtn = document.getElementById('generate-btn');
  const downloadBtn = document.getElementById('download-btn');
  const waifuImageContainer = document.getElementById('waifu-image-container');
  const waifuImage = document.getElementById('waifu-image');
  const loadingSpinner = document.getElementById('loading-spinner');
  const galleryGrid = document.getElementById('gallery-grid');
  const galleryEmptyText = document.querySelector('.gallery-empty-text');
  
  // Variables
  let currentWaifuUrl = null;
  
  // Initialize
  loadGallery();
  
  // Event listeners
  if (generateBtn) {
    generateBtn.addEventListener('click', generateWaifu);
  }
  
  if (downloadBtn) {
    downloadBtn.addEventListener('click', downloadWaifu);
  }
  
  /**
   * Generate a random waifu image
   */
  async function generateWaifu() {
    // Get selected category
    const category = categorySelect.value;
    
    // Show loading spinner
    waifuImageContainer.style.display = 'none';
    loadingSpinner.style.display = 'flex';
    downloadBtn.disabled = true;
    
    try {
      const response = await fetch(`https://api.waifu.pics/sfw/${category}`);
      if (!response.ok) throw new Error('Failed to fetch waifu image');
      
      const data = await response.json();
      
      // Display the waifu image
      waifuImage.onload = () => {
        waifuImageContainer.style.display = 'block';
        loadingSpinner.style.display = 'none';
        downloadBtn.disabled = false;
        
        // Apply animation
        waifuImage.style.animation = 'fade-in 0.5s ease forwards';
      };
      
      waifuImage.src = data.url;
      currentWaifuUrl = data.url;
      
      // Add to gallery automatically
      addToGallery(data.url);
      
    } catch (error) {
      console.error('Error generating waifu:', error);
      window.utils.showToast({
        title: "Error",
        description: "Failed to generate waifu image. Please try again.",
        variant: "error",
      });
      loadingSpinner.style.display = 'none';
    }
  }
  
  /**
   * Download the currently displayed waifu image
   */
  function downloadWaifu() {
    if (!currentWaifuUrl) return;
    
    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = currentWaifuUrl;
    a.download = `waifu-${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    window.utils.showToast({
      title: "Download started",
      description: "Your waifu image download has started.",
      variant: "success",
    });
  }
  
  /**
   * Load saved waifu images from storage
   */
  function loadGallery() {
    const gallery = window.utils.getFromStorage('waifuGallery', []);
    
    if (gallery.length === 0) {
      galleryEmptyText.style.display = 'block';
      return;
    }
    
    galleryEmptyText.style.display = 'none';
    
    gallery.forEach((imageUrl, index) => {
      createGalleryItem(imageUrl, index);
    });
    
    // Initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
  
  /**
   * Add a waifu image to the gallery
   * @param {string} imageUrl - URL of the waifu image
   */
  function addToGallery(imageUrl) {
    // Get existing gallery
    const gallery = window.utils.getFromStorage('waifuGallery', []);
    
    // Skip if image already in gallery
    if (gallery.includes(imageUrl)) return;
    
    // Add to gallery (limit to 20 images)
    if (gallery.length >= 20) {
      gallery.shift(); // Remove oldest image
    }
    gallery.push(imageUrl);
    
    // Save to storage
    window.utils.saveToStorage('waifuGallery', gallery);
    
    // Update UI
    galleryEmptyText.style.display = 'none';
    createGalleryItem(imageUrl, gallery.length - 1);
    
    // Initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
  
  /**
   * Create a gallery item element
   * @param {string} imageUrl - URL of the waifu image
   * @param {number} index - Index in the gallery array
   */
  function createGalleryItem(imageUrl, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.index = index;
    
    // Apply animation to gallery items
    item.style.animation = 'fade-in 0.5s ease forwards';
    item.style.opacity = '0';
    
    item.innerHTML = `
      <img src="${imageUrl}" alt="Saved waifu image" class="gallery-image" loading="lazy" />
      <div class="gallery-actions">
        <button class="gallery-remove-btn" aria-label="Remove from gallery">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    `;
    
    // Add event listeners
    const removeBtn = item.querySelector('.gallery-remove-btn');
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      removeFromGallery(index);
    });
    
    // Click to show in main display
    item.addEventListener('click', () => {
      waifuImage.src = imageUrl;
      currentWaifuUrl = imageUrl;
      waifuImageContainer.style.display = 'block';
      downloadBtn.disabled = false;
    });
    
    galleryGrid.appendChild(item);
  }
  
  /**
   * Remove a waifu image from the gallery
   * @param {number} index - Index in the gallery array
   */
  function removeFromGallery(index) {
    // Get existing gallery
    const gallery = window.utils.getFromStorage('waifuGallery', []);
    
    // Remove the image
    gallery.splice(index, 1);
    
    // Save to storage
    window.utils.saveToStorage('waifuGallery', gallery);
    
    // Update UI
    galleryGrid.innerHTML = '';
    
    if (gallery.length === 0) {
      galleryEmptyText.style.display = 'block';
    } else {
      gallery.forEach((imageUrl, i) => {
        createGalleryItem(imageUrl, i);
      });
    }
    
    // Initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
    
    window.utils.showToast({
      title: "Image removed",
      description: "Image has been removed from your gallery.",
      variant: "success",
    });
  }
  
  // Generate a waifu image on page load
  generateWaifu();
});
