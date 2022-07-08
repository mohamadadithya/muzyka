import { title, artist, album, albumCover, isLoaded, source, isPlay } from '../stores/song';
import { songs } from '../data/songs';

export const onEndedSong = async (index, audio) => {
    title.set(songs[index].title);
    artist.set(songs[index].artist);
    album.set(songs[index].album.name);
    albumCover.set(songs[index].album.cover);
    isLoaded.set(false);
    await source.set(songs[index].filename);
    (await audio.paused) ? audio.play() : audio.pause();
    (await audio.paused) ? isPlay.set(false) : isPlay.set(true);
};