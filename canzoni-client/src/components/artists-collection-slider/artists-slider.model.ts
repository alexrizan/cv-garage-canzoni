import {Artist} from '../saved-songs/songs.model';

export interface ArtistsSliderProps {
  artists: Artist[];
  onArtistChosen: (artist: Artist) => void;
}
