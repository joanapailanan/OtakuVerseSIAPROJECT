<h1>Anime Memes
</h1>
<ul>
    @foreach ($posts as $post)
        <li>
            <a href="https://reddit.com{{ $post['data']['permalink'] }}" target="_blank">
                {{ $post['data']['title'] }}
            </a>
        </li>
    @endforeach
</ul>