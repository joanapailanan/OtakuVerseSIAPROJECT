/**
 * Quotes page functionality for OtakuVerse
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const quoteCard = document.getElementById('quote-card');
  const quoteText = document.getElementById('quote-text');
  const quoteCharacter = document.getElementById('quote-character');
  const quoteAnime = document.getElementById('quote-anime');
  const loadingSpinner = document.getElementById('loading-spinner');
  const quoteError = document.getElementById('quote-error');
  const getQuoteButton = document.getElementById('get-quote');
  const buttonText = document.getElementById('button-text');

  // Initialize Lucide icons on page load
  if (window.lucide) {
    console.log('Initializing Lucide icons');
    window.lucide.createIcons();
  } else {
    console.error('Lucide library not loaded');
  }

  // Expanded fallback quotes for variety
  const fallbackQuotes = [
    {
      quote: "The world is not beautiful; therefore, it is.",
      character: "Kino",
      anime: "Kino's Journey"
    },
    {
      quote: "If you don't like your destiny, don't accept it. Instead, have the courage to change it the way you want it to be.",
      character: "Naruto Uzumaki",
      anime: "Naruto"
    },
    {
      quote: "People’s lives don’t end when they die. It ends when they lose faith.",
      character: "Itachi Uchiha",
      anime: "Naruto"
    },
    {
      quote: "No matter how deep the night, it always turns to day, eventually.",
      character: "Brook",
      anime: "One Piece"
    },
    {
      quote: "To know sorrow is not terrifying. What is terrifying is to know you can’t go back to happiness you could have.",
      character: "Matsumoto Rangiku",
      anime: "Bleach"
    }
  ];

  // Local storage for caching quotes
  const QUOTE_CACHE_KEY = 'otakuverse_quote_cache';
  const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

  // Clear cache on load
  localStorage.removeItem(QUOTE_CACHE_KEY);

  // Fetch random quote on initial load
  fetchRandomQuote();

  // Event listeners
  if (getQuoteButton) {
    console.log('Adding click event listener to getQuoteButton');
    getQuoteButton.addEventListener('click', fetchRandomQuote);
  } else {
    console.error('getQuoteButton element not found');
  }

  /**
   * Validate a quote object
   * @param {Object} quote - Quote object to validate
   * @returns {boolean} True if valid, false otherwise
   */
  function isValidQuote(quote) {
    const isValid = quote && typeof quote === 'object' && 
                   typeof quote.quote === 'string' && quote.quote &&
                   typeof quote.character === 'string' && quote.character &&
                   typeof quote.anime === 'string' && quote.anime;
    if (!isValid) {
      console.warn('Invalid quote structure:', quote);
    }
    return isValid;
  }

  /**
   * Get cached quotes, filtering out invalid ones
   * @returns {Array} Valid cached quotes
   */
  function getCachedQuotes() {
    const cached = localStorage.getItem(QUOTE_CACHE_KEY);
    if (cached) {
      try {
        const { quotes, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          const validQuotes = quotes.filter(isValidQuote);
          console.log('Returning cached quotes:', validQuotes);
          return validQuotes;
        }
      } catch (e) {
        console.error('Error parsing cached quotes:', e);
      }
    }
    console.log('No valid cached quotes found');
    return [];
  }

  /**
   * Save quotes to cache
   * @param {Array} quotes - Array of quote objects
   */
  function saveToCache(quotes) {
    const validQuotes = quotes.filter(isValidQuote);
    console.log('Saving quotes to cache:', validQuotes);
    localStorage.setItem(QUOTE_CACHE_KEY, JSON.stringify({
      quotes: validQuotes,
      timestamp: Date.now()
    }));
  }

  /**
   * Select a random fallback quote
   * @returns {Object} A random fallback quote
   */
  function getRandomFallbackQuote() {
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    const selectedQuote = fallbackQuotes[randomIndex];
    console.log('Selected fallback quote:', selectedQuote);
    if (!isValidQuote(selectedQuote)) {
      console.error('Fallback quote is invalid:', selectedQuote);
      return fallbackQuotes[0]; // Default to first quote if invalid
    }
    return selectedQuote;
  }

  /**
   * Fetch a random quote (using fallback quotes only for now)
   */
  function fetchRandomQuote() {
    console.log('Starting fetchRandomQuote');
    
    // Show loading state
    if (loadingSpinner) {
      console.log('Showing loading spinner');
      loadingSpinner.style.display = 'flex';
    } else {
      console.error('loadingSpinner element not found');
    }
    if (quoteCard) {
      console.log('Hiding quote card');
      quoteCard.style.display = 'none';
    } else {
      console.error('quoteCard element not found');
    }
    if (quoteError) {
      console.log('Hiding error message');
      quoteError.style.display = 'none';
    } else {
      console.error('quoteError element not found');
    }

    if (getQuoteButton) {
      console.log('Disabling get quote button');
      getQuoteButton.disabled = true;
      if (buttonText) buttonText.textContent = 'Loading...';
    } else {
      console.error('getQuoteButton element not found');
    }

    try {
      // Check cached quotes first
      let cachedQuotes = getCachedQuotes();
      if (cachedQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * cachedQuotes.length);
        console.log('Using cached quote:', cachedQuotes[randomIndex]);
        displayQuote(cachedQuotes[randomIndex]);
        if (loadingSpinner) loadingSpinner.style.display = 'none';
        if (quoteCard) quoteCard.style.display = 'block';
        return;
      }
      
      // Use a fallback quote
      console.log('No cached quotes, using fallback');
      const fallbackQuote = getRandomFallbackQuote();
      

      console.log('Displaying fallback quote:', fallbackQuote);
      displayQuote(fallbackQuote);

      if (loadingSpinner) loadingSpinner.style.display = 'none';
      if (quoteCard) quoteCard.style.display = 'block';
    } catch (error) {
      console.error('Error in fetchRandomQuote:', error);
      if (loadingSpinner) loadingSpinner.style.display = 'none';
      if (quoteError) quoteError.style.display = 'block';

      // Use a random fallback quote
      const fallbackQuote = getRandomFallbackQuote();
      console.log('Displaying fallback quote on error:', fallbackQuote);
      displayQuote(fallbackQuote);

      if (window.utils && window.utils.showToast) {
        console.log('Showing toast notification');
        window.utils.showToast({
          title: "Error",
          description: "Failed to load quote. Showing a default quote.",
          variant: "error",
        });
      } else {
        console.error('Toast utility not available');
      }
    } finally {
      if (getQuoteButton) {
        console.log('Enabling get quote button');
        getQuoteButton.disabled = false;
        if (buttonText) buttonText.textContent = 'Get New Quote';
      }
    }
  }

  /**
   * Display a quote in the UI
   * @param {Object} quote - Quote object with anime, character, and quote properties
   */
  function displayQuote(quote) {
    console.log('Entering displayQuote with quote:', quote);

    // Validate quote object
    if (!isValidQuote(quote)) {
      console.error('Invalid quote object, using default fallback:', quote);
      quote = fallbackQuotes[0]; // Default to first quote
    }

    if (quoteText) {
      console.log('Setting quote text:', quote.quote);
      quoteText.textContent = quote.quote;
    } else {
      console.error('quoteText element not found');
    }

    if (quoteCharacter) {
      console.log('Setting character text:', quote.character);
      quoteCharacter.textContent = quote.character;
    } else {
      console.error('quoteCharacter element not found');
    }

    if (quoteAnime) {
      console.log('Setting anime text:', quote.anime);
      quoteAnime.textContent = quote.anime;
    } else {
      console.error('quoteAnime element not found');
    }

    // Reset the animation to trigger it again
    if (quoteCard) {
      console.log('Resetting quote card animation');
      quoteCard.style.animation = 'none';
      quoteCard.offsetHeight; // Trigger reflow
      quoteCard.style.animation = '';
    } else {
      console.error('quoteCard element not found');
    }
  }
});