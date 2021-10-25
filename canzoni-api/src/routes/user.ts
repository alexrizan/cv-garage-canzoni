import {Router} from 'express';
import {serviceCatalog} from '../services/serviceCatalog';
import {AuthUserRequest} from '../middlewares/authMiddleware';
import {NonAuthError, NotFoundError} from '../error.model';

const usersRouter = Router();

usersRouter.post('/register', async (req, res, next) => {
  const {name, email, password, password2} = req.body;

  const userService = serviceCatalog['userService'];

  try {
    await userService.createNewUser(name, email, password, password2);
    res.send('Пользователь успешно зарегистрирован');
  } catch (e) {
    next(e);
  }
});

usersRouter.post('/login', async (req, res, next) => {
  const {email, password} = req.body;

  try {
    const authService = serviceCatalog['authService'];

    const userShortData = await authService.getJwtToken(email, password);
    res.send(userShortData);
  } catch (e) {
    next(e);
  }
});

usersRouter.get('/profile', async (req, res, next) => {
  const jwtData = (req as AuthUserRequest).jwtData;

  try {
    const userService = serviceCatalog['userService'];

    const userData = await userService.getUserById(jwtData.userId);
    if (!userData) {
      next(new NotFoundError('Пользователь'));
    }

    const {name, email, rooms} = userData!;
    res.send({
      name,
      email,
      rooms
    });
  } catch (e) {
    next(e);
  }
});

usersRouter.post('/activate-room', async (req, res, next) => {
  const jwtData = (req as AuthUserRequest).jwtData;
  const {room} = req.body;
  try {
    const userService = serviceCatalog['userService'];
    const authService = serviceCatalog['authService'];
    const userData = await userService.getUserById(jwtData.userId);

    if (userData?.rooms?.includes(room)) {
      const updatedTokenData = await authService.updateToken(jwtData.userId, room.toLowerCase());
      res.send(updatedTokenData);
    }
    next(new NonAuthError());
  } catch (e) {
    next(e);
  }
});

export default usersRouter;
