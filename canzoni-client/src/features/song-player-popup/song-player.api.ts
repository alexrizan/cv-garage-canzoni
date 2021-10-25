import {getApiAxios} from '../../utils/canzoni-api-axios';
import {OrderedSong} from '../room/room.api';

export interface IRating {
  youtubeId: string;
  isAllGood?: boolean;
  Midi?: boolean;
  notSong?: boolean;
  textBadQuality?: boolean;
}

export interface IResult {
  error?: string,
  isSuccess?: boolean
}

export const sendSongRating = async (rating: IRating): Promise<IResult> => {
  try {
    await getApiAxios().post(
      '/songs/rate',
      rating,
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
    return {
      isSuccess: true
    };
  } catch (e) {
    return {
      error: 'Что-то пошло не так. Попробуйте позже',
      isSuccess: false
    };
  }

};

interface ISongToQueue {
  youtubeId: string;
  users: string[];
}

export const addSongToQueue = async (song: ISongToQueue): Promise<IResult> => {
  try {
    await getApiAxios().post(
      '/playlist/add-song',
      song,
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
    return {
      isSuccess: true
    };
  } catch (e) {
    return {
      error: 'Что-то пошло не так. Попробуйте позже',
      isSuccess: false
    };
  }
};

export const playNextSong = async (): Promise<OrderedSong> => {
  const res = await getApiAxios().post(
    '/playlist/play-next-song',
    {
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
  return res.data as OrderedSong;
};
