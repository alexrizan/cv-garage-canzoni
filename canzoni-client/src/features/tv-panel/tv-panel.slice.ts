import {OrderedSong} from '../room/room.api';
import {createSlice} from '@reduxjs/toolkit';

interface ITvPanel {
  playingSong?: OrderedSong
}

const initialState: ITvPanel = {
}

export const TvPanelSlice = createSlice({
  name: 'tvPanel',
  initialState,
  reducers: {}
})


export default TvPanelSlice.reducer
