<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AnimeController;
use App\Http\Controllers\SearchAnimeController;
use App\Http\Controllers\AnimeSearchController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/anime/search', [SearchAnimeController::class, 'search'])->name('anime.search');
Route::get('/anime/search', [AnimeSearchController::class, 'search'])->name('anime.search');
