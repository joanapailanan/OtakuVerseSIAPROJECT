
/**
 * Trace anime page functionality for OtakuVerse
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const dropArea = document.getElementById('drop-area');
  const fileInput = document.getElementById('file-input');
  const previewContainer = document.getElementById('preview-container');
  const previewImage = document.getElementById('preview-image');
  const removeImageBtn = document.getElementById('remove-image-btn');
  const traceBtn = document.getElementById('trace-btn');
  const resultContainer = document.getElementById('result-container');
  const resultContent = document.getElementById('result-content');
  const loadingSpinner = document.getElementById('loading-spinner');
  const historyEmpty = document.getElementById('history-empty');
  const historyContainer = document.getElementById('history-container');
  
  // Variables
  let selectedFile = null;
  
  // Initialize
  loadTraceHistory();
  
  // Event listeners for drop area
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
  });
  
  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  ['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
  });
  
  ['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
  });
  
  function highlight() {
    dropArea.classList.add('drag-over');
  }
  
  function unhighlight() {
    dropArea.classList.remove('drag-over');
  }
  
  dropArea.addEventListener('drop', handleDrop, false);
  
  function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length > 0) {
      handleFiles(files);
    }
  }
  
  // File input change event
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      handleFiles(fileInput.files);
    }
  });
  
  // Remove image button
  removeImageBtn.addEventListener('click', () => {
    resetUploadArea();
  });
  
  // Trace button
  traceBtn.addEventListener('click', traceAnime);
  
  /**
   * Handle selected files
   * @param {FileList} files - List of selected files
   */
  function handleFiles(files) {
    const file = files[0];
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      window.utils.showToast({
        title: "Invalid file",
        description: "Only JPG, PNG, and GIF images are supported.",
        variant: "error",
      });
      return;
    }
    
    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      window.utils.showToast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
        variant: "error",
      });
      return;
    }
    
    // Preview the image
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.src = e.target.result;
      previewContainer.style.display = 'block';
      dropArea.querySelector('.drop-message').style.display = 'none';
      selectedFile = file;
      traceBtn.disabled = false;
    };
    reader.readAsDataURL(file);
  }
  
  /**
   * Reset the upload area
   */
  function resetUploadArea() {
    previewContainer.style.display = 'none';
    dropArea.querySelector('.drop-message').style.display = 'block';
    fileInput.value = '';
    selectedFile = null;
    traceBtn.disabled = true;
  }
  
  /**
   * Trace anime from uploaded image
   */
  async function traceAnime() {
    if (!selectedFile) return;
    
    resultContent.style.display = 'none';
    loadingSpinner.style.display = 'flex';
    
    try {
      // Create FormData
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      // Use trace.moe API
      const response = await fetch('https://api.trace.moe/search', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) throw new Error('Failed to trace anime');
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      const result = data.result[0]; // Take the top match
      
      // Calculate confidence percentage
      const confidence = Math.round(result.similarity * 100);
      
      // Format time
      const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      };
      
      // Get confidence level class
      const getConfidenceClass = (confidence) => {
        if (confidence >= 90) return 'high';
        if (confidence >= 75) return 'medium';
        return 'low';
      };
      
      // Save to history
      saveToHistory({
        title: result.filename,
        anilist_id: result.anilist,
        image: URL.createObjectURL(selectedFile),
        thumbnail: result.image,
        similarity: result.similarity,
        timestamp: Date.now()
      });
      
      // Build the result HTML
      resultContent.innerHTML = `
        <div class="result-header">
          <div class="result-thumbnail">
            <img src="${result.image}" alt="Matched scene" />
          </div>
          <div class="result-info">
            <h3 class="result-title">${result.filename}</h3>
            <div class="result-meta">
              <div class="result-meta-item">
                <div class="result-meta-label">Confidence</div>
                <div class="result-meta-value ${getConfidenceClass(confidence)}">${confidence}%</div>
              </div>
              <div class="result-meta-item">
                <div class="result-meta-label">Episode</div>
                <div class="result-meta-value">${result.episode || 'N/A'}</div>
              </div>
              <div class="result-meta-item">
                <div class="result-meta-label">Timestamp</div>
                <div class="result-meta-value">${formatTime(result.from)} - ${formatTime(result.to)}</div>
              </div>
            </div>
            
            <div class="result-actions">
              <a href="https://anilist.co/anime/${result.anilist}" target="_blank" rel="noopener noreferrer" class="primary-button">
                <i data-lucide="external-link"></i>
                View on AniList
              </a>
              <button id="try-another-btn" class="outline-button">
                <i data-lucide="refresh-cw"></i>
                Try Another Image
              </button>
            </div>
          </div>
        </div>
        
        <div class="result-scene">
          <h4 class="result-scene-title">Matched Scene</h4>
          <video class="result-video" controls autoplay muted>
            <source src="${result.video}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
      `;
      
      // Show result
      loadingSpinner.style.display = 'none';
      resultContent.style.display = 'block';
      
      // Initialize Lucide icons
      if (window.lucide) {
        window.lucide.createIcons();
      }
      
      // Add event listener to the "Try Another" button
      const tryAnotherBtn = document.getElementById('try-another-btn');
      if (tryAnotherBtn) {
        tryAnotherBtn.addEventListener('click', resetUploadArea);
      }
      
      // Reload trace history
      loadTraceHistory();
      
    } catch (error) {
      console.error('Error tracing anime:', error);
      loadingSpinner.style.display = 'none';
      
      resultContent.innerHTML = `
        <div class="error-message">
          <p>Failed to trace anime from this image. Please try a clearer screenshot or a different image.</p>
          <button id="try-another-btn" class="outline-button">
            <i data-lucide="refresh-cw"></i>
            Try Another Image
          </button>
        </div>
      `;
      
      resultContent.style.display = 'block';
      
      // Initialize Lucide icons
      if (window.lucide) {
        window.lucide.createIcons();
      }
      
      const tryAnotherBtn = document.getElementById('try-another-btn');
      if (tryAnotherBtn) {
        tryAnotherBtn.addEventListener('click', resetUploadArea);
      }
      
      window.utils.showToast({
        title: "Error",
        description: "Failed to trace anime. Please try a different image.",
        variant: "error",
      });
    }
  }
  
  /**
   * Save a trace result to history
   * @param {Object} result - Trace result object
   */
  function saveToHistory(result) {
    // Get existing history
    const history = window.utils.getFromStorage('traceHistory', []);
    
    // Add to history (limit to 10 items)
    if (history.length >= 10) {
      history.pop(); // Remove oldest item
    }
    
    // Add new item at the beginning
    history.unshift({
      title: result.title,
      anilist_id: result.anilist_id,
      thumbnail: result.thumbnail,
      similarity: result.similarity,
      timestamp: result.timestamp
    });
    
    // Save to storage
    window.utils.saveToStorage('traceHistory', history);
  }
  
  /**
   * Load trace history from storage
   */
  function loadTraceHistory() {
    const history = window.utils.getFromStorage('traceHistory', []);
    
    historyContainer.innerHTML = '';
    
    if (history.length === 0) {
      historyEmpty.style.display = 'block';
      return;
    }
    
    historyEmpty.style.display = 'none';
    
    history.forEach((item, index) => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      
      // Format date
      const formattedDate = new Date(item.timestamp).toLocaleDateString();
      
      // Calculate confidence percentage
      const confidence = Math.round(item.similarity * 100);
      
      historyItem.innerHTML = `
        <img src="${item.thumbnail}" alt="${item.title}" class="history-image" />
        <div class="history-info">
          <h4 class="history-title">${item.title}</h4>
          <div class="history-meta">
            <span>Confidence: ${confidence}%</span>
            <span>${formattedDate}</span>
          </div>
        </div>
      `;
      
      // Add click event to open on AniList
      historyItem.addEventListener('click', () => {
        window.open(`https://anilist.co/anime/${item.anilist_id}`, '_blank');
      });
      
      historyContainer.appendChild(historyItem);
    });
  }
});
