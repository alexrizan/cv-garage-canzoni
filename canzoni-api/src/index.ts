import express from 'express';
import {registerServices} from './services/serviceCatalog';
import songsRouter from './routes/songs';
import {config} from '../configs';
import usersRouter from './routes/user';
import bodyParser from 'body-parser';
import {errorHandlerMiddleware} from './middlewares/errorHandlerMiddleware';
import {verifyTokenMiddleware} from './middlewares/authMiddleware';
import cors from 'cors';
import roomRouter from './routes/room';
import eventsRouter from './routes/events';
import playlistRouter from './routes/playlist';

const app = express();
const port = process.env.PORT || config.PORT;

app.use(bodyParser.json());

app.use(cors({
  origin: config.CORS_ORIGIN
}));
app.use(verifyTokenMiddleware);

app.use('/songs', songsRouter);
app.use('/user', usersRouter);
app.use('/room', roomRouter);
app.use('/events', eventsRouter);
app.use('/playlist', playlistRouter);

app.get('/', (req, res) => {
  /// TODO тут или в новом роутере сгребать топ-50 ошибок
  res.send('alive');
});
app.use(errorHandlerMiddleware);


app.listen(port, async () => {
  await registerServices();
  console.log(`server started at http://localhost:${port}`);
});
