import {CommonError, ValidationError} from '../../error.model';
import {SongsService} from '../songsDbService/songsService';
import {EventService} from '../eventService/eventService';
import {OrderedSong, SongsQueue} from './playlistService.model';
import {IPlaylistService} from './IPlaylistService';

/// TODO перенести хранение в редис
export class PlaylistService implements IPlaylistService {
  storage: SongsQueue[];
  songsService: SongsService;
  eventService: EventService;

  constructor(songsService: SongsService, eventService: EventService) {
    this.storage = [];
    this.songsService = songsService;
    this.eventService = eventService;
  }

  async addSongToQueue(userId: string, users: string[], youtubeId: string, room: string) {
    if (!youtubeId || !room) {
      throw new CommonError();
    }
    let userRoom = this.storage.find(s => s.room === room);

    if (!userRoom) {
      userRoom = {
        room: room,
        songs: [],
        usersRating: {}
      };

      this.storage.push(userRoom);
    }

    const song = await this.songsService.getSongByYoutubeId(youtubeId);

    if (!song) {
      throw new ValidationError('Песня не найдена');
    }

    const orderedSong: OrderedSong = {
      ...song as OrderedSong,
      orderedUserId: userId,
    };

    if (!userRoom.playingSong) {
      userRoom.playingSong = orderedSong;
      this.eventService.sendUpdateToRoom(room, 'SONG_NEXT');
    } else {
      userRoom.songs.push(orderedSong);
      this.eventService.sendUpdateToRoom(room, 'SONG_QUEUE_UPDATED');
    }

    const userCounter = userRoom.usersRating![userId] ?? 0;
    userRoom.usersRating![userId] = userCounter + 1;

    return userRoom.songs;
  }

  getNextSongFromQueue(room: string) {
    if (!room?.trim()) {
      throw new ValidationError('Пользователь не авторизован');
    }

    let userRoom = this.storage.find(s => s.room === room);

    if (!userRoom) {
      throw new CommonError();
    }

    if (!userRoom.songs.length) {
      userRoom.playingSong = null;
      this.eventService.sendUpdateToRoom(room, 'SONG_NEXT');
      return;
    }

    const song = userRoom.songs.shift();
    userRoom.playingSong = song;
    this.eventService.sendUpdateToRoom(room, 'SONG_QUEUE_UPDATED');
    this.eventService.sendUpdateToRoom(room, 'SONG_NEXT');
    return song;
  }

  getPlayingSong(room: string) {
    if (!room?.trim()) {
      throw new ValidationError('Пользователь не авторизован');
    }

    let userRoom = this.storage.find(s => s.room === room);

    if (!userRoom) {
      return;
    }
    if (!userRoom.playingSong) {
      if (userRoom.songs.length) {
        userRoom.playingSong = userRoom.songs.shift();
      } else {
        return;
      }
    }

    return userRoom.playingSong;
  }

  getPlaylist(room: string) {
    if (!room?.trim()) {
      throw new ValidationError('Пользователь не авторизован');
    }

    let userRoom = this.storage.find(s => s.room === room);

    if (!userRoom) {
      return;
    }

    return userRoom;
  }
}
