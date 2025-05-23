<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\JikanApiService;
use App\Services\AniListService;
use App\Services\KitsuService;
use App\Services\RedditService;
use Illuminate\Support\Facades\Log;

class MediaController extends Controller
{
    protected $jikan;
    protected $anilist;
    protected $kitsu;

    public function __construct(JikanApiService $jikan, AniListService $anilist, KitsuService $kitsu)
    {
        $this->jikan = $jikan;
        $this->anilist = $anilist;
        $this->kitsu = $kitsu;
    }

    /**
     * Search anime using Jikan API
     */
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
            Log::error('Search Error:', ['exception' => $e]);
            return view('anime.search.advanced', ['error' => 'Failed to fetch anime data']);
        }
    }

    /**
     * Search anime using AniList and Kitsu APIs
     */
    public function searchWithAnilistKitsu(Request $request)
    {
        $query = $request->input('query');

        $anilistData = $this->anilist->searchAnime($query) ?? [];
        $kitsuData = $this->kitsu->searchAnime($query) ?? [];

        return view('anime.search', compact('anilistData', 'kitsuData'));
    }

    /**
     * Display subreddit posts from Reddit
     */
    public function showReddit(RedditService $reddit, $subreddit = null)
    {
        $subreddits = $subreddit
            ? [$subreddit]
            : ['animemes', 'goodanimemes', 'animememes', 'wholesomeanimemes'];

        $posts = $reddit->getSubredditPosts($subreddits);

        return view('reddit', [
            'posts' => $posts['data']['children'],
            'subreddits' => $subreddits
        ]);
    }
}