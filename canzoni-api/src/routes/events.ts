import {Router} from 'express';
import {serviceCatalog} from '../services/serviceCatalog';
import {AuthUserRequest, getDataFromJwt} from '../middlewares/authMiddleware';
import {NonAuthError} from '../error.model';
import {IEmptyResult} from './shared/result';

const eventsRouter = Router();

eventsRouter.get('/subscribe/:token', async (req, res, next) => {
  try {
    const token = req.params.token;
    const jwtData = await getDataFromJwt(token);

    const {room, userId} = jwtData;

    const eventService = serviceCatalog['eventService'];
    eventService.addUserToRoom(userId, room, req, res);
    next();
  } catch (e) {
    next(e);
  }
});

eventsRouter.post('/raise-event', async (req, res, next) => {
  try {
    const eventService = serviceCatalog['eventService'];

    const jwtData = (req as AuthUserRequest).jwtData;
    if (!jwtData?.userId || !jwtData?.room) {
      return next(new NonAuthError());
    }

    const {action} = req.body;

    eventService.sendUpdateToRoom(jwtData.room, action);
    res.send({success: true} as IEmptyResult);
  } catch (e) {
    next(e);
  }
});

export default eventsRouter;
