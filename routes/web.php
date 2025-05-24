<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MediaController;

Route::get('/', function () {
    return view('index'); // Changed from 'welcome' to 'index' to match your setup
})->name('home');

// Anime search routes
Route::get('/anime/search', [MediaController::class, 'searchWithAnilistKitsu'])->name('anime.search');
Route::get('/search/anime', [MediaController::class, 'searchWithJikan'])->name('anime.search.advanced');

// Reddit routes
Route::get('/memes', [MediaController::class, 'showReddit'])->name('memes');
Route::get('/reddit', [MediaController::class, 'showReddit'])->name('reddit.show');
Route::get('/reddit/{subreddit?}', [MediaController::class, 'showReddit'])->name('reddit.show');

// Quotes routes
Route::get('/quotes', function () {
    return view('quotes');
})->name('quotes');
Route::get('/api/quotes', [MediaController::class, 'getRandomQuote'])->name('api.quotes');

// Waifu routes
Route::get('/waifu', function () {
    return view('waifu');
})->name('waifu');
Route::get('/waifu/{type}/{category}', [MediaController::class, 'fetch'])->name('waifu.fetch');

// Placeholder routes for navigation
Route::get('/anime', function () {
    return view('anime'); // anime.blade.php or implement MediaController::index
})->name('anime.index');

Route::get('/characters', function () {
    return view('characters'); // characters.blade.php
})->name('characters.index');

Route::get('/trace', function () {
    return view('trace'); // trace.blade.php
})->name('trace.index');

Route::get('/watchlist', function () {
    return view('watchlist'); // watchlist.blade.php
})->name('watchlist.index');