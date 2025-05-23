<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Services\JikanApiService;
use App\Services\AniListService;
use App\Services\KitsuService;
use App\Services\RedditService;
use App\Services\AnimeQuoteService;

class MediaController extends Controller
{
    protected $jikan;
    protected $anilist;
    protected $kitsu;
    protected $animeQuoteService;

    public function __construct(
        JikanApiService $jikan,
        AniListService $anilist,
        KitsuService $kitsu,
        AnimeQuoteService $animeQuoteService
    ) {
        $this->jikan = $jikan;
        $this->anilist = $anilist;
        $this->kitsu = $kitsu;
        $this->animeQuoteService = $animeQuoteService;
    }

    // Jikan search
    public function searchWithJikan(Request $request)
    {
        $query = $request->input('q');
        $page = $request->input('page', 1);

        if (!$query) {
            return view('anime.search.advanced', ['results' => []]);
        }

        try {
            $data = $this->jikan->searchAnime($query, $page);

            return view('anime.search.advanced', [
                'results' => $data['data'] ?? [],
                'current_page' => $page,
                'has_next_page' => $data['pagination']['has_next_page'] ?? false,
                'query' => $query
            ]);
        } catch (\Exception $e) {
            \Log::error('Search Error:', ['exception' => $e]);
            return view('anime.search.advanced', ['error' => 'Failed to fetch anime data']);
        }
    }

    // AniList + Kitsu search
    public function searchWithAnilistKitsu(Request $request)
    {
        $query = $request->input('query');

        $anilistData = $this->anilist->searchAnime($query) ?? [];
        $kitsuData = $this->kitsu->searchAnime($query) ?? [];

        return view('anime.search', compact('anilistData', 'kitsuData'));
    }

    // Reddit fetch
    public function showReddit(RedditService $reddit, $subreddit = null)
    {
        $subreddits = $subreddit ? [$subreddit] : ['animemes', 'goodanimemes', 'animememes', 'wholesomeanimemes'];

        $posts = $reddit->getSubredditPosts($subreddits);

        return view('reddit', [
            'posts' => $posts['data']['children'],
            'subreddits' => $subreddits
        ]);
    }

    // Anime quote API
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