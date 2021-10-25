import youtubeAxios from './youtubeAxios';
import {mapYoutubeData} from './youtubeService.model';
import {SongsService} from '../songsDbService/songsService';
import {IYoutubeService} from './IYoutubeService';

export class YoutubeService implements IYoutubeService {
  private songsService: SongsService;

  constructor(songsService: SongsService) {
    this.songsService = songsService;
  }

  async getYoutubeVideosByTerm(query: string) {
    const minLength = 3;
    if (query && query.trim().length < minLength) {
      return [];
    }

    console.log('searching youtube by: ', query);
    const res = await youtubeAxios.get('/search', {
      params: {
        q: query
      }
    });
    const songs = mapYoutubeData(res.data);

    if (!songs.length) {
      return [];
    }

    const {newSongs, localSongs} = await this.songsService.splitSongsListByStoredAndNew(songs);

    /*
    * Фильтр на караоке. При раскоментрировании править songQueueService: видео не караоке не будут работать
    * newSongs.filter(
        s => s.youtubeTitle.toLowerCase().includes('караоке')
          || s.youtubeTitle.toLowerCase().includes('karaoke')
      )
    * */

    await this.songsService.saveSongs(newSongs);

    return newSongs.concat(localSongs);
  };
}
