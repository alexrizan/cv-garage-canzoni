import {Collection, Db, ObjectId} from 'mongodb';
import {config} from '../../../configs';
import {IUser} from './usersService.model';
import {CommonError, ValidationError} from '../../error.model';
import {hash} from 'bcrypt';
import {hasMongoDbInjection} from '../../helpers/mongo-sanitize';
import {IUserService} from './IUserService';


export class UserService implements IUserService {
  mongoDbStream: Db;
  userCollection: Collection<IUser>;

  minPswdOrLoginLength = 4;

  constructor(mongoDbStream: Db) {
    this.mongoDbStream = mongoDbStream;
    this.userCollection = this.mongoDbStream.collection<IUser>(config.MONGO_COLLECTION_USERS);
  }

  async getUserById(id: string) {
    if (hasMongoDbInjection(id)) {
      throw new CommonError();
    }

    if (!id?.trim()) {
      throw new ValidationError('Пользователь не найден');
    }
    return await this.userCollection.findOne<IUser>({_id: new ObjectId(id)});
  }

  async getUserByIds(ids: string[]): Promise<IUser[] | undefined> {
    if (hasMongoDbInjection(...ids)) {
      throw new CommonError();
    }

    const validIds = ids.filter(id => id.trim().length > 0);

    if (!validIds) {
      throw new ValidationError('Пользователи отсутствуют или были введены не верные данные');
    }

    return await this.userCollection.find<IUser>({
      _id:
        {
          $in: ids.map(id => new ObjectId(id))
        }
    }).toArray();
  }

  async getUserByEmail(email: string) {
    if (hasMongoDbInjection(email)) {
      throw new CommonError();
    }

    if (!email || email.trim().length < this.minPswdOrLoginLength) {
      throw new ValidationError('Логин должен содержать минимум 4 символа');
    }
    return await this.userCollection.findOne<IUser>({email: email.toLowerCase()});
  }

  async addUser(name: string, email: string, password: string) {
    if (hasMongoDbInjection(name, email)) {
      throw new CommonError();
    }

    if (!name || !email || !password) {
      throw new ValidationError('Не были введены обязательные поля');
    }

    const hashedPassword = await hash(password, 3);

    const newUser: IUser = {
      email: email.toLowerCase(),
      name: name,
      password: hashedPassword
    };

    await this.userCollection.insertOne(newUser);
  }

  async addRoomToUser(userId: string, room: string) {
    if (hasMongoDbInjection(userId, room)) {
      throw new CommonError();
    }

    if (!userId || !room) {
      throw new ValidationError('Не были введены обязательные поля');
    }

    await this.userCollection.updateOne({_id: new ObjectId(userId)}, {$addToSet: {rooms: room.toLowerCase()}});
  }

  async createNewUser(name: string, email: string, password: string, password2: string) {
    if (hasMongoDbInjection(name, email)) {
      throw new CommonError();
    }

    if (!name || !email || !password || !password2) {
      throw new ValidationError('Не все поля заполнены');
    }
    if (password !== password2) {
      throw new ValidationError('Пароли не совпадают');
    }
    if (password.length < this.minPswdOrLoginLength) {
      throw new ValidationError('Пароль должен содержать хотя бы 4 символа');
    }

    const user = await this.getUserByEmail(email);
    if (user) {
      throw new ValidationError('Имя пользователя уже занято');
    }

    await this.addUser(name, email, password);
  }
}
