import {ISong} from '../../shared/songs.models';
import {createSlice} from '@reduxjs/toolkit';
import {Friend, getFriends, getPlayingSong, getPlaylist, OrderedSong} from './room.api';
import {RootState} from '../../app/store';

export type LoadingStatus = 'none' | 'idle' | 'loading' | 'failed';

interface IKaraokeRoom {
  friends: Friend[],
  fiendsUpdateStatus: LoadingStatus;
  playingSong?: ISong,
  playingSongStatus: LoadingStatus;
  playlist: OrderedSong[],
  playlistUpdateStatus: LoadingStatus;
}

const initialState: IKaraokeRoom = {
  friends: [],
  fiendsUpdateStatus: 'idle',
  playlist: [],
  playlistUpdateStatus: 'idle',
  playingSongStatus: 'idle'
}

export const RoomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    clearPlayingSong: state => {
      state.playingSong = undefined;
    }
  },
  extraReducers:
    builder => {
      builder
        .addCase(getFriends.pending, (state) => {
          state.fiendsUpdateStatus = 'loading'
        })
        .addCase(getFriends.fulfilled, (state, action) => {
          state.fiendsUpdateStatus = 'idle'
          state.friends = action.payload;
        })
        .addCase(getFriends.rejected, (state) => {
          state.fiendsUpdateStatus = 'failed'
        })
        .addCase(getPlaylist.pending, (state) => {
          state.playlistUpdateStatus = 'loading'
        })
        .addCase(getPlaylist.fulfilled, (state, action) => {
          state.playlistUpdateStatus = 'idle'
          state.playlist = action.payload.songs ?? [];
          state.playingSong = action.payload.playingSong as ISong;
        })
        .addCase(getPlaylist.rejected, (state) => {
          state.playlistUpdateStatus = 'failed'
        })
        .addCase(getPlayingSong.pending, state => {
          state.playingSongStatus = 'loading'
        })
        .addCase(getPlayingSong.fulfilled, (state, action) => {
          state.playingSongStatus = 'idle';
          state.playingSong = action.payload;
        })
        .addCase(getPlayingSong.rejected, state => {
          state.playingSongStatus = 'failed'
        })
  }
})

export const selectFriendsUpdateStatus = (state: RootState) => state.room.fiendsUpdateStatus;
export const selectFriends = (state: RootState) => state.room.friends;

export const selectPlaylistUpdateStatus = (state: RootState) => state.room.playlistUpdateStatus;
export const selectPlaylistSongs = (state: RootState) => state.room.playlist;
export const selectPlayingSong = (state: RootState) => state.room.playingSong;

export const {
  clearPlayingSong
} = RoomSlice.actions;

export {
  getFriends,
  getPlaylist,
  getPlayingSong
}

export default RoomSlice.reducer;
