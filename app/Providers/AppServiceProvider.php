<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\AnilistService;
use App\Services\JikanApiService;

class AppServiceProvider extends ServiceProvider
{

    public function register()
    {
        $this->app->singleton(JikanApiService::class, function ($app) {
            return new JikanApiService();
        });
    }
}
