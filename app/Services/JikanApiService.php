<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class JikanApiService
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://api.jikan.moe/v4/ ',
            'verify' => false,
        ]);
    }

    public function searchAnime(string $query, int $page = 1)
    {
        try {
            $response = $this->client->get('anime', [
                'query' => [
                    'q' => $query,
                    'page' => $page,
                    'limit' => 20
                ]
            ]);

            return json_decode($response->getBody()->getContents(), true);
        } catch (\Exception $e) {
            Log::error('Jikan API Error:', ['exception' => $e]);
            return ['error' => 'Failed to fetch anime data'];
        }
    }
}