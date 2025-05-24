<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class WaifuService
{
    protected string $baseUrl = 'https://api.waifu.pics';

    /**
     * Fetch a waifu image from the Waifu Pics API.
     *
     * @param string $type The type of image ('sfw' or 'nsfw')
     * @param string $category The category of the image (e.g., 'waifu', 'neko')
     * @return array|null The API response data
     * @throws \Exception If the API request fails or parameters are invalid
     */
    public function fetchImage(string $type, string $category): ?array
    {
        // Validate type
        if (!in_array(strtolower($type), ['sfw', 'nsfw'])) {
            throw new \Exception("Invalid type: {$type}. Must be 'sfw' or 'nsfw'.");
        }

        // Validate category (based on Waifu Pics API)
        $validCategories = [
            'sfw' => [
                'waifu', 'neko', 'shinobu', 'megumin', 'bully', 'cuddle', 'hug', 'awoo',
                'pat', 'smug', 'bonk', 'blush', 'smile', 'wave', 'happy', 'dance'
            ],
            'nsfw' => ['waifu', 'neko', 'trap']
        ];

        if (!in_array(strtolower($category), $validCategories[strtolower($type)])) {
            throw new \Exception("Invalid category: {$category} for type {$type}.");
        }

        $url = "{$this->baseUrl}/{$type}/{$category}";

        try {
            $response = Http::timeout(10)->get($url);

            if ($response->successful()) {
                return $response->json();
            }

            throw new \Exception("Waifu API returned status: {$response->status()} - {$response->body()}");
        } catch (\Illuminate\Http\Client\ConnectionException $e) {
            throw new \Exception("Failed to connect to Waifu API: {$e->getMessage()}");
        }
    }
}