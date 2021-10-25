import {Song} from './songs.model';

export interface Id {
  kind: string;
  videoId: string;
}

export interface ImageData {
  url: string;
}

export interface Thumbnails {
  default: ImageData;
  medium: ImageData;
}

export interface Snippet {
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
}

export interface YoutubeItem {
  id: Id;
  snippet: Snippet;
}

export interface YoutubeData {
  items: YoutubeItem[];
}

const parseTitle = (title: string) => {
  const splitIndex = title.indexOf('-');
  if (splitIndex < 0) {
    return ['Неизвестно', title];
  }
  return [
    title.substring(0, splitIndex).trim(),
    title.substring(splitIndex + 1, title.length).trim()
  ];
};

export const mapYoutubeData = (youtubeData: YoutubeData): Song[] => {
  return youtubeData.items.reduce((songs, item) => {
    const [artist, track] = parseTitle(item.snippet.title);

    songs.push({
      youtubeId: item.id.videoId,
      track: track,
      artist: artist,
      youtubeTitle: item.snippet.title,
      imageUrlMd: item.snippet.thumbnails.medium.url,
      imageUrlSm: item.snippet.thumbnails.default.url,
      channel: item.snippet.channelTitle
    } as Song);

    return songs;
  }, [] as Song[]);
};
