<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RedditController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/reddit', [RedditController::class, 'show']);
Route::get('/reddit/{subreddit?}', [RedditController::class, 'show']);