@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Random Anime Quote</h1>

    <div id="quote-card" class="card mt-4 d-none">
        <div class="card-body">
            <blockquote class="blockquote mb-0">
                <p id="quote-text" class="mb-2"></p>
                <footer class="blockquote-footer">
                    <span id="quote-character"></span> from <cite title="Anime" id="quote-anime"></cite>
                </footer>
            </blockquote>
        </div>
    </div>

    <div id="error-message" class="alert alert-danger d-none mt-4"></div>

    <button id="fetch-quote-btn" class="btn btn-primary mt-3">Get Random Quote</button>
</div>
@endsection

@section('scripts')
<script>
document.getElementById('fetch-quote-btn').addEventListener('click', function () {
    fetch('/anime-quote')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('quote-text').textContent = data.quote;
                document.getElementById('quote-character').textContent = data.character;
                document.getElementById('quote-anime').textContent = data.anime;

                document.getElementById('quote-card').classList.remove('d-none');
                document.getElementById('error-message').classList.add('d-none');
            } else {
                throw new Error(data.message || 'Failed to fetch quote.');
            }
        })
        .catch(error => {
            document.getElementById('error-message').textContent = error.message;
            document.getElementById('error-message').classList.remove('d-none');
            document.getElementById('quote-card').classList.add('d-none');
        });
});
</script>
@endsection