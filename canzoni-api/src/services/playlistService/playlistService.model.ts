import {ISong} from '../songsDbService/songsService.model';

export interface OrderedSong extends ISong {
  orderedUserId: string;
  orderedUsers: string[];
}

export interface SongsQueue {
  room: string;
  playingSong?: OrderedSong | null;
  songs: OrderedSong[];
  /// TODO Сделать возможность перемешивать песни в зависимости от рейтинга пользователя
  usersRating?: {
    [userId: string]: number
  };
}
