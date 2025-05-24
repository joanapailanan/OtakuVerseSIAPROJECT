<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MediaController;

Route::get('/', function () {
    return view('welcome');
});

// Anime search routes
Route::get('/anime/search', [MediaController::class, 'searchWithAnilistKitsu'])->name('anime.search');
Route::get('/search/anime', [MediaController::class, 'searchWithJikan'])->name('anime.search.advanced');

// Reddit routes
Route::get('/reddit', [MediaController::class, 'showReddit'])->name('reddit.show');
Route::get('/reddit/{subreddit?}', [MediaController::class, 'showReddit'])->name('reddit.show');

// Anime quote route
Route::get('/anime-quote', [MediaController::class, 'getRandomQuote'])->name('anime.quote');

// Waifu pics
Route::get('/waifu/{type}/{category}', [MediaController::class, 'fetch']);
