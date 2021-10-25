import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {raiseEvent} from './event-bus.api';
import {RootState} from '../../app/store';

export type LoadingStatus = 'idle' | 'loading' | 'failed';

export type PlayerType =
  | 'PLAYER_PLAY'
  | 'PLAYER_PAUSE'
  | 'PLAYER_REPEAT'
  | 'PLAYER_REPEAT_ALWAYS'
  | 'PLAYER_SET_TIME';

export type PlaylistType =
  | 'SONG_QUEUE_UPDATED'
  | 'SONG_NEXT';

export type BusEvent = PlayerType | PlaylistType

interface IEventBus {
  busEvent?: BusEvent,
  playerEvent?: PlayerType,
  playlistEvent?: PlaylistType,
  sendEventStatus: LoadingStatus
}

const initialState: IEventBus = {
  sendEventStatus: 'idle'
};

export const EventBusSlice = createSlice({
  name: 'eventBus',
  initialState,
  reducers: {
    receiveEvent: (state, action: PayloadAction<BusEvent>) => {
      const event = action.payload;
      if (event.includes('PLAYER_')) {
        state.playerEvent = event as PlayerType;
      }
      if (event.includes('SONG_')) {
        state.playlistEvent = event as PlaylistType;
      }
    },
    clearPlayerEvent: state => {
      state.playerEvent = undefined;
    },
    clearPlaylistEvent: state => {
      state.playlistEvent = undefined;
    }
  },
  extraReducers: builder =>
    builder
      .addCase(raiseEvent.pending, state => {
        state.sendEventStatus = 'loading';
      })
      .addCase(raiseEvent.fulfilled, (state) => {
        state.sendEventStatus = 'idle';
      })
      .addCase(raiseEvent.rejected, state => {
        state.sendEventStatus = 'failed';
      })
});

export const selectPlayerEvent = (state: RootState) => state.eventBus.playerEvent;
export const selectPlaylistEvent = (state: RootState) => state.eventBus.playlistEvent;

export const {
  receiveEvent,
  clearPlayerEvent,
  clearPlaylistEvent
} = EventBusSlice.actions;

export {
  raiseEvent
};

export default EventBusSlice.reducer;
