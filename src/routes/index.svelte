<script>
	import { formatDuration } from './../helpers/format.js';
	import { onMount } from 'svelte';

	let isPlay = false;
	let time = 0;
	let ended;
	let slider;
	let duration;
	let audio;

	const playAudio = () => {
		audio.paused ? audio.play() : audio.pause();
		isPlay = !isPlay;
	};

	const seek = () => (time = slider.value);

	onMount(() => (audio.onended = () => (isPlay = false)));
</script>

<div class="card">
	<img class="card__album" src="/img/led-zeppelin-3.jpeg" alt="Led Zeppelin III" />
	<h1 class="card__title">Hats Off to (Roy) Harper</h1>
	<p class="card__artist">Led Zeppelin</p>
	<input
		type="range"
		on:input={seek}
		bind:this={slider}
		value={ended ? 0 : time}
		max={duration}
		class="card__slider"
	/>
	<div class="card__minutes">
		<p>{formatDuration(time)}</p>
		<p>{formatDuration(duration)}</p>
	</div>
	<div class="card__actions">
		<button type="button"><i class="fas fa-fw fa-backward" /></button>
		<button type="button" on:click={playAudio} class="play"
			><i class="fas fa-fw fa-{!isPlay || ended ? 'play' : 'pause'}" /></button
		>
		<button type="button"><i class="fas fa-fw fa-forward" /></button>
	</div>
	<button class="card__playlist-button">See Playlist</button>
</div>
<audio
	bind:duration
	bind:ended
	bind:currentTime={time}
	bind:this={audio}
	src="/songs/hats-off-to-roy-harper.mp3"
/>

<style>
	.card {
		display: flex;
		align-items: center;
		flex-direction: column;
		max-width: 320px;
		max-height: 100%;
		padding: 1.6em 1.2em;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		background-color: white;
		border-radius: 1em;
	}

	.card .card__album {
		margin-bottom: 1em;
		border-radius: 0.3em;
	}

	.card .card__title {
		font-size: 1.3rem;
		font-weight: bold;
		text-align: center;
	}

	.card .card__artist {
		color: gray;
		text-align: center;
		margin: 10px;
	}

	.card .card__slider {
		width: 100%;
		margin-top: 10px;
		height: 5px;
		cursor: pointer;
	}

	.card .card__minutes {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 1em;
		width: 100%;
	}

	.card .card__actions > button {
		padding: 1em;
		border-radius: 50%;
		font-size: 1.2rem;
	}

	.card .card__actions > button:not(.play) {
		background: none;
	}

	.card .card__playlist-button {
		margin-top: 2em;
		background: none;
		text-transform: uppercase;
		letter-spacing: 0.2em;
	}

	.card .card__minutes > p {
		color: gray;
	}
</style>
