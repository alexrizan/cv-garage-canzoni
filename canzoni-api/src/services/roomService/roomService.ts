import {Collection, Db} from 'mongodb';
import {config} from '../../../configs';
import {IRoom} from './roomService.model';
import {hasMongoDbInjection} from '../../helpers/mongo-sanitize';
import {CommonError, ValidationError} from '../../error.model';
import {compare, hash} from 'bcrypt';
import {IRoomService} from './IRoomService';

export class RoomService implements IRoomService {
  mongoDbStream: Db;
  roomsCollection: Collection<IRoom>;

  constructor(mongoDbStream: Db) {
    this.mongoDbStream = mongoDbStream;
    this.roomsCollection = this.mongoDbStream.collection<IRoom>(config.MONGO_COLLECTION_ROOMS);
  }

  async getRoomByName(name: string) {
    if (hasMongoDbInjection(name)) {
      throw new CommonError();
    }

    return await this.roomsCollection.findOne({'name': name.toLowerCase()});
  }

  async createNewRoom(userId: string, roomName: string, password: string) {
    if (hasMongoDbInjection(userId, roomName)) {
      throw new CommonError();
    }

    if (!userId || roomName?.length < 4 || password?.length < 4) {
      throw new ValidationError('Не все поля были заполнены');
    }

    if (await this.getRoomByName(roomName.toLowerCase())) {
      throw new ValidationError('Комната уже существует');
    }

    const hashedPassword = await hash(password, 3);

    const newRoom = {
      name: roomName.toLowerCase(),
      users: [userId],
      password: hashedPassword
    } as IRoom;

    await this.roomsCollection.insertOne(newRoom);
  }

  async joinRoom(userId: string, roomName: string, password: string) {
    if (hasMongoDbInjection(userId, roomName)) {
      throw new CommonError();
    }
    if (!userId || roomName?.length < 4 || password?.length < 4) {
      throw new ValidationError('Не все поля были заполнены');
    }

    const room = await this.getRoomByName(roomName);

    if (!room || !(await compare(password, room.password))) {
      throw new ValidationError('Не верно введены данные комнаты');
    }

    await this.roomsCollection.updateOne({name: roomName.toLowerCase()}, {$addToSet: {users: userId}});
  }

  async getRoomMembers(userId: string, roomName: string) {
    if (hasMongoDbInjection(userId, roomName)) {
      throw new CommonError();
    }

    if (!userId || roomName?.length < 4) {
      throw new ValidationError('Не все поля были заполнены');
    }

    const room = await this.getRoomByName(roomName.toLowerCase());
    if (!room) {
      throw new ValidationError('Не верно введены данные комнаты');
    }
    return room.users;
  }
}
