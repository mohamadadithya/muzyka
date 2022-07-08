<script>
	import { formatDuration } from './../helpers/format.js';
	import { onMount } from 'svelte';
	import Playlist from '../components/Playlist.svelte';

	let isPlay = false;
	let time = 0;
	let muted = false;
	let volume = 1;
	let currentVolume;
	let volumeSlider;
	let ended;
	let slider;
	let duration;
	let audio;

	const playAudio = () => {
		audio.paused ? audio.play() : audio.pause();
		isPlay = !isPlay;
	};

	const seek = () => (time = slider.value);

	const seekVolume = () => audio.volume = volumeSlider.value;
	const muteVolume = () => {
		muted = !muted;
		if(muted) {
			currentVolume = volumeSlider.value;
			volume = 0;
			volumeSlider.value = 0;
		} else {
			volumeSlider.value = currentVolume;
		}
	}

	onMount(() => {
		audio.onended = () => {
			isPlay = false;
			time = 0;
		}
	});
</script>

<div class="container">
	<div class="card">
		<h1 class="card__title">Hats Off to (Roy) Harper</h1>
		<p class="card__artist">Led Zeppelin</p>
		<img class="card__album" draggable="false" src="/img/led-zeppelin-3.jpeg" alt="Led Zeppelin III" />
		<input
			type="range"
			on:input={seek}
			bind:this={slider}
			value={ended ? 0 : time}
			max={duration}
			class="card__slider card__slider--duration"
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
		<div class="card__actions--volume">
			<button type="button" on:click={muteVolume}><i class="fas fa-fw fa-volume-{muted ? 'mute' : 'up'}"></i></button>
			<input type="range" class="card__slider card__slider--volume" min="0" on:input={seekVolume} bind:this={volumeSlider} value={volume} max="1" step=".001">
		</div>
		<button class="card__playlist-button">See Playlist</button>
	</div>
	<Playlist />
</div>
<audio
	bind:duration
	bind:ended
	bind:muted
	bind:currentTime={time}
	bind:this={audio}
	src="/songs/hats-off-to-roy-harper.mp3"
/>

<style>
	.container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
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
		margin-bottom: 1.5em;
		border-radius: 0.3em;
		width: 70%;
	}

	.card .card__title {
		font-size: 1.3rem;
		font-weight: bold;
		text-align: center;
	}

	.card .card__artist {
		color: gray;
		text-align: center;
		margin-bottom: 1.3em;
	}

	.card .card__slider {
		height: 5px;
		cursor: pointer;
	}
	
	.card .card__slider--duration {
		width: 100%;
		margin-top: 10px;
	}

	.card .card__slider--volume {
		margin-top: 1em;
		height: 3px;
	}

	.card .card__actions--volume {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 2em;
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

	.card button:is(.play) {
		background: linear-gradient(145deg, #fefefe, #d5d5d5);
		box-shadow:  20px 20px 100px #a8a8a8,
             -20px -20px 100px #ffffff;
	}

	.card button:not(.play) {
		background: none;
	}

	.card .card__playlist-button {
		margin-top: 2em;
		background: none;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: gray;
	}

	.card .card__minutes > p {
		color: gray;
	}
</style>
