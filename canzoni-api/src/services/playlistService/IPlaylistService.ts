import {OrderedSong, SongsQueue} from './playlistService.model';

export interface IPlaylistService {
  addSongToQueue(userId: string, users: string[], youtubeId: string, room: string): Promise<OrderedSong[]>;

  getNextSongFromQueue(room: string): OrderedSong | undefined;

  getPlayingSong(room: string): OrderedSong | undefined;

  getPlaylist(room: string): SongsQueue | undefined;
}
