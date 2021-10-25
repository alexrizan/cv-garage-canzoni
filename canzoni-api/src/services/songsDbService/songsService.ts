import {Collection, Db} from 'mongodb';
import {ISong, ISongRatingDTO} from './songsService.model';
import {config} from '../../../configs';
import {hasMongoDbInjection} from '../../helpers/mongo-sanitize';
import {CommonError} from '../../error.model';
import {ISongsService} from './ISongService';


export class SongsService implements ISongsService {
  mongoDbStream: Db;
  songsCollection: Collection<ISong>;

  constructor(mongoDbStream: Db) {
    this.mongoDbStream = mongoDbStream;
    this.songsCollection = this.mongoDbStream.collection<ISong>(config.MONGO_COLLECTION_SONGS);
  }

  async getSongsByTerm(query: string): Promise<ISong[]> {
    if (hasMongoDbInjection(query)) {
      throw new CommonError();
    }

    const minLength = 3;
    if (query && query.trim().length < minLength) {
      return [];
    }

    try {
      let result = await this.songsCollection
        .aggregate(
          [
            {
              $search: {
                'index': 'youtubeTitleAc',
                'autocomplete': {
                  'query': query,
                  'path': 'youtubeTitle',
                  'fuzzy': {
                    // Максимальное количество редактирования одного символа, необходимое для соответствия указанному поисковому запросу.
                    'maxEdits': 2,
                    // Количество символов в начале каждого термина в результате, которое должно точно совпадать
                    'prefixLength': minLength
                  }
                }
              }
            },
            {
              $limit: 9
            }
          ]).toArray();
      return result as ISong[];
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async getSongByYoutubeId(youtubeId: string) {
    if (hasMongoDbInjection(youtubeId)) {
      throw new CommonError();
    }
    return await this.songsCollection.findOne({youtubeId: youtubeId});
  }

  async getSongsByYoutubeId(youtubeIds: string[]): Promise<ISong[] | undefined> {
    if (hasMongoDbInjection(...youtubeIds)) {
      throw new CommonError();
    }
    return await this.songsCollection.find({youtubeId: {$in: youtubeIds}}).toArray();
  }

  getPointsForRateItem(item: boolean | undefined, isAllGood?: boolean) {
    const ratingStep = 5;
    if (isAllGood) {
      return ratingStep;
    }
    return item ? -ratingStep : ratingStep;
  }

  async rateSong(songRating: ISongRatingDTO) {
    if (hasMongoDbInjection(songRating.youtubeId)) {
      throw new CommonError();
    }

    const textPoints = this.getPointsForRateItem(songRating.textBadQuality, songRating.isAllGood);
    const songPoints = this.getPointsForRateItem(songRating.notSong, songRating.isAllGood);
    const midiPoints = this.getPointsForRateItem(songRating.Midi, songRating.isAllGood);
    const totalRatingPoints = textPoints + songPoints + midiPoints;

    const song = await this.getSongByYoutubeId(songRating.youtubeId);
    await this.songsCollection.updateOne({_id: song?._id}, {
      $inc: {
        midi: midiPoints,
        songRating: songPoints,
        textRating: textPoints,
        totalRating: totalRatingPoints
      }
    });
  }

  async splitSongsListByStoredAndNew(songs: ISong[]): Promise<{ localSongs: ISong[], newSongs: ISong[] }> {
    const foundSongs = await this.getSongsByYoutubeId(songs.map(s => s.youtubeId));

    const newSongs: ISong[] = [];
    const localSongs: ISong[] = [];

    if (!foundSongs) {
      return {newSongs, localSongs};
    }

    songs.forEach(song => {
      const existingSong = foundSongs.find(x => x.youtubeId === song.youtubeId);
      if (existingSong) {
        localSongs.push(existingSong);
      } else {
        newSongs.push(song);
      }
    });

    return {newSongs, localSongs};
  }

  async saveSongs(songs: ISong[]) {
    if (songs?.length) {
      await this.songsCollection.insertMany(songs);
    }
  }
}
