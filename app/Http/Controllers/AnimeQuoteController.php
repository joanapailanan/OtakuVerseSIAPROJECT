<?php

namespace App\Http\Controllers;

use App\Services\AnimeQuoteService;
use Illuminate\Http\JsonResponse;

class AnimeQuoteController extends Controller
{
    protected AnimeQuoteService $animeQuoteService;

    public function __construct(AnimeQuoteService $animeQuoteService)
    {
        $this->animeQuoteService = $animeQuoteService;
    }

    /**
     * Fetch a random anime quote using the AnimeQuoteService.
     *
     * @return JsonResponse
     */
    public function getRandomQuote(): JsonResponse
    {
        try {
            $result = $this->animeQuoteService->getRandomQuote();

            return response()->json($result, $result['success'] ? 200 : 400);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while fetching the anime quote.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
