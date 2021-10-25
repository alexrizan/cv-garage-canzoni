import {ISong, ISongRatingDTO} from './songsService.model';

export interface ISongsService {
  getSongsByTerm(query: string): Promise<ISong[]>;

  getSongByYoutubeId(youtubeId: string): Promise<ISong | undefined>;

  getSongsByYoutubeId(youtubeIds: string[]): Promise<ISong[] | undefined>;

  getPointsForRateItem(item: boolean | undefined, isAllGood?: boolean): number;

  rateSong(songRating: ISongRatingDTO): Promise<void>;

  splitSongsListByStoredAndNew(songs: ISong[]): Promise<{ localSongs: ISong[], newSongs: ISong[] }>;

  saveSongs(songs: ISong[]): Promise<void>;
}
