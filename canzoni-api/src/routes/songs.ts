import {Router} from 'express';
import {serviceCatalog} from '../services/serviceCatalog';
import {AuthUserRequest} from '../middlewares/authMiddleware';
import {NonAuthError} from '../error.model';

const songsRouter = Router();

songsRouter.get('/collection/:term', async (req, res, next) => {
  const songsService = serviceCatalog['songsService'];
  const term = req.params.term;
  try {
    const result = await songsService.getSongsByTerm(term);
    res.send(result);
  } catch (e) {
    return next(e);
  }
});

songsRouter.get('/youtube/:term', async (req, res, next) => {
  const term = req.params.term;

  const youtubeService = serviceCatalog['youtubeService'];
  try {
    const songs = await youtubeService.getYoutubeVideosByTerm(term);
    res.send(songs);
  } catch (e) {
    return next(e);
  }
});

songsRouter.post('/rate', async (req, res, next) => {
  const songsService = serviceCatalog['songsService'];

  try {
    const jwtData = (req as AuthUserRequest).jwtData;
    if (!jwtData?.userId) {
      return next(new NonAuthError());
    }
    const ratingDto = req.body;
    await songsService.rateSong(ratingDto);
    res.send('Ok');
  } catch (e) {
    return next(e);
  }
});

export default songsRouter;
