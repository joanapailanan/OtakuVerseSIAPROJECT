<?php

namespace App\Http\Controllers;

use App\Services\RedditService;

class RedditController extends Controller
{
    public function show(RedditService $reddit, $subreddit = null)
{
    if ($subreddit) {
        // If a specific subreddit is passed
        $subreddits = [$subreddit];
    } else {
        // Default to multiple subreddits
        $subreddits = ['animemes', 'goodanimemes', 'animememes', 'wholesomeanimemes'];
    }

    $posts = $reddit->getSubredditPosts($subreddits);

    return view('reddit', [ 
        'posts' => $posts['data']['children'],
        'subreddits' => $subreddits
    ]);
}

}
