import {CommonError, ValidationError} from '../../error.model';
import {UserService} from '../usersDbService/userService';
import {serviceCatalog} from '../serviceCatalog';
import {compare} from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {config} from '../../../configs';
import {hasMongoDbInjection} from '../../helpers/mongo-sanitize';
import {ObjectId} from 'mongodb';
import {IAuthService, IUserShorData} from './IAuthService';

export class AuthService implements IAuthService {

  private userService: UserService;

  private minPswdOrLoginLength = 4;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  private async generateJWTToken(userId: string | ObjectId, exp: number, room?: string) {
    return await new Promise<string>((resolve, reject) => {
      jwt.sign({
          userId,
          exp,
          room
        },
        config.AUTH_SALT,
        {},
        function (err, token) {
          if (err || !token) {
            reject(err ?? 'Ошибка при генерации токена');
          } else {
            resolve(token);
          }
        }
      );
    });
  }

  async getJwtToken(email: string, password: string): Promise<IUserShorData> {
    if (hasMongoDbInjection(email)) {
      throw new CommonError();
    }

    if (email?.trim().length < this.minPswdOrLoginLength
      || password?.trim().length < this.minPswdOrLoginLength) {
      throw new ValidationError('Введите данные пользователя, чтобы залогиниться');
    }

    const userService = serviceCatalog['userService'];

    const user = await userService.getUserByEmail(email);

    if (!user || !(await compare(password, user.password))) {
      throw new ValidationError('Не верно введены данные пользователя');
    }

    const secInHour = 3600;
    const hours = 24;
    const expTimeSec = Math.floor(Date.now() / 1000) + (secInHour * hours);

    const token = await this.generateJWTToken(user._id!, expTimeSec);

    return {
      token,
      name: user.name,
      rooms: user.rooms,
      exp: expTimeSec
    };
  }

  async updateToken(userId: string, room: string): Promise<{ token: string, exp: number, room: string }> {
    const secInHour = 3600;
    const hours = 24;
    const expTimeSec = Math.floor(Date.now() / 1000) + (secInHour * hours);

    const token = await this.generateJWTToken(userId, expTimeSec, room);

    return {
      token,
      exp: expTimeSec,
      room
    };
  }
}
