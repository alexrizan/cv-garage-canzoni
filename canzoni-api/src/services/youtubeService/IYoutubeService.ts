import {ISong} from '../songsDbService/songsService.model';

export interface IYoutubeService {
  getYoutubeVideosByTerm(query: string): Promise<ISong[]>;
}
