<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;

class AniListService
{
    protected $endpoint = 'https://graphql.anilist.co';

    public function searchAnime($title)
{
    $query = '
    query ($search: String) {
        Media (search: $search, type: ANIME) {
            id
            title {
                romaji
                english
                native
            }
            coverImage {
                large
            }
            description
        }
    }';

    $variables = [
        "search" => $title
    ];

    $response = Http::post($this->endpoint, [
        'query' => $query,
        'variables' => $variables
    ]);

    if ($response->successful() && isset($response->json()['data']['Media'])) {
        return $response->json()['data']['Media'];
    }

    return null; // Or return [];
}
}