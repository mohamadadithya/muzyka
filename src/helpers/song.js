import { title, artist, album, albumCover, isLoaded, source, isPlay, lyrics } from '../stores/song';
import { songs } from '../data/songs';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export const onEndedSong = async (index, audio) => {
    title.set(songs[index].title);
    artist.set(songs[index].artist);
    album.set(songs[index].album.name);
    albumCover.set(songs[index].album.cover);
    lyrics.set(songs[index].lyrics);
    isLoaded.set(false);
    await source.set(songs[index].filename);
    (await audio.paused) ? audio.play() : audio.pause();
    (await audio.paused) ? isPlay.set(false) : isPlay.set(true);
};

export const showError = () => {
    const notyf = new Notyf({
        position: {
            x: 'right',
            y: 'top'
        },
        types: [
            {
                type: 'error',
                background: 'black',
                duration: 2000
            }
        ]
    });
    notyf.error('Please pick a song');
}

export const PLAY_MODE = ['normal', 'random', 'single'];