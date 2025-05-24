<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Waifu Generator - OtakuVerse</title>
    <meta name="description" content="Generate random waifu images with OtakuVerse." />
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
    <link rel="stylesheet" href="{{ asset('css/pages/waifu.css') }}" />
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
                <h1 class="page-title">Waifu Generator</h1>
                <p class="subtitle">Generate random anime waifu images!</p>
            </div>
            
            <div class="content-section">
                <div class="waifu-container">
                    <div class="waifu-options">
                        <div class="waifu-option-group">
                            <label for="type-select" class="waifu-label">Type:</label>
                            <select id="type-select" class="waifu-select">
                                <option value="sfw">SFW</option>
                                <option value="nsfw">NSFW</option>
                            </select>
                        </div>
                        <div class="waifu-option-group">
                            <label for="category-select" class="waifu-label">Category:</label>
                            <select id="category-select" class="waifu-select">
                                <!-- SFW Categories -->
                                <option value="waifu" data-type="sfw">Waifu</option>
                                <option value="neko" data-type="sfw">Neko</option>
                                <option value="shinobu" data-type="sfw">Shinobu</option>
                                <option value="megumin" data-type="sfw">Megumin</option>
                                <option value="bully" data-type="sfw">Bully</option>
                                <option value="cuddle" data-type="sfw">Cuddle</option>
                                <option value="hug" data-type="sfw">Hug</option>
                                <option value="awoo" data-type="sfw">Awoo</option>
                                <option value="pat" data-type="sfw">Pat</option>
                                <option value="smug" data-type="sfw">Smug</option>
                                <option value="bonk" data-type="sfw">Bonk</option>
                                <option value="blush" data-type="sfw">Blush</option>
                                <option value="smile" data-type="sfw">Smile</option>
                                <option value="wave" data-type="sfw">Wave</option>
                                <option value="happy" data-type="sfw">Happy</option>
                                <option value="dance" data-type="sfw">Dance</option>
                                <!-- NSFW Categories -->
                                <option value="waifu" data-type="nsfw">Waifu (NSFW)</option>
                                <option value="neko" data-type="nsfw">Neko (NSFW)</option>
                                <option value="trap" data-type="nsfw">Trap</option>
                            </select>
                        </div>
                        
                        <button id="generate-btn" class="primary-button">
                            <i data-lucide="refresh-cw"></i>
                            Generate Random Waifu
                        </button>
                        
                        <button id="download-btn" class="outline-button" disabled>
                            <i data-lucide="download"></i>
                            Download Image
                        </button>
                    </div>
                    
                    <div class="waifu-display">
                        <div id="loading-spinner" class="loading-spinner-container">
                            <div class="spinner-outer">
                                <div class="spinner-inner"></div>
                            </div>
                            <p class="loading-text">Generating waifu...</p>
                        </div>
                        
                        <div id="waifu-image-container" class="waifu-image-container">
                            <img id="waifu-image" class="waifu-image" alt="Waifu image will appear here" />
                        </div>
                    </div>
                </div>
                
                <div class="waifu-gallery">
                    <h2 class="section-title">Your Gallery</h2>
                    <p class="gallery-empty-text">Your saved waifus will appear here.</p>
                    <div id="gallery-grid" class="gallery-grid"></div>
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
                    <div class="footer-links">
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
                    <p class="attribution">Images from Waifu Pics API.</p>
                </div>
            </div>
        </footer>
        
        <!-- Scripts -->
        <script src="https://cdn.jsdelivr.net/npm/lucide@latest/dist/umd/lucide.min.js"></script>
        <script src="{{ asset('js/utils/storage.js') }}"></script>
        <script src="{{ asset('js/utils/toast.js') }}"></script>
        <script src="{{ asset('js/utils/loading.js') }}"></script>
        <script src="{{ asset('js/components/navigation.js') }}"></script>
        <script src="{{ asset('js/pages/waifu.js') }}"></script>
    </div>
</body>
</html>