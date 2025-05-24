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
    },
    {
      quote: "A lesson you learned from pain is not easily forgotten.",
      character: "Holo",
      anime: "Spice and Wolf"
    },
    {
      quote: "A person becomes strong when they have someone they want to protect.",
      character: "Haku",
      anime: "Naruto"
    },
    {
      quote: "Forgetting is like a wound. The wound may heal, but it has already left a scar.",
      character: "Monkey D. Luffy",
      anime: "One Piece"
    },
    {
      quote: "It’s not the face that makes someone a monster; it’s the choices they make with their lives.",
      character: "Naruto Uzumaki",
      anime: "Naruto"
    },
    {
      quote: "The world isn’t perfect. But it’s there for us, doing the best it can… that’s what makes it so damn beautiful.",
      character: "Roy Mustang",
      anime: "Fullmetal Alchemist: Brotherhood"
    },
    {
      quote: "Power comes in response to a need, not a desire. You have to create that need.",
      character: "Goku",
      anime: "Dragon Ball Z"
    },
    {
      quote: "Fear is not evil. It tells you what your weakness is. And once you know your weakness, you can become stronger as well as kinder.",
      character: "Gildarts Clive",
      anime: "Fairy Tail"
    },
    {
      quote: "You should enjoy the little detours. Because that's where you'll find the things more important than what you want.",
      character: "Ging Freecss",
      anime: "Hunter x Hunter"
    },
    {
      quote: "A lesson without pain is meaningless. That’s because you can’t gain something without sacrificing something else.",
      character: "Edward Elric",
      anime: "Fullmetal Alchemist: Brotherhood"
    },
    {
      quote: "Hard work is worthless for those that don’t believe in themselves.",
      character: "Naruto Uzumaki",
      anime: "Naruto"
    },
      {
    quote: "You should enjoy the little moments. Because that’s where you'll find the things that matter most.",
    character: "Gintoki Sakata",
    anime: "Gintama"
  },
  {
    quote: "The world is not something that is given to you. It is something you have to take for yourself.",
    character: "Shogo Makishima",
    anime: "Psycho-Pass"
  },
  {
    quote: "Life is not a game of luck. If you wanna win, work hard.",
    character: "Sora",
    anime: "No Game No Life"
  },
  {
    quote: "You don’t die for your friends, you live for them.",
    character: "Erza Scarlet",
    anime: "Fairy Tail"
  },
  {
    quote: "Everything has its beauty, but not everyone sees it.",
    character: "Konata Izumi",
    anime: "Lucky Star"
  },
  {
    quote: "In our society, letting others find out that you're a nice guy is a very risky move. It's extremely likely that someone would take advantage of that.",
    character: "Hitagi Senjougahara",
    anime: "Bakemonogatari"
  },
  {
    quote: "Even if I can’t do it now, I’ll get stronger and stronger until I can. That’s the spirit of a warrior.",
    character: "Yato",
    anime: "Noragami"
  },
  {
    quote: "I want to be stronger. Strong enough so that no one will have to worry about me.",
    character: "Hinata Hyuga",
    anime: "Naruto"
  },
  {
    quote: "Fear is freedom! Subjugation is liberation! Contradiction is truth!",
    character: "Satsuki Kiryuuin",
    anime: "Kill la Kill"
  },
  {
    quote: "You need to accept the fact that you're not the best and have all the will to strive to be better than anyone you face.",
    character: "Roronoa Zoro",
    anime: "One Piece"
  },
  {
    quote: "Power is not determined by your size, but the size of your heart and dreams.",
    character: "Lumen Hikari",
    anime: "Pokémon"
  },
  {
    quote: "Whether a fish lives in a clear stream or a water ditch, so long as it continues swimming forward, it will grow up beautifully.",
    character: "Koro Sensei",
    anime: "Assassination Classroom"
  },
  {
    quote: "The world is cruel, but also very beautiful.",
    character: "Mikasa Ackerman",
    anime: "Attack on Titan"
  },
  {
    quote: "A person grows up when he's able to overcome hardships. Protection is important, but there are some things a person must learn on his own.",
    character: "Reigen Arataka",
    anime: "Mob Psycho 100"
  },
  {
    quote: "Miracles don’t happen by just sitting around. We have to make them happen ourselves.",
    character: "Tsubaki Nakatsukasa",
    anime: "Soul Eater"
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