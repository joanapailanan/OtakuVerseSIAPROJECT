<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Anime Memes - OtakuVerse</title>
    <meta name="description" content="Find and share anime memes with OtakuVerse." />
    <meta name="author" content="OtakuVerse" />
    
    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;500;600&display=swap" />
    
    <!-- Lucide Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lucide-static@latest/font/lucide.min.css" />
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="{{ asset('css/base.css') }}" />
    <link rel="stylesheet" href="{{ asset('css/components.css') }}" />
    <link rel="stylesheet" href="{{ asset('css/layout.css') }}" />
    <link rel="stylesheet" href="{{ asset('css/animations.css') }}" />
    <link rel="stylesheet" href="{{ asset('css/pages/memes.css') }}" />
    <link rel="stylesheet" href="{{ asset('css/footer.css') }}" />
</head>
<body>
    <div id="app">
        <!-- Navigation -->
        <nav class="navigation">
            <div class="nav-container">
                <div class="nav-logo">
                    <a href="/" class="logo-link">
                        <span class="logo-otaku">Otaku</span><span class="logo-verse">Verse</span>
                    </a>
                </div>
                
                <div class="desktop-menu">
                    <a href="/anime" class="nav-link">
                        <i data-lucide="search"></i>
                        <span>Anime</span>
                    </a>
                    <a href="/characters" class="nav-link">
                        <i data-lucide="users"></i>
                        <span>Characters</span>
                    </a>
                    <a href="/quotes" class="nav-link">
                        <i data-lucide="message-square"></i>
                        <span>Quotes</span>
                    </a>
                    <a href="/memes" class="nav-link active">
                        <i data-lucide="smile-plus"></i>
                        <span>Memes</span>
                    </a>
                    <a href="/waifu" class="nav-link">
                        <i data-lucide="image"></i>
                        <span>Waifu</span>
                    </a>
                    <a href="/trace" class="nav-link">
                        <i data-lucide="camera"></i>
                        <span>Trace</span>
                    </a>
                    <a href="/watchlist" class="nav-link">
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
                <a href="/anime" class="nav-link">
                    <i data-lucide="search"></i>
                    <span>Anime</span>
                </a>
                <a href="/characters" class="nav-link">
                    <i data-lucide="users"></i>
                    <span>Characters</span>
                </a>
                <a href="/quotes" class="nav-link">
                    <i data-lucide="message-square"></i>
                    <span>Quotes</span>
                </a>
                <a href="/memes" class="nav-link active">
                    <i data-lucide="smile-plus"></i>
                    <span>Memes</span>
                </a>
                <a href="/waifu" class="nav-link">
                    <i data-lucide="image"></i>
                    <span>Waifu</span>
                </a>
                <a href="/trace" class="nav-link">
                    <i data-lucide="camera"></i>
                    <span>Trace</span>
                </a>
                <a href="/watchlist" class="nav-link">
                    <i data-lucide="heart"></i>
                    <span>Watchlist</span>
                </a>
            </div>
        </nav>

        <!-- Main Content -->
        <main class="container">
            <div class="hero-section">
                <h1 class="page-title">Anime Memes</h1>
                <p class="subtitle">Browse and enjoy the funniest anime memes from Reddit!</p>
                
                <!-- Filters -->
                <div class="filter-container">
                    <div class="filter-label">Sort by:</div>
                    <select id="sort-select" class="filter-select">
                        <option value="hot">Hot</option>
                        <option value="top">Top</option>
                        <option value="new">New</option>
                    </select>
                </div>
            </div>
            
            <div class="content-section">
                <div id="loading-spinner" class="loading-spinner-container" style="display: none;">
                    <div class="spinner-outer">
                        <div class="spinner-inner"></div>
                    </div>
                    <p class="loading-text">Loading memes...</p>
                </div>
                
                <div id="meme-grid" class="meme-grid">
                    @foreach ($posts as $post)
                        <div class="meme-card hover-card" data-post-id="{{ $post['data']['id'] }}">
                            <div class="meme-image-container">
                                @if (isset($post['data']['url']) && (Str::endsWith($post['data']['url'], ['.jpg', '.jpeg', '.png', '.gif'])))
                                    <img src="{{ $post['data']['url'] }}" alt="{{ $post['data']['title'] }}" class="meme-image">
                                @else
                                    <div class="meme-image" style="background-color: #f0f0f0; display: flex; align-items: center; justify-content: center;">
                                        <span>No Image</span>
                                    </div>
                                @endif
                            </div>
                            <div class="meme-info">
                                <h3 class="meme-title">{{ $post['data']['title'] }}</h3>
                                <div class="meme-meta">
                                    <div class="meme-source">
                                        <i data-lucide="external-link"></i>
                                        <a href="https://reddit.com{{ $post['data']['permalink'] }}" target="_blank">Reddit</a>
                                    </div>
                                    <div class="meme-stats">
                                        <div class="meme-stat">
                                            <i data-lucide="arrow-up"></i>
                                            <span>{{ $post['data']['ups'] ?? 0 }}</span>
                                        </div>
                                        <div class="meme-stat">
                                            <i data-lucide="message-square"></i>
                                            <span>{{ $post['data']['num_comments'] ?? 0 }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
                
                <div id="load-more-container" class="load-more-container">
                    <button id="load-more-btn" class="outline-button">
                        <i data-lucide="refresh-cw"></i>
                        Load More
                    </button>
                </div>
            </div>
        </main>

        <!-- Meme Detail Modal -->
        <div id="meme-detail-modal" class="modal">
            <div class="modal-content meme-modal-content">
                <div class="modal-close">
                    <button id="close-modal" aria-label="Close modal">
                        <i data-lucide="x"></i>
                    </button>
                </div>
                <div id="modal-content" class="modal-body">
                    <!-- Modal content will be populated by JavaScript -->
                </div>
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
                                <li><a href="/">Home</a></li>
                                <li><a href="/anime">Anime</a></li>
                                <li><a href="/characters">Characters</a></li>
                                <li><a href="/quotes">Quotes</a></li>
                            </ul>
                        </div>
                        <div class="footer-links-group">
                            <h4 class="footer-links-title">Tools</h4>
                            <ul>
                                <li><a href="/memes">Memes</a></li>
                                <li><a href="/waifu">Waifu Generator</a></li>
                                <li><a href="/trace">Trace Anime</a></li>
                                <li><a href="/watchlist">My Watchlist</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p class="copyright">© 2025 OtakuVerse. All rights reserved.</p>
                    <p class="attribution">Memes from Reddit API.</p>
                </div>
            </div>
        </footer>
        
        <!-- Scripts -->
        <script src="https://cdn.jsdelivr.net/npm/lucide@latest/dist/umd/lucide.min.js"></script>
        <script src="{{ asset('js/utils/storage.js') }}"></script>
        <script src="{{ asset('js/utils/toast.js') }}"></script>
        <script src="{{ asset('js/utils/loading.js') }}"></script>
        <script src="{{ asset('js/components/navigation.js') }}"></script>
        <script src="{{ asset('js/components/meme-card.js') }}"></script>
        <script src="{{ asset('js/pages/memes.js') }}"></script>
    </div>
</body>
</html>