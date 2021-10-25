import {Router} from 'express';
import {AuthUserRequest} from '../middlewares/authMiddleware';
import {serviceCatalog} from '../services/serviceCatalog';
import {NonAuthError} from '../error.model';

const roomRouter = Router();

roomRouter.post('/create', async (req, res, next) => {
  const jwtData = (req as AuthUserRequest).jwtData;
  const {room, password} = req.body;

  const roomService = serviceCatalog['roomService'];
  const userService = serviceCatalog['userService'];
  try {
    await roomService.createNewRoom(jwtData.userId, room, password);
    await userService.addRoomToUser(jwtData.userId, room);
    res.send('Комната успешно создана');
  } catch (e) {
    next(e);
  }
});

roomRouter.post('/join', async (req, res, next) => {
  const jwtData = (req as AuthUserRequest).jwtData;
  const {room, password} = req.body;
  const roomService = serviceCatalog['roomService'];
  const userService = serviceCatalog['userService'];

  try {
    await roomService.joinRoom(jwtData.userId, room, password);
    await userService.addRoomToUser(jwtData.userId, room);
    res.send('Пользователь добавлен к комнате');
  } catch (e) {
    next(e);
  }
});

roomRouter.get('/users', async (req, res, next) => {
  const roomService = serviceCatalog['roomService'];
  const userService = serviceCatalog['userService'];
  const eventService = serviceCatalog['eventService'];

  try {
    const jwtData = (req as AuthUserRequest).jwtData;
    if (!jwtData?.userId || !jwtData?.room) {
      return next(new NonAuthError());
    }
    const usersIds = await roomService.getRoomMembers(jwtData.userId, jwtData.room);
    const users = await userService.getUserByIds(usersIds);
    const onlineUsers = eventService.getRoomUserIds(jwtData.room);

    res.send(users?.map(u => {
      return {
        name: u.name,
        online: !!onlineUsers?.find(x => u._id?.equals(x))
      };
    }) ?? []);
  } catch (e) {
    next(e);
  }
});

export default roomRouter;
