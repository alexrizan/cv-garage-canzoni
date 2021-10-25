import {Db, MongoClient} from 'mongodb';
import {SongsService} from './songsDbService/songsService';
import {config} from '../../configs';
import {UserService} from './usersDbService/userService';
import {YoutubeService} from './youtubeService/youtubeService';
import {AuthService} from './authService/authService';
import {RoomService} from './roomService/roomService';
import {EventService} from './eventService/eventService';
import {PlaylistService} from './playlistService/playlistService';
import {ISongsService} from './songsDbService/ISongService';
import {IUserService} from './usersDbService/IUserService';
import {IYoutubeService} from './youtubeService/IYoutubeService';
import {IAuthService} from './authService/IAuthService';
import {IRoomService} from './roomService/IRoomService';
import {IEventService} from './eventService/IEventService';
import {IPlaylistService} from './playlistService/IPlaylistService';

const mongoDbUrl = config.MONGO_DB_CONN_STRING;

const initMongoDb = async (): Promise<Db> => {
  const mongoClient = new MongoClient(mongoDbUrl!);
  await mongoClient.connect();
  return mongoClient.db(config.MONGO_DB_NAME);
};

interface ServiceCatalog {
  songsService: ISongsService;
  userService: IUserService;
  youtubeService: IYoutubeService;
  authService: IAuthService;
  roomService: IRoomService;
  eventService: IEventService;
  playlistService: IPlaylistService;
}

var serviceCatalog: ServiceCatalog;

export const registerServices = async (): Promise<void> => {
  const mongoDbService = await initMongoDb();
  const songsService = new SongsService(mongoDbService);
  const userService = new UserService(mongoDbService);
  const youtubeService = new YoutubeService(songsService);
  const authService = new AuthService(userService);
  const roomService = new RoomService(mongoDbService);
  const eventService = new EventService();
  const playlistService = new PlaylistService(songsService, eventService);

  serviceCatalog = {
    songsService,
    userService,
    youtubeService,
    authService,
    roomService,
    eventService,
    playlistService
  };
};

export {serviceCatalog};
