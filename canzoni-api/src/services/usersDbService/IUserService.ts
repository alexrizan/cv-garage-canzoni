import {IUser} from './usersService.model';

export interface IUserService {
  getUserById(id: string): Promise<IUser | undefined>;

  getUserByIds(ids: string[]): Promise<IUser[] | undefined>;

  getUserByEmail(email: string): Promise<IUser | undefined>;

  addUser(name: string, email: string, password: string): Promise<void>;

  addRoomToUser(userId: string, room: string): Promise<void>;

  createNewUser(name: string, email: string, password: string, password2: string): Promise<void>;
}
