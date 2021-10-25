import {Song} from '../saved-songs/songs.model';

export interface ISongsSliderProps {
  songs: Song[];
  onSongChosen: (song: Song) => void;
}
