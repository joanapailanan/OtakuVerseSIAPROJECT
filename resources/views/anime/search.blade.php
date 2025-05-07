<h2>Results from AniList</h2>
@if($anilistData)
    <h3>{{ $anilistData['title']['romaji'] }}</h3>
    <img src="{{ $anilistData['coverImage']['large'] }}" alt="AniList Cover">
    <p>{!! $anilistData['description'] !!}</p>
@else
    <p>No result from AniList</p>
@endif

<hr>

<h2>Results from Kitsu</h2>
@if($kitsuData)
    <h3>{{ $kitsuData['title'] }}</h3>
    <img src="{{ $kitsuData['poster'] }}" alt="Kitsu Poster">
    <p>{{ $kitsuData['description'] }}</p>
@else
    <p>No result from Kitsu</p>
@endif
