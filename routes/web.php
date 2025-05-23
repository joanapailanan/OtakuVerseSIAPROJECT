<?php

use Illuminate\Support\Facades\Route;
//use App\Http\Controllers\RedditController;
//use App\Http\Controllers\AnimeController;
//use App\Http\Controllers\SearchAnimeController;
// If needed, you can include this instead or combine logic
//use App\Http\Controllers\AnimeSearchController;
use App\Http\Controllers\MediaController;

Route::get('/', function () {
    return view('welcome');
});

/*
// Reddit routes
Route::get('/reddit', [RedditController::class, 'show']);
Route::get('/reddit/{subreddit?}', [RedditController::class, 'show']);

// Anime search route (choose one controller)
Route::get('/anime/search', [SearchAnimeController::class, 'search'])->name('anime.search');
// Alternatively, if you prefer this one:
Route::get('/search/anime', [AnimeSearchController::class, 'search'])->name('anime.search.advanced');
*/

Route::get('/search/anime', [MediaController::class, 'searchWithJikan'])->name('anime.search.advanced');
Route::get('/anime/search', [MediaController::class, 'searchWithAnilistKitsu'])->name('anime.search');
Route::get('/reddit/{subreddit?}', [MediaController::class, 'showReddit'])->name('reddit.show');
Route::get('/reddit', [MediaController::class, 'showReddit'])->name('reddit.show');