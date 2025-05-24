<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OtakuVerse - Anime & Manga Community</title>
    <meta name="description" content="Discover, track and share your favorite anime with OtakuVerse." />
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
    <link rel="stylesheet" href="{{ asset('css/pages/home.css') }}" />
    <link rel="stylesheet" href="{{ asset('css/pages/index.css') }}" />
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
                    <a href="/memes" class="nav-link">
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
                <a href="/memes" class="nav-link">
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

        <!-- Hero Section -->
        <main class="container">
            <section class="hero">
                <div class="hero-content">
                    <h1 class="hero-title">Your Ultimate Anime Experience</h1>
                    <p class="hero-subtitle">Discover, track, and share your favorite anime with a growing community of otakus</p>
                    <div class="hero-buttons">
                        <a href="/anime" class="primary-button">
                            <i data-lucide="search"></i>
                            Browse Anime
                        </a>
                        <a href="/watchlist" class="outline-button">
                            <i data-lucide="heart"></i>
                            My Watchlist
                        </a>
                    </div>
                </div>
                <div class="hero-visual">
                    <div class="anime-card-stack">
                        <div class="anime-card-preview anime-card-preview-1">
                            <img src="https://cdn.myanimelist.net/images/anime/1208/94745.jpg" alt="Fullmetal Alchemist" class="preview-img">
                        </div>
                        <div class="anime-card-preview anime-card-preview-2">
                            <img src="https://cdn.myanimelist.net/images/anime/1764/126627.jpg" alt="Jujutsu Kaisen" class="preview-img">
                        </div>
                        <div class="anime-card-preview anime-card-preview-3">
                            <img src="https://cdn.myanimelist.net/images/anime/5/73199.jpg" alt="One Punch Man" class="preview-img">
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- Features Section -->
            <section class="features-section">
                <h2 class="section-title">Explore OtakuVerse</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i data-lucide="search"></i>
                        </div>
                        <h3 class="feature-title">Browse Anime</h3>
                        <p class="feature-description">Find your favorite shows with our comprehensive anime database.</p>
                        <a href="/anime" class="feature-link">Browse Now</a>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i data-lucide="users"></i>
                        </div>
                        <h3 class="feature-title">Characters</h3>
                        <p class="feature-description">Explore detailed profiles on your favorite anime characters.</p>
                        <a href="/characters" class="feature-link">Meet Characters</a>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i data-lucide="message-square"></i>
                        </div>
                        <h3 class="feature-title">Quotes</h3>
                        <p class="feature-description">Discover memorable quotes from anime that inspire and entertain.</p>
                        <a href="/quotes" class="feature-link">Read Quotes</a>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i data-lucide="smile-plus"></i>
                        </div>
                        <h3 class="feature-title">Memes</h3>
                        <p class="feature-description">Laugh with our collection of anime memes and funny content.</p>
                        <a href="/memes" class="feature-link">See Memes</a>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i data-lucide="image"></i>
                        </div>
                        <h3 class="feature-title">Waifu</h3>
                        <p class="feature-description">Generate random waifu images for your collection.</p>
                        <a href="/waifu" class="feature-link">Generate Waifu</a>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i data-lucide="camera"></i>
                        </div>
                        <h3 class="feature-title">Trace Anime</h3>
                        <p class="feature-description">Upload screenshots to identify which anime they're from.</p>
                        <a href="/trace" class="feature-link">Trace Now</a>
                    </div>
                </div>
            </section>
            
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
                        <p class="attribution">Data provided by Jikan API, AnimeChan, and WaifuPics.</p>
                    </div>
                </div>
            </footer>

            <!-- Toast Container -->
            <div id="toast-container" class="toast-container"></div>
            
            <!-- Scripts -->
            <script src="https://cdn.jsdelivr.net/npm/lucide@latest/dist/umd/lucide.min.js"></script>
            <script src="{{ asset('js/utils/storage.js') }}"></script>
            <script src="{{ asset('js/utils/toast.js') }}"></script>
            <script src="{{ asset('js/components/navigation.js') }}"></script>
            <script src="{{ asset('js/pages/index.js') }}"></script>
        </main>
    </div>
</body>
</html>