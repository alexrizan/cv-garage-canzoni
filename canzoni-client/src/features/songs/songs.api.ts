import {Song} from './songs.model';
import {createAsyncThunk} from '@reduxjs/toolkit';
import JSONP from 'jsonp';
import {ISongsState} from './songs.slice';
import {getApiAxios} from '../../utils/canzoni-api-axios';

export const _loadSongsByTerm = async (term: string): Promise<Song[]> => {
  return (await getApiAxios().get(`/songs/collection/${term}`)).data;
};

export const loadSongsByTerm = createAsyncThunk('songs/getAllSongs', async (term: string) => {
  return await _loadSongsByTerm(term);
});

const getGoogleSuggestionByTerm = async (text: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    JSONP(`${process.env.REACT_APP_GOOGLE_SUGGESTION}=${text}`,
      function (err, data) {
        if (err) {
          reject(err);
        }
        //Result format:
        //[
        //  queryText,
        //  [
        //    ...
        //    [ suggestion, num, [num,num] ]
        //    ...
        //  ]
        //],
        // {...прочая служебная инфа}
        const googleResults: any = data[1];

        const suggestions = googleResults.map((r: any) =>
        {
          if (r && r[0]) {
            return r[0] as string
          } else {
            return '';
          }
        }) as string[];

        const maxLength = 50;

        resolve(suggestions?.slice(0, 4).filter(s => s.length < maxLength));
      });
  });
};

export const updateGoogleSuggestions = createAsyncThunk('songs/getGoogleSuggestions', async (query: string) => {
  return await getGoogleSuggestionByTerm(query);
});

const getYoutubeVideosByTerm = async (query: string) => {
  if (!query || !query.trim().length) {
    return [];
  }
  return (await getApiAxios().get(`songs/youtube/${query}`)).data;
};

export const findYoutubeVideos = createAsyncThunk<Song[],
  void,
  {
    state: { songs: ISongsState; }
  }>('songs/findYoutubeVideos',
  async (dummyArg, {getState}) => {
    const term = getState().songs.youtubeSearchTerm;
    return await getYoutubeVideosByTerm(term);
  });
