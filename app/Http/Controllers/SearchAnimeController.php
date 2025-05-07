<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AniListService;
use App\Services\KitsuService;

class SearchAnimeController extends Controller
{
    protected $anilist;
    protected $kitsu;

    public function __construct(AniListService $anilist, KitsuService $kitsu)
    {
        $this->anilist = $anilist;
        $this->kitsu = $kitsu;
    }

    public function search(Request $request)
    {
        $query = $request->input('query');

        $anilistData = $this->anilist->searchAnime($query);
        $kitsuData = $this->kitsu->searchAnime($query);

        return view('anime.search', compact('anilistData', 'kitsuData'));
    }
}
