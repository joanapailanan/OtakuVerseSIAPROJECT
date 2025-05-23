<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\RequestException;

class AnimeQuoteService
{
    /**
     * Fetch a random anime quote from AnimeChan API.
     *
     * @return array
     * @throws \Exception
     */
    public function getRandomQuote(): array
    {
        try {
            $response = Http::get('https://api.animechan.io/v1/quotes/random');

            if ($response->successful()) {
                return [
                    'success' => true,
                    'data' => $response->json(),
                ];
            }

            return [
                'success' => false,
                'message' => 'Failed to fetch anime quote.',
                'error' => $response->body(),
            ];
        } catch (\Exception $e) {
            throw new \Exception('Error fetching anime quote: ' . $e->getMessage(), 500);
        }
    }
}
