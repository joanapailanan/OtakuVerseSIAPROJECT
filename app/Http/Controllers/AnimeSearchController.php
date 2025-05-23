<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\JikanApiService;

class AnimeSearchController extends Controller
{
    protected $jikan;

    public function __construct(JikanApiService $jikanApiService)
    {
        $this->jikan = $jikanApiService;
    }

    public function search(Request $request)
{
    $query = $request->input('q');
    $page = $request->input('page', 1);

    if (!$query) {
        return view('anime.search', ['results' => []]);
    }

    try {
        $data = $this->jikan->searchAnime($query, $page);

        return view('anime.search', [
            'results' => $data['data'] ?? [],
            'current_page' => $page,
            'has_next_page' => $data['pagination']['has_next_page'] ?? false,
            'query' => $query
        ]);
    } catch (\Exception $e) {
        \Log::error('Search Error:', ['exception' => $e]);
        return view('anime.search', ['error' => 'Failed to fetch anime data']);
    }
}
}