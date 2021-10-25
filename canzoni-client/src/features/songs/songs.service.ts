import {DayHistoryStorage, Song} from './songs.model';

const dayHistoryStorageKey = 'history';

const getDayHistoryLocalStorage = () => {
  const storage = localStorage.getItem(dayHistoryStorageKey);

  if (!storage) {
    return {
      sessionStart: new Date(Date.now()),
      todaySongs: []
    } as DayHistoryStorage;
  }
  return JSON.parse(localStorage.getItem(dayHistoryStorageKey) ?? '{}') as DayHistoryStorage;
};

export const updateSongsHistory = (song: Song) => {
  const historyStorage = getDayHistoryLocalStorage();
  historyStorage.todaySongs.push(song);
  localStorage.setItem(dayHistoryStorageKey, JSON.stringify(historyStorage));
  return historyStorage;
};

export const loadHistoryStorage = () => {
  // let todaySongs: Song[];
  // let sessionStart: Date;

  const {todaySongs} = getDayHistoryLocalStorage();
  return todaySongs;
  // const hoursInHalfDay = 15;
  //
  // if (dayHistoryStorage.sessionStart
  //   && getDateTimeDifference(dayHistoryStorage.sessionStart, new Date(Date.now()), 'hours') >= hoursInHalfDay) {
  //   sessionStart = new Date(Date.now());
  //   todaySongs = [];
  // } else {
  //   todaySongs = dayHistoryStorage.todaySongs;
  //   sessionStart = dayHistoryStorage.sessionStart;
  // }
  // return {todaySongs, sessionStart};
};

export const cleanHistoryStorage = () => {
  localStorage.removeItem(dayHistoryStorageKey);
}

export const findSongsByTerms = (songs: Song[], searchTerm: string) => {
  const text = searchTerm?.trim().toLowerCase();

  if (!songs || !songs.length || !searchTerm) {
    return [];
  }

  return songs.filter(song => song.artist?.toLowerCase().includes(text)
    || song.track?.toLowerCase().includes(text)
    || song.youtubeTitle?.toLowerCase().includes(text));
};
