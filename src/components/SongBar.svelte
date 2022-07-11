<script>
	import { isPlay, isLoaded, title } from '../stores/song';

	export let song;
	let icon = 'play';

	$: if ($isPlay && song.title == $title) {
		icon = 'pause';
	} else {
		icon = 'play';
	}

	$: console.log(song.title);
</script>

<div class="card">
	<div class="card__info">
		<img src="/img/{song.album.cover}" alt={song.album.name} />
		<div class="card__info--details">
			<h5>{song.title}</h5>
			<p>{song.artist}</p>
		</div>
	</div>
	<button type="button" on:click>
		<i class="fas fa-fw fa-{icon}" />
	</button>
</div>

<style>
	.card {
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1em;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		border-radius: 1em;
		margin-bottom: 1em;
	}

	.card:last-child {
		margin-bottom: 0;
	}

	.card > .card__info {
		margin-right: 0.8em;
	}

	.card > .card__info > img {
		width: 50px;
		margin-right: 10px;
		border-radius: 0.3em;
	}

	.card > .card__info {
		display: flex;
		align-items: center;
	}

	.card h5 {
		font-weight: 500;
		overflow: hidden;
		width: 120px;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.card p {
		color: gray;
		font-size: 0.8rem;
	}

	.card > button {
		border: 1px solid gray;
		border-radius: 50%;
		padding: 0.5em;
	}
</style>
