<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;

class TraceMoeService
{
    protected string $baseUrl = 'https://api.trace.moe';

    public function searchAnime(UploadedFile $image): array
    {
        try {
            $response = Http::attach(
                'image', file_get_contents($image->getRealPath()), $image->getClientOriginalName()
            )->post("{$this->baseUrl}/search");

            if ($response->successful()) {
                return $response->json();
            }

            throw new \Exception('Failed to fetch results from Trace.moe API.');
        } catch (\Exception $e) {
            throw new \Exception("Error tracing anime: {$e->getMessage()}");
        }
    }
}