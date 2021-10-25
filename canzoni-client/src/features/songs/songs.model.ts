import {IArtist, ISong} from '../../shared/songs.models';

export interface SongsStorage {
  allSongs: Song[];
}

export interface DayHistoryStorage {
  sessionStart: Date;
  todaySongs: Song[];
}

export interface Song extends ISong {
  id?: number;
}

export interface Artist extends IArtist {
}
