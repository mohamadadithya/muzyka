<script>
    import SongBar from "./SongBar.svelte";
    import { songs } from '../data/songs';
</script>

<div class="card">
    <h1>My Playlist</h1>
    <p>20 Songs</p>
    <div class="card__container">
        {#each songs as song}
            <SongBar {song} />
        {/each}
    </div>
</div>

<style>
    .card {
        padding: 0 2em;
    }

    .card__container::-webkit-scrollbar {
        display: none;
    }

    .card > .card__container {
        padding: .8em;
        height: 570px;
        overflow-y: scroll;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    .card > h1 {
        font-weight: 600;
        font-size: 1.5rem;
        text-transform: uppercase;
        letter-spacing: 0.2em;
    }

    .card > p {
        color: gray;
        margin-bottom: 1em;
    }
</style>