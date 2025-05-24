<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AnimeController;
use App\Http\Controllers\SearchAnimeController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/anime/search', [SearchAnimeController::class, 'search'])->name('anime.search');