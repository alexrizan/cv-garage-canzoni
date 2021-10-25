import {createSlice} from '@reduxjs/toolkit';
import {activateRoom, createNewRoom, getUserProfile, joinRoom, loginByCredentials, registerNewUser} from './user.api';
import {RootState} from '../../app/store';
import {SongsSlice} from '../songs/songs.slice';

export type LoadingStatus = 'idle' | 'loading' | 'failed' | 'success';

interface IUserState {
  registerStatus: LoadingStatus;
  registerError?: string;
  loginStatus: LoadingStatus;
  loginError?: string;
  createRoomStatus: LoadingStatus;
  joinRoomStatus: LoadingStatus;
  switchRoomStatus: LoadingStatus;
  userName: string;
  userRooms?: string[];
  email: string;
}

const initialState: IUserState = {
  userName: '',
  userRooms: [],
  email: '',
  registerStatus: 'idle',
  loginStatus: 'idle',
  createRoomStatus: 'idle',
  joinRoomStatus: 'idle',
  switchRoomStatus: 'idle'
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createNewOneRoom: state => {
      state.createRoomStatus = 'idle';
    },
    joinOtherOneRoom: state => {
      state.joinRoomStatus = 'idle';
    },
    switchToAnotherRoom: state => {
      state.switchRoomStatus = 'idle';
    },
    logout: () => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(registerNewUser.pending, (state) => {
        state.registerError = '';
        state.registerStatus = 'loading';
      })
      .addCase(registerNewUser.fulfilled, (state) => {
        state.registerStatus = 'success';
      })
      .addCase(registerNewUser.rejected, (state, action) => {
        state.registerStatus = 'failed';
        state.loginError = action.error.message;
      })
      .addCase(loginByCredentials.pending, (state) => {
        state.loginError = '';
        state.loginStatus = 'loading';
      })
      .addCase(loginByCredentials.fulfilled, (state, action) => {
        const {name, rooms} = action.payload;
        state.userName = name;
        state.userRooms = rooms;
        state.loginStatus = 'success';
      })
      .addCase(loginByCredentials.rejected, (state, action) => {
        state.loginStatus = 'failed';
        state.loginError = action.error.message;
      })
      .addCase(getUserProfile.pending, state => {
        state.loginError = '';
        state.loginStatus = 'loading';
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loginStatus = 'idle';
        state.email = action.payload.email;
        state.userName = action.payload.name;
        state.userRooms = action.payload.rooms;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loginStatus = 'failed';
        state.loginError = action.error.message;
      })
      .addCase(createNewRoom.pending, state => {
        state.createRoomStatus = 'loading';
      })
      .addCase(createNewRoom.fulfilled, (state, action) => {
        state.createRoomStatus = 'success';
        state.email = action.payload.email;
        state.userName = action.payload.name;
        state.userRooms = action.payload.rooms;
      })
      .addCase(createNewRoom.rejected, (state) => {
        state.createRoomStatus = 'failed';
      })
      .addCase(joinRoom.pending, state => {
        state.joinRoomStatus = 'loading';
      })
      .addCase(joinRoom.fulfilled, (state, action) => {
        state.joinRoomStatus = 'success';
        state.email = action.payload.email;
        state.userName = action.payload.name;
        state.userRooms = action.payload.rooms;
      })
      .addCase(joinRoom.rejected, (state) => {
        state.joinRoomStatus = 'failed';
      })
      .addCase(activateRoom.pending, (state) => {
        state.switchRoomStatus = 'loading';
      })
      .addCase(activateRoom.fulfilled, (state) => {
        state.switchRoomStatus = 'success';
      })
      .addCase(activateRoom.rejected, (state) => {
        state.switchRoomStatus = 'failed';
      });
  }
});

export const selectRegisterStatus = (state: RootState) => state.user.registerStatus;
export const selectRegisterError = (state: RootState) => state.user.registerError;

export const selectLoginStatus = (state: RootState) => state.user.loginStatus;
export const selectLoginError = (state: RootState) => state.user.loginError;

export const selectCreateRoomStatus = (state: RootState) => state.user.createRoomStatus;
export const selectJoinRoomStatus = (state: RootState) => state.user.joinRoomStatus;
export const selectActivateRoomStatus = (state: RootState) => state.user.switchRoomStatus;

export const selectUserPrivateData = (state: RootState) => {
  return {
    name: state.user.userName,
    rooms: state.user.userRooms
  };
};

export const {
  createNewOneRoom,
  joinOtherOneRoom,
  switchToAnotherRoom,
  logout
} = UserSlice.actions;

export {
  registerNewUser,
  loginByCredentials,
  getUserProfile,
  createNewRoom,
  joinRoom,
  activateRoom
};

export default SongsSlice.reducer;
