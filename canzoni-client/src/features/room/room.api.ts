import {createAsyncThunk} from '@reduxjs/toolkit';
import {getApiAxios} from '../../utils/canzoni-api-axios';
import {ISong} from '../../shared/songs.models';

export interface Friend {
  name: string,
  online: boolean;
}

export const getFriends = createAsyncThunk('room/getFriends', async (): Promise<Friend[]> => {
  return (await getApiAxios().get('/room/users'))?.data;
});

export interface OrderedSong extends ISong {
  orderedUserId: string;
  orderedUsers: string[];
}

export interface SongsQueue {
  room: string;
  playingSong?: OrderedSong | null;
  songs: OrderedSong[];
  usersRating?: {
    [userId: string]: number
  };
}

export const getPlaylist = createAsyncThunk('room/getPlaylist', async (): Promise<SongsQueue> => {
  return (await getApiAxios().get('/playlist')).data;
});



export const getPlayingSong = createAsyncThunk('room/getPlayingSong', async (): Promise<OrderedSong> => {
  return (await getApiAxios().get('/playlist/playing-song')).data;
});

