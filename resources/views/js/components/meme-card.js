
/**
 * Meme card component for OtakuVerse
 */

window.components = window.components || {};

/**
 * Create a meme card element
 * @param {Object} meme - Meme object
 * @param {Function} onClick - Function to call when card is clicked
 * @returns {HTMLElement} Meme card element
 */
window.components.createMemeCard = (meme, onClick) => {
  const card = document.createElement('div');
  card.className = 'meme-card';
  
  // Apply animation to cards
  card.style.animation = 'fade-in 0.5s ease forwards';
  card.style.opacity = '0';
  card.style.animationDelay = `${Math.random() * 0.3}s`;
  
  // Truncate title if too long
  const truncatedTitle = meme.title.length > 60 
    ? meme.title.substring(0, 60) + '...' 
    : meme.title;
  
  // Format number with k/m suffix
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'm';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    } else {
      return num.toString();
    }
  };
  
  card.innerHTML = `
    <div class="meme-image-container">
      <img src="${meme.url}" alt="${truncatedTitle}" class="meme-image" loading="lazy" />
    </div>
    <div class="meme-info">
      <h3 class="meme-title">${truncatedTitle}</h3>
      <div class="meme-meta">
        <div class="meme-source">
          <i data-lucide="message-square"></i>
          <span>r/${meme.subreddit}</span>
        </div>
        <div class="meme-stats">
          <div class="meme-stat">
            <i data-lucide="arrow-up"></i>
            <span>${formatNumber(meme.ups)}</span>
          </div>
          <div class="meme-stat">
            <i data-lucide="message-circle"></i>
            <span>${formatNumber(meme.num_comments)}</span>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add click event
  card.addEventListener('click', () => onClick(meme));
  
  return card;
};

/**
 * Create a meme detail view
 * @param {Object} meme - Meme object
 * @returns {HTMLElement} Meme detail element
 */
window.components.createMemeDetail = (meme) => {
  const detailElement = document.createElement('div');
  detailElement.className = 'meme-detail';
  
  // Format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  detailElement.innerHTML = `
    <div class="meme-detail-image-container">
      <img src="${meme.url}" alt="${meme.title}" class="meme-detail-image" />
    </div>
    <div class="meme-detail-info">
      <h2 class="meme-detail-title">${meme.title}</h2>
      
      <div class="meme-detail-meta">
        <div class="meme-detail-meta-item">
          <i data-lucide="user"></i>
          <span>Posted by u/${meme.author}</span>
        </div>
        <div class="meme-detail-meta-item">
          <i data-lucide="calendar"></i>
          <span>${formatDate(meme.created_utc)}</span>
        </div>
        <div class="meme-detail-meta-item">
          <i data-lucide="message-square"></i>
          <span>r/${meme.subreddit}</span>
        </div>
        <div class="meme-detail-meta-item">
          <i data-lucide="arrow-up"></i>
          <span>${meme.ups.toLocaleString()} upvotes</span>
        </div>
        <div class="meme-detail-meta-item">
          <i data-lucide="message-circle"></i>
          <span>${meme.num_comments.toLocaleString()} comments</span>
        </div>
      </div>
      
      <div class="meme-detail-actions">
        <a href="${meme.permalink}" target="_blank" rel="noopener noreferrer" class="primary-button">
          <i data-lucide="external-link"></i>
          View on Reddit
        </a>
        <button id="share-meme-btn" class="outline-button">
          <i data-lucide="share-2"></i>
          Share
        </button>
        <button id="save-meme-btn" class="outline-button">
          <i data-lucide="download"></i>
          Save Image
        </button>
      </div>
    </div>
  `;
  
  // Add event listeners after modal is displayed
  setTimeout(() => {
    const shareBtn = detailElement.querySelector('#share-meme-btn');
    const saveBtn = detailElement.querySelector('#save-meme-btn');
    
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        // Check if Web Share API is supported
        if (navigator.share) {
          navigator.share({
            title: meme.title,
            url: meme.permalink
          })
          .catch(error => console.error('Error sharing:', error));
        } else {
          // Fallback: copy URL to clipboard
          navigator.clipboard.writeText(meme.permalink)
            .then(() => {
              window.utils.showToast({
                title: "Link copied",
                description: "Link copied to clipboard!",
                variant: "success",
              });
            })
            .catch(err => {
              console.error('Failed to copy:', err);
              window.utils.showToast({
                title: "Error",
                description: "Failed to copy link.",
                variant: "error",
              });
            });
        }
      });
    }
    
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        // Create a temporary anchor element
        const a = document.createElement('a');
        a.href = meme.url;
        a.download = `meme-${Date.now()}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        window.utils.showToast({
          title: "Download started",
          description: "Image download has started.",
          variant: "success",
        });
      });
    }
  }, 100);
  
  return detailElement;
};
