<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MediaController;

Route::get('/', function () {
    return view('index');
})->name('home');

// Anime routes
Route::get('/anime', function () {
    return view('anime');
})->name('anime.index');
Route::get('/api/anime', [MediaController::class, 'getAnime'])->name('api.anime');

// Characters routes
Route::get('/characters', function () {
    return view('characters');
})->name('characters.index');
Route::get('/api/characters', [MediaController::class, 'searchCharacters'])->name('api.characters');

// Quotes routes
Route::get('/quotes', function () {
    return view('quotes');
})->name('quotes');
Route::get('/api/quotes', [MediaController::class, 'getRandomQuote'])->name('api.quotes');

// Reddit routes
Route::get('/memes', [MediaController::class, 'showReddit'])->name('memes');
Route::get('/reddit/{subreddit?}', [MediaController::class, 'showReddit'])->name('reddit.show');

// Waifu routes
Route::get('/waifu', function () {
    return view('waifu');
})->name('waifu');
Route::get('/waifu/{type}/{category}', [MediaController::class, 'fetch'])->name('waifu.fetch');

// Trace routes
Route::get('/trace', function () {
    return view('trace');
})->name('trace.index');
Route::post('/api/trace', [MediaController::class, 'traceAnime'])->name('api.trace');

// Watchlist route
Route::get('/watchlist', function () {
    return view('watchlist');
})->name('watchlist.index');