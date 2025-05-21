@extends('layouts.app')

@php
    use Illuminate\Support\Str;
@endphp

@section('content')
<div class="container">
    <h1>Search Anime</h1>
    <form action="{{ route('anime.search') }}" method="GET">
        <input type="text" name="q" value="{{ request('q') }}" placeholder="Search anime...">
        <button type="submit">Search</button>
    </form>

    @if (isset($error))
        <div class="alert alert-danger mt-3">{{ $error }}</div>
    @endif

    @if (!empty($results))
        <div class="row mt-4">
            @foreach ($results as $anime)
                <div class="col-md-3 mb-4">
                    <div class="card">
                        <img src="{{ $anime['images']['jpg']['image_url'] }}" class="card-img-top" alt="{{ $anime['title'] }}">
                        <div class="card-body">
                            <h5 class="card-title">{{ $anime['title'] }}</h5>
                            <p class="card-text">{{ Str::limit($anime['synopsis'], 100) }}</p>
                            <a href="{{ $anime['url'] }}" target="_blank" class="btn btn-primary">View Details</a>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

        @if ($has_next_page)
            <div class="mt-4">
                <a href="{{ route('anime.search', ['q' => $query, 'page' => $current_page + 1]) }}" class="btn btn-secondary">
                    Load More
                </a>
            </div>
        @endif
    @else
        <p class="mt-3">No results found.</p>
    @endif
</div>
@endsection