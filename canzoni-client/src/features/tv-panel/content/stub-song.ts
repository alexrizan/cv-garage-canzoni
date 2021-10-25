import {getRandomInteger} from '../../../utils/helper';
import {ISong} from '../../../shared/songs.models';

const stubSongsId = [
  'JkjrUZnc-5E', // tobu
  'h456dtF_OeU', // postmodern-jukebox
  'l9yc2lEoIic', // lounge-covers
  'Emap7LU6hYk', // pop-mix
  'Kt-tLuszKBA', // gog soundtracks
  'xJDmIcGWjwE'  // tarantino
]

export const getStubSong = (): ISong => {
  const songId = stubSongsId[getRandomInteger(0, stubSongsId.length - 1)];
  return {
    youtubeId: songId,
    track: 'Заставка',
    artist: 'Заставка'
  } as ISong
}
