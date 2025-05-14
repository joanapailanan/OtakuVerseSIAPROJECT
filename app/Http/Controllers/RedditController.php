<?php

namespace App\Http\Controllers;

use App\Services\RedditService;

class RedditController extends Controller
{
    public function show(RedditService $reddit)
{
    $subreddits = ['animemes', 'goodanimemes', 'animememes', 'wholesomeanimemes'];

    $posts = $reddit->getSubredditPosts($subreddits);

    return view('reddit', ['posts' => $posts['data']['children']]);
}
}
