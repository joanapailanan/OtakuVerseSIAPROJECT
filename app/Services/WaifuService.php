<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class WaifuService
{
    protected string $baseUrl = 'https://api.waifu.pics';

    /**
     * Fetch a waifu image from the API.
     *
     * @param string $type
     * @param string $category
     * @return array|null
     * @throws \Exception
     */
    public function fetchImage(string $type, string $category): ?array
    {
        $url = "{$this->baseUrl}/{$type}/{$category}";

        $response = Http::get($url);

        if ($response->successful()) {
            return $response->json();
        }

        throw new \Exception("Waifu API returned status: " . $response->status());
    }
}
