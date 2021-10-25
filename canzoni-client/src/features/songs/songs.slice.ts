import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Song} from './songs.model';
import {cleanHistoryStorage, loadHistoryStorage, updateSongsHistory} from './songs.service';
import {findYoutubeVideos, loadSongsByTerm, updateGoogleSuggestions} from './songs.api';
import {RootState} from '../../app/store';

export type LoadingStatus = 'none' | 'idle' | 'loading' | 'failed';

export interface ISongsState {
  sessionStart: Date | null;
  todaySongs: Song[];
  storageSongsResult: Song[];
  storageSearchStatus: LoadingStatus,
  googleSuggestionsStatus: LoadingStatus,
  googleSuggestions: string[];
  googleSuggestionChosen: string;
  youtubeSearchTerm: string;
  youtubeSearchStatus: LoadingStatus;
  youtubeSearchResult: Song[];
}

const initialState: ISongsState = {
  sessionStart: null,
  storageSongsResult: [],
  todaySongs: [],
  storageSearchStatus: 'none',
  googleSuggestionsStatus: 'idle',
  googleSuggestions: [],
  googleSuggestionChosen: '',
  youtubeSearchTerm: '',
  youtubeSearchStatus: 'idle',
  youtubeSearchResult: []
};

export const SongsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    addSongToHistory: (state, action: PayloadAction<Song>) => {
      const localHistory = updateSongsHistory(action.payload);
      state.todaySongs = localHistory.todaySongs;
    },
    loadSongsHistory: (state) => {
      state.todaySongs = loadHistoryStorage();
    },
    clearSongsHistory: state => {
      cleanHistoryStorage();
      state.todaySongs = [];
    },
    clearGoogleSuggestionSearch: (state => {
      state.googleSuggestionChosen = '';
      state.googleSuggestions = [];
    }),
    updateActualGoogleSuggestion: (state, action: PayloadAction<string>) => {
      state.googleSuggestionChosen = action.payload;
      state.youtubeSearchTerm = action.payload;
    },
    updateUserSearchTerm: ((state, action: PayloadAction<string>) => {
      state.youtubeSearchTerm = action.payload;
    }),
    clearYoutubeSearch: (state => {
      state.youtubeSearchResult = [];
    }),
    clearSearchTerm: (state  => {
      state.youtubeSearchTerm = '';
    }),
    clearStorageSearchResult: (state) => {
      state.storageSongsResult = [];
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loadSongsByTerm.pending, (state) => {
        state.storageSearchStatus = 'loading';
      })
      .addCase(loadSongsByTerm.fulfilled, (state, action) => {
        state.storageSongsResult = action.payload;
        state.storageSearchStatus = 'idle';
      })
      .addCase(loadSongsByTerm.rejected, (state) => {
        state.storageSearchStatus = 'failed';
      })
      .addCase(updateGoogleSuggestions.pending, (state) => {
        state.googleSuggestionsStatus = 'loading';
      })
      .addCase(updateGoogleSuggestions.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.googleSuggestionsStatus = 'idle';
        state.googleSuggestions = action.payload;
      })
      .addCase(updateGoogleSuggestions.rejected, (state) => {
        state.googleSuggestionsStatus = 'failed';
      })
      .addCase(findYoutubeVideos.pending, state => {
        state.youtubeSearchStatus = 'loading';
      })
      .addCase(findYoutubeVideos.fulfilled, (state, action: PayloadAction<Song[]>) => {
        state.youtubeSearchStatus = 'idle';
        state.youtubeSearchResult = action.payload;
        state.youtubeSearchTerm = '';
      })
      .addCase(findYoutubeVideos.rejected, state => {
        state.youtubeSearchStatus = 'failed';
      });
  }
});

export const selectStorageLoadingStatus = (state: RootState) => state.songs.storageSearchStatus;
export const selectStorageSongsResult = (state: RootState) => state.songs.storageSongsResult;
export const selectTodaySongs = (state: RootState) => state.songs.todaySongs;
export const selectAreStorageSongsFound = (state: RootState) => !!state.songs.storageSongsResult?.length;

export const selectGoogleSuggestions = (state: RootState) => state.songs.googleSuggestions;
export const selectGoogleSuggestionsStatus = (state: RootState) => state.songs.googleSuggestionsStatus;
export const selectGoogleSuggestionChosen = (state: RootState) => state.songs.googleSuggestionChosen;

export const selectYoutubeSearchResult = (state: RootState) => state.songs.youtubeSearchResult;
export const selectYoutubeSearchStatus = (state: RootState) => state.songs.youtubeSearchStatus;
export const selectYoutubeSearchTerm = (state: RootState) => state.songs.youtubeSearchTerm;

export const {
  addSongToHistory,
  loadSongsHistory,
  clearGoogleSuggestionSearch,
  updateActualGoogleSuggestion,
  clearYoutubeSearch,
  updateUserSearchTerm,
  clearStorageSearchResult,
  clearSearchTerm,
  clearSongsHistory
} = SongsSlice.actions;

export {
  updateGoogleSuggestions,
  findYoutubeVideos,
  loadSongsByTerm
};

export default SongsSlice.reducer;

