import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {SongsSlice} from '../features/songs/songs.slice';
import {UserSlice} from '../features/user/user.slice';
import {RoomSlice} from '../features/room/room.slice';
import {EventBusSlice} from '../features/event-bus/event-bus.slice';

export const store = configureStore({
  reducer: {
    songs: SongsSlice.reducer,
    user: UserSlice.reducer,
    room: RoomSlice.reducer,
    eventBus: EventBusSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
