<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Watchlist - OtakuVerse</title>
    <meta name="description" content="Manage your anime watchlist with OtakuVerse." />
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
    <link rel="stylesheet" href="{{ asset('css/pages/watchlist.css') }}" />
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
                <h1 class="page-title">My Watchlist</h1>
                <p class="subtitle">Manage your anime watchlist and track your progress</p>
            </div>
            
            <div class="content-section">
                <div class="watchlist-filters">
                    <button class="tab-btn active" data-filter="all">All</button>
                    <button class="tab-btn" data-filter="watching">
                        <i data-lucide="play"></i>Watching
                    </button>
                    <button class="tab-btn" data-filter="completed">
                        <i data-lucide="check"></i>Completed
                    </button>
                    <button class="tab-btn" data-filter="plan">
                        <i data-lucide="list"></i>Plan to Watch
                    </button>
                    <button class="tab-btn" data-filter="dropped">
                        <i data-lucide="x"></i>Dropped
                    </button>
                </div>
                
                <div id="watchlist-empty" class="watchlist-empty">
                    <div class="empty-icon">
                        <i data-lucide="list-x"></i>
                    </div>
                    <p class="empty-message">Your watchlist is empty</p>
                    <p class="empty-hint">Add anime to your watchlist by clicking the heart icon when browsing anime</p>
                    <a href="{{ route('anime.index') }}" class="primary-button">
                        <i data-lucide="search"></i>
                        Browse Anime
                    </a>
                </div>
                
                <div id="watchlist-stats-container" class="watchlist-stats-container">
                    <div class="watchlist-stats">
                        <div class="stat-item">
                            <div class="stat-value" id="total-count">0</div>
                            <div class="stat-label">Total Anime</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value" id="watching-count">0</div>
                            <div class="stat-label">Watching</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value" id="completed-count">0</div>
                            <div class="stat-label">Completed</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value" id="plan-count">0</div>
                            <div class="stat-label">Plan to Watch</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value" id="dropped-count">0</div>
                            <div class="stat-label">Dropped</div>
                        </div>
                    </div>
                </div>
                
                <div id="watchlist-container" class="watchlist-container"></div>
            </div>
        </main>

        <!-- Anime Detail Modal -->
        <div id="anime-detail-modal" class="modal">
            <div class="modal-content">
                <div class="modal-close">
                    <button id="close-modal" aria-label="Close modal">
                        <i data-lucide="x"></i>
                    </button>
                </div>
                <div id="modal-content" class="modal-body"></div>
            </div>
        </div>

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
                    <p class="attribution">Data provided by Jikan API, AnimeChan, and WaifuPics.</p>
                </div>
            </div>
        </footer>
        
        <!-- Scripts -->
        <script src="https://cdn.jsdelivr.net/npm/lucide@latest/dist/umd/lucide.min.js"></script>
        <script src="{{ asset('js/utils/storage.js') }}"></script>
        <script src="{{ asset('js/utils/toast.js') }}"></script>
        <script src="{{ asset('js/utils/loading.js') }}"></script>
        <script src="{{ asset('js/components/navigation.js') }}"></script>
        <script src="{{ asset('js/pages/watchlist.js') }}"></script>
    </div>
</body>
</html>