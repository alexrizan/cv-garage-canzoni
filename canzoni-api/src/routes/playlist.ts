import {Router} from 'express';
import {AuthUserRequest} from '../middlewares/authMiddleware';
import {NonAuthError} from '../error.model';
import {serviceCatalog} from '../services/serviceCatalog';

const playlistRouter = Router();

playlistRouter.post('/add-song', async (req, res, next) => {
  try {
    const {users, youtubeId} = req.body;

    const jwtData = (req as AuthUserRequest).jwtData;
    if (!jwtData?.userId || !jwtData?.room) {
      return next(new NonAuthError());
    }

    const queueService = serviceCatalog['playlistService'];

    const room = await queueService.addSongToQueue(jwtData.userId, users, youtubeId, jwtData.room);
    res.send(room);
  } catch (e) {
    next(e);
  }
});

playlistRouter.post('/play-next-song', async (req, res, next) => {
  try {
    const jwtData = (req as AuthUserRequest).jwtData;
    if (!jwtData?.userId || !jwtData?.room) {
      return next(new NonAuthError());
    }

    const queueService = serviceCatalog['playlistService'];
    const song = await queueService.getNextSongFromQueue(jwtData.room);
    res.send(song);
  } catch (e) {
    next(e);
  }
});

playlistRouter.get('/playing-song', async (req, res, next) => {
  try {
    const jwtData = (req as AuthUserRequest).jwtData;
    if (!jwtData?.userId || !jwtData?.room) {
      return next(new NonAuthError());
    }

    const queueService = serviceCatalog['playlistService'];
    const song = await queueService.getPlayingSong(jwtData.room);

    res.send(song);
  } catch (e) {
    next(e);
  }
});

playlistRouter.get('/', async (req, res, next) => {
  try {
    const jwtData = (req as AuthUserRequest).jwtData;
    if (!jwtData?.userId || !jwtData?.room) {
      return next(new NonAuthError());
    }

    const queueService = serviceCatalog['playlistService'];
    const song = await queueService.getPlaylist(jwtData.room);

    res.send(song ?? null);
  } catch (e) {
    next(e);
  }
});

export default playlistRouter;
