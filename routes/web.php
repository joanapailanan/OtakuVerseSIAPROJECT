<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RedditController;
use App\Http\Controllers\AnimeController;
use App\Http\Controllers\SearchAnimeController;
use App\Http\Controllers\AnimeQuoteController;
// If needed, you can include this instead or combine logic
// use App\Http\Controllers\AnimeSearchController;

Route::get('/', function () {
    return view('welcome');
});

// Reddit routes
Route::get('/reddit', [RedditController::class, 'show']);
Route::get('/reddit/{subreddit?}', [RedditController::class, 'show']);

// Anime search route (choose one controller)
Route::get('/anime/search', [SearchAnimeController::class, 'search'])->name('anime.search');
// Alternatively, if you prefer this one:
Route::get('/anime/search', [AnimeSearchController::class, 'search'])->name('anime.search');

// Anime Quotes routes
Route::get('/anime-quote', [AnimeQuoteController::class, 'getRandomQuote']);