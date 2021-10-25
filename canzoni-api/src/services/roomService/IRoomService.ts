import {IRoom} from './roomService.model';

export interface IRoomService {
  getRoomByName(name: string): Promise<IRoom | undefined>;

  createNewRoom(userId: string, roomName: string, password: string): Promise<void>;

  joinRoom(userId: string, roomName: string, password: string): Promise<void>;

  getRoomMembers(userId: string, roomName: string): Promise<any>;
}
