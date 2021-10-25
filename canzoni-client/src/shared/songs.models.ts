export interface ISong {
  artist: string;
  track: string;
  isMidi?: boolean;
  youtubeId?: string;
  youtubeTitle?: string;
  imageUrlSm?: string;
  imageUrlMd?: string;
  channel?: string;
}

export interface IArtist {
  name: string;
  songs: [];
}
