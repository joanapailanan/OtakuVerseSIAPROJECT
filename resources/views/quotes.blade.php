<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Quotes - OtakuVerse</title>
    <meta name="description" content="Discover inspiring and memorable quotes from your favorite anime characters." />
    <meta name="author" content="OtakuVerse" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    
    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;500;600&display=swap" />
    
    <!-- Lucide Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lucide-static@latest/font/lucide.min.css" />
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="{{ asset('css/base.css') }}" />
    <link rel="stylesheet" href="{{ asset('css/components.css') }}" />
    <link rel="stylesheet" href="{{ asset('css/layout.css') }}" />
    <link rel="stylesheet" href="{{ asset('css/animations.css') }}" />
    <link rel="stylesheet" href="{{ asset('css/pages/quotes.css') }}" />
</head>
<body>
    <div id="app">
        <!-- Navigation -->
        <nav class="navigation">
            <div class="nav-container">
                <div class="nav-logo">
                    <a href="{{ route('home') }}" class="logo-link">
                        <span class="logo-otaku">Otaku</span><span class="logo-verse">Verse</span>
                    </a>
                </div>
                
                <div class="desktop-menu">
                    <a href="{{ route('anime.index') }}" class="nav-link {{ request()->routeIs('anime.index') ? 'active' : '' }}">
                        <i data-lucide="search"></i>
                        <span>Anime</span>
                    </a>
                    <a href="{{ route('characters.index') }}" class="nav-link {{ request()->routeIs('characters.index') ? 'active' : '' }}">
                        <i data-lucide="users"></i>
                        <span>Characters</span>
                    </a>
                    <a href="{{ route('quotes') }}" class="nav-link {{ request()->routeIs('quotes') ? 'active' : '' }}">
                        <i data-lucide="message-square"></i>
                        <span>Quotes</span>
                    </a>
                    <a href="{{ route('memes') }}" class="nav-link {{ request()->routeIs('memes') ? 'active' : '' }}">
                        <i data-lucide="smile-plus"></i>
                        <span>Memes</span>
                    </a>
                    <a href="{{ route('waifu') }}" class="nav-link {{ request()->routeIs('waifu') ? 'active' : '' }}">
                        <i data-lucide="image"></i>
                        <span>Waifu</span>
                    </a>
                    <a href="{{ route('trace.index') }}" class="nav-link {{ request()->routeIs('trace.index') ? 'active' : '' }}">
                        <i data-lucide="camera"></i>
                        <span>Trace</span>
                    </a>
                    <a href="{{ route('watchlist.index') }}" class="nav-link {{ request()->routeIs('watchlist.index') ? 'active' : '' }}">
                        <i data-lucide="heart"></i>
                        <span>Watchlist</span>
                    </a>
                </div>
                
                <div class="mobile-menu-btn">
                    <button id="menu-toggle" aria-label="Toggle mobile menu">
                        <i id="menu-icon" data-lucide="menu"></i>
                    </button>
                </div>
            </div>
            
            <div id="mobile-menu" class="mobile-menu">
                <a href="{{ route('anime.index') }}" class="nav-link {{ request()->routeIs('anime.index') ? 'active' : '' }}">
                    <i data-lucide="search"></i>
                    <span>Anime</span>
                </a>
                <a href="{{ route('characters.index') }}" class="nav-link {{ request()->routeIs('characters.index') ? 'active' : '' }}">
                    <i data-lucide="users"></i>
                    <span>Characters</span>
                </a>
                <a href="{{ route('quotes') }}" class="nav-link {{ request()->routeIs('quotes') ? 'active' : '' }}">
                    <i data-lucide="message-square"></i>
                    <span>Quotes</span>
                </a>
                <a href="{{ route('memes') }}" class="nav-link {{ request()->routeIs('memes') ? 'active' : '' }}">
                    <i data-lucide="smile-plus"></i>
                    <span>Memes</span>
                </a>
                <a href="{{ route('waifu') }}" class="nav-link {{ request()->routeIs('waifu') ? 'active' : '' }}">
                    <i data-lucide="image"></i>
                    <span>Waifu</span>
                </a>
                <a href="{{ route('trace.index') }}" class="nav-link {{ request()->routeIs('trace.index') ? 'active' : '' }}">
                    <i data-lucide="camera"></i>
                    <span>Trace</span>
                </a>
                <a href="{{ route('watchlist.index') }}" class="nav-link {{ request()->routeIs('watchlist.index') ? 'active' : '' }}">
                    <i data-lucide="heart"></i>
                    <span>Watchlist</span>
                </a>
            </div>
        </nav>

        <!-- Main Content -->
        <main class="container">
            <div class="hero-section">
                <h1 class="page-title">Anime Quotes</h1>
                <p class="subtitle">Discover inspiring, funny, and memorable quotes from your favorite anime characters!</p>
            </div>
            
            <div class="content-section">
                <div class="quote-container">
                    <div id="loading-spinner" class="loading-spinner-container">
                        <div class="spinner-outer">
                            <div class="spinner-inner"></div>
                        </div>
                        <p class="loading-text">Loading quote...</p>
                    </div>
                    
                    <div id="quote-card" class="quote-card fade-in" style="display: none;">
                        <div class="quote-icon">
                            <i data-lucide="message-circle"></i>
                        </div>
                        <blockquote id="quote-text" class="quote-text"></blockquote>
                        <div class="quote-footer">
                            <div>
                                <p id="quote-character" class="quote-character"></p>
                                <p id="quote-anime" class="quote-anime"></p>
                            </div>
                        </div>
                    </div>
                    
                    <div id="quote-error" class="error-message" style="display: none;">
                        <p>Failed to load quote. Please try again.</p>
                    </div>
                    
                    <div class="quote-controls">
                        <button id="get-quote" class="primary-button">
                            <span id="button-text">Get New Quote</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>

        <!-- Toast Container -->
        <div id="toast-container" class="toast-container"></div>

        <!-- Scripts -->
        <script src="https://cdn.jsdelivr.net/npm/lucide@latest/dist/umd/lucide.min.js"></script>
        <script src="{{ asset('js/utils/storage.js') }}"></script>
        <script src="{{ asset('js/utils/toast.js') }}"></script>
        <script src="{{ asset('js/utils/loading.js') }}"></script>
        <script src="{{ asset('js/components/navigation.js') }}"></script>
        <script src="{{ asset('js/pages/quotes.js') }}"></script>
    </div>
</body>
</html>