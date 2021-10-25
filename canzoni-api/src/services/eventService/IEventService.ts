import {Request, Response} from 'express';
import {ActionType} from './eventType';

export interface IEventService {
  addUserToRoom(userId: string, room: string, req: Request, res: Response): void;

  sendUpdateToRoom(room: string, action: ActionType): void;

  getRoomUserIds(room: string): string[] | undefined;
}
