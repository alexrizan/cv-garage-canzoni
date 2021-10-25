import {ObjectId} from 'mongodb';

export interface ISong {
  _id: ObjectId;
  artist: string;
  track?: string;
  isMidi?: boolean;
  youtubeId: string;
  youtubeTitle: string;
  imageUrlSm?: string;
  imageUrlMd?: string;
  channel: string;
  midi?: number;
  textRating?: number;
  songRating?: number;
  totalRating?: number;
}

export interface ISongRatingDTO {
  youtubeId: string;
  isAllGood?: boolean;
  Midi?: boolean;
  notSong?: boolean;
  textBadQuality?: boolean;
}
