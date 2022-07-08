import { writable } from "svelte/store";

export let source = writable(null),
            title = writable('Pick a Song'),
            artist = writable('Artist'),
            album = writable('Album illustration'),
            albumCover = writable('album.png'),
            isPlay = writable(false);