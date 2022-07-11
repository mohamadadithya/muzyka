<script>
	import { formatDuration } from './../helpers/format.js';
	import { onMount } from 'svelte';
	import {
		source,
		title,
		isPlay,
		artist,
		albumCover,
		album,
		isLoaded,
		index,
		playMode,
lyrics
	} from '../stores/song';
	import SongBar from '../components/SongBar.svelte';
	import { songs } from '../data/songs';
	import { onEndedSong, PLAY_MODE, showError } from '../helpers/song';

	let time = 0,
		muted = false,
		volume = 1,
		currentVolume,
		volumeSlider,
		ended,
		slider,
		duration,
		audio,
		playModeIcon = 'repeat';

	onMount(() => {
		audio.onended = async () => {
			isPlay.set(false);
			time = 0;
			let lastSong = songs.length - 1;
			if ($playMode === PLAY_MODE[0]) {
				let nextSong = $index + 1;
				index.set(nextSong);
				if ($index > lastSong) {
					index.set(0);
					onEndedSong(0, audio);
				} else {
					onEndedSong(nextSong, audio);
				}
			} else if ($playMode === PLAY_MODE[1]) {
				const randomSong = songs[Math.floor(Math.random() * songs.length)];
				const randomIndex = songs.indexOf(randomSong);
				index.set(randomIndex);
				onEndedSong($index, audio);
			} else {
				onEndedSong($index, audio);
			}
		};
	});

	const playAudio = () => {
		if ($source) {
			audio.paused ? audio.play() : audio.pause();
			audio.paused ? isPlay.set(false) : isPlay.set(true);
		} else {
			showError();
		}
	};

	const seek = () => (time = slider.value);
	const seekVolume = () => (audio.volume = volumeSlider.value);
	const muteVolume = () => {
		muted = !muted;
		if (muted) {
			currentVolume = volumeSlider.value;
			volume = 0;
			volumeSlider.value = 0;
		} else {
			volumeSlider.value = currentVolume;
		}
	};

	const changeSong = async ({ song }, i) => {
		index.set(i);
		title.set(song.title);
		artist.set(song.artist);
		album.set(song.album.name);
		albumCover.set(song.album.cover);
		lyrics.set(song.lyrics);
		await source.set(song.filename);
		playAudio();
	};

	const lastSong = songs.length - 1;

	const prevSong = () => {
		if ($source) {
			index.set($index - 1);
			if ($index < 0) {
				index.set(lastSong);
			}
			onEndedSong($index, audio);
		} else {
			showError();
		}
	};

	const nextSong = () => {
		if ($source) {
			index.set($index + 1);
			if ($index > lastSong) {
				index.set(0);
			}
			onEndedSong($index, audio);
		} else {
			showError();
		}
	};

	const changeMode = () => {
		if ($playMode === PLAY_MODE[0]) {
			playMode.set(PLAY_MODE[1]);
			playModeIcon = 'random';
		} else if ($playMode === PLAY_MODE[1]) {
			playMode.set(PLAY_MODE[2]);
			playModeIcon = 'repeat-1';
		} else {
			playMode.set(PLAY_MODE[0]);
			playModeIcon = 'repeat';
		}
	};

	let isLyricsPanel = false;

	$: console.log($title);
</script>

<svelte:head>
	<title>{$source ? `${$title} - ${$artist} | Muzyka` : 'Muzyka'}</title>
</svelte:head>

<div class="container">
	<div class="card">
		<h1 class="card__title">{$title}</h1>
		<p class="card__artist">{$artist}</p>
		<img class="card__album" draggable="false" src="/img/{$albumCover}" alt={$album} />
		<button type="button" on:click={() => isLyricsPanel = !isLyricsPanel} class="card__lyrics-playlist-btn">See {isLyricsPanel ? 'Playlist' : 'Lyrics'}</button>
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
			{#if $source}
				<button type="button" on:click={changeMode}
					><i class="far fa-fw fa-{playModeIcon}" /></button
				>
			{/if}
			<p>{formatDuration(duration)}</p>
		</div>
		<div class="card__actions">
			<button type="button" on:click={prevSong}><i class="fas fa-fw fa-backward" /></button>
			<button type="button" on:click={playAudio} class="play"
				><i class="fas fa-fw fa-{!$isPlay || ended ? 'play' : 'pause'}" /></button
			>
			<button type="button" on:click={nextSong}><i class="fas fa-fw fa-forward" /></button>
		</div>
		<div class="card__actions--volume">
			<button type="button" on:click={muteVolume}
				><i class="fas fa-fw fa-volume-{muted ? 'mute' : 'up'}" /></button
			>
			<input
				type="range"
				class="card__slider card__slider--volume"
				min="0"
				on:input={seekVolume}
				bind:this={volumeSlider}
				value={volume}
				max="1"
				step=".001"
			/>
		</div>
		<p class="card__copyright">&copy; 2022 by <a href="https://m-adithya.my.id" target="_blank">Mohamad Adithya</a></p>
	</div>
	<!-- Playlist Panel -->
	<div class="card-playlist" style="height: 556px;">
		<div class="card-playlist__header">
			{#if isLyricsPanel }
				<h1 class="lyrics">Lyrics</h1>
			{:else}
				<h1>My Playlist</h1>
				<p>{songs.length} {songs.length === 1 ? 'song' : 'songs'}</p>
			{/if}
		</div>
		<div class="card-playlist__container" style="padding-bottom: {songs.length > 5 ? '1em' : 0}; {!isLyricsPanel ? 'padding: 0 0.3em 0.9em 0.3em;' : ''}">
			{#if isLyricsPanel }
				<p>{@html $lyrics}</p>
			{:else}
				{#each songs as song, i}
					<SongBar on:click={() => changeSong({ song }, i)} {song} />
				{/each}
			{/if}
		</div>
	</div>
	<!-- End of Playlist Panel -->
</div>
<audio
	bind:duration
	bind:ended
	bind:muted
	bind:currentTime={time}
	bind:this={audio}
	on:loadeddata={() => isLoaded.set(true)}
	src={$source}
/>

<style>
	.container {
		display: block;
	}

	.card {
		display: flex;
		align-items: center;
		flex-direction: column;
		widows: 100%;
		max-height: 100%;
		padding: 1.6em 1.2em;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		background-color: white;
		border-radius: 1em;
		margin-bottom: 3em;
	}

	.card .card__album {
		margin-bottom: 1.5em;
		border-radius: 0.3em;
		width: 100%;
	}

	.card .card__lyrics-playlist-btn {
		margin-bottom: .5em;
		font-family: 'Poppins', sans-serif;
		text-transform: uppercase;
		letter-spacing: .2em;
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
		margin-bottom: 1em;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}

	.card .card__minutes > button {
		font-size: 1.5rem;
	}

	.card .card__actions > button {
		padding: 1em;
		border-radius: 50%;
		font-size: 1.2rem;
	}

	.card button:is(.play) {
		background: linear-gradient(145deg, #fefefe, #d5d5d5);
		box-shadow: 20px 20px 100px #a8a8a8, -20px -20px 100px #ffffff;
	}

	.card button:not(.play) {
		background: none;
	}

	.card .card__minutes > p {
		color: gray;
	}

	.card .card__copyright {
		font-size: 0.7rem;
		margin-top: 2.5em;
	}

	.card .card__copyright > a {
		color: black;
	}

	/* Playlist Panel */
	.card-playlist {
		overflow-y: scroll;
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}

	.card-playlist::-webkit-scrollbar {
		display: none;
	}

	.card-playlist .card-playlist__header {
		position: sticky;
		top: 0;
		width: 100%;
		background-color: white;
	}

	.card-playlist .card-playlist__header > h1 {
		font-weight: 600;
		font-size: 1.5rem;
		text-transform: uppercase;
		letter-spacing: 0.2em;
	}

	.card-playlist .card-playlist__header > h1:is(.lyrics) {
		margin-bottom: .8em;
	}

	.card-playlist .card-playlist__header > p {
		color: gray;
		margin-bottom: 1em;
	}

	@media (min-width: 768px) {
		.container {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			align-items: center;
			min-height: 100vh;
			gap: 2.5em;
		}

		.card {
			margin-bottom: 0;
		}
	}

	@media (min-width: 992px) {
		.container {
			align-items: center;
		}

		.card .card__album {
			width: 70%;
		}
	}
</style>
