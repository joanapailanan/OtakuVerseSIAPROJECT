<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class JikanApiService
{
    protected string $baseUrl = 'https://api.jikan.moe/v4';

    public function getTopAnime(int $limit = 12, int $page = 1): array
    {
        try {
            $response = Http::get("{$this->baseUrl}/top/anime", [
                'limit' => $limit,
                'page' => $page,
            ]);

            if ($response->successful()) {
                return $response->json();
            }

            throw new \Exception('Failed to fetch top anime from Jikan API.');
        } catch (\Exception $e) {
            throw new \Exception("Error fetching top anime: {$e->getMessage()}");
        }
    }

    public function searchAnime(string $query, int $page = 1, int $limit = 12): array
    {
        try {
            $response = Http::get("{$this->baseUrl}/anime", [
                'q' => $query,
                'page' => $page,
                'limit' => $limit,
            ]);

            if ($response->successful()) {
                return $response->json();
            }

            throw new \Exception('Failed to fetch anime from Jikan API.');
        } catch (\Exception $e) {
            throw new \Exception("Error searching anime: {$e->getMessage()}");
        }
    }

    public function searchCharacters(string $query, int $limit = 12): array
    {
        try {
            $response = Http::get("{$this->baseUrl}/characters", [
                'q' => $query,
                'limit' => $limit,
            ]);

            if ($response->successful()) {
                return $response->json()['data'] ?? [];
            }

            throw new \Exception('Failed to fetch characters from Jikan API.');
        } catch (\Exception $e) {
            throw new \Exception("Error searching characters: {$e->getMessage()}");
        }
    }

    public function getTopCharacters(int $limit = 12): array
    {
        try {
            $response = Http::get("{$this->baseUrl}/top/characters", [
                'limit' => $limit,
            ]);

            if ($response->successful()) {
                return $response->json()['data'] ?? [];
            }

            throw new \Exception('Failed to fetch top characters from Jikan API.');
        } catch (\Exception $e) {
            throw new \Exception("Error fetching top characters: {$e->getMessage()}");
        }
    }
}