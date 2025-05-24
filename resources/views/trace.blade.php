<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Trace Anime - OtakuVerse</title>
    <meta name="description" content="Find anime by uploading screenshots with OtakuVerse." />
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
    <link rel="stylesheet" href="{{ asset('css/pages/trace.css') }}" />
    <link rel="stylesheet" href="{{ asset('css/footer.css') }}" />
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
                <h1 class="page-title">Trace Anime</h1>
                <p class="subtitle">Upload a screenshot to find what anime it's from!</p>
            </div>
            
            <div class="content-section">
                <div class="trace-container">
                    <div class="upload-section">
                        <div id="drop-area" class="drop-area">
                            <div class="drop-message">
                                <div class="upload-icon">
                                    <i data-lucide="upload-cloud"></i>
                                </div>
                                <p>Drag & drop an image here or click to browse</p>
                                <p class="upload-hint">Supports JPG, PNG, and GIF up to 5MB</p>
                                <input type="file" id="file-input" accept="image/*" class="file-input" />
                            </div>
                            
                            <div id="preview-container" class="preview-container">
                                <img id="preview-image" class="preview-image" alt="Preview" />
                                <button id="remove-image-btn" class="remove-image-btn">
                                    <i data-lucide="x"></i>
                                </button>
                            </div>
                        </div>
                        
                        <button id="trace-btn" class="primary-button" disabled>
                            <i data-lucide="search"></i>
                            Trace Anime
                        </button>
                    </div>
                    
                    <div id="result-container" class="result-container">
                        <div id="loading-spinner" class="loading-spinner-container">
                            <div class="spinner-outer">
                                <div class="spinner-inner"></div>
                            </div>
                            <p class="loading-text">Analyzing image...</p>
                        </div>
                        
                        <div id="result-content" class="result-content"></div>
                    </div>
                </div>
                
                <div class="trace-history">
                    <h2 class="section-title">Recent Traces</h2>
                    <p id="history-empty" class="history-empty-text">Your recent trace history will appear here.</p>
                    <div id="history-container" class="history-container"></div>
                </div>
            </div>
        </main>

        <!-- Toast Container -->
        <div id="toast-container" class="toast-container"></div>
        
        <!-- Footer -->
        <footer class="site-footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-logo">
                        <span class="logo-otaku">Otaku</span><span class="logo-verse">Verse</span>
                        <p class="footer-tagline">Your Ultimate Anime Hub</p>
                    </div>
                    <div class="footer-links Yapf-ignore">
                        <div class="footer-links-group">
                            <h4 class="footer-links-title">Navigation</h4>
                            <ul>
                                <li><a href="{{ route('home') }}">Home</a></li>
                                <li><a href="{{ route('anime.index') }}">Anime</a></li>
                                <li><a href="{{ route('characters.index') }}">Characters</a></li>
                                <li><a href="{{ route('quotes') }}">Quotes</a></li>
                            </ul>
                        </div>
                        <div class="footer-links-group">
                            <h4 class="footer-links-title">Tools</h4>
                            <ul>
                                <li><a href="{{ route('memes') }}">Memes</a></li>
                                <li><a href="{{ route('waifu') }}">Waifu Generator</a></li>
                                <li><a href="{{ route('trace.index') }}">Trace Anime</a></li>
                                <li><a href="{{ route('watchlist.index') }}">My Watchlist</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p class="copyright">© 2025 OtakuVerse. All rights reserved.</p>
                    <p class="attribution">Trace powered by trace.moe API.</p>
                </div>
            </div>
        </footer>
        
        <!-- Scripts -->
        <script src="https://cdn.jsdelivr.net/npm/lucide@latest/dist/umd/lucide.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="{{ asset('js/utils/storage.js') }}"></script>
        <script src="{{ asset('js/utils/toast.js') }}"></script>
        <script src="{{ asset('js/utils/loading.js') }}"></script>
        <script src="{{ asset('js/components/navigation.js') }}"></script>
        <script src="{{ asset('js/pages/trace.js') }}"></script>
    </div>
</body>
</html>