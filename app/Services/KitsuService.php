<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class KitsuService
{
    protected $endpoint = 'https://kitsu.io/api/edge/anime';

    public function searchAnime($title)
    {
        $response = Http::get($this->endpoint, [
            'filter[text]' => $title
        ]);

        $data = $response->json()['data'][0] ?? null;

        return $data ? [
            'id' => $data['id'],
            'title' => $data['attributes']['canonicalTitle'],
            'poster' => $data['attributes']['posterImage']['large'] ?? null,
            'description' => $data['attributes']['synopsis']
        ] : null;
    }
}
