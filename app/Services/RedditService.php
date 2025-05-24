<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;


class RedditService
{
    protected $token;

    public function __construct()
    {
        $this->authenticate();
    }

    protected function authenticate()
    {
        $response = Http::asForm()->withHeaders([
            'User-Agent' => config('services.reddit.user_agent')
        ])->withBasicAuth(
            config('services.reddit.client_id'),
            config('services.reddit.client_secret')
        )->post('https://www.reddit.com/api/v1/access_token', [
            'grant_type' => 'password',
            'username' => config('services.reddit.username'),
            'password' => config('services.reddit.password')
        ]);

        $this->token = $response->json()['access_token'];
    }

    public function getSubredditPosts(array $subreddits)
{
    $joined = implode('+', $subreddits);

    $response = Http::withHeaders([
        'Authorization' => "Bearer {$this->token}",
        'User-Agent' => config('services.reddit.user_agent'),
    ])->get("https://oauth.reddit.com/r/{$joined}/hot");

    return $response->json();
}
}