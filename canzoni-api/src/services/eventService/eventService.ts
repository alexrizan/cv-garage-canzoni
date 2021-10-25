import {Request, Response} from 'express';
import {ValidationError} from '../../error.model';
import {ActionType} from './eventType';
import {IEventService} from './IEventService';

interface IRoom {
  messageId: number,
  name: string,
  users: IUser[]
}

interface IUser {
  id: string;
  res: Response;
}

export class EventService implements IEventService {
  rooms: IRoom[] = [];

  /// TODO сделать что-нибудь со экспайренными токенами после подключения или убивать комнату раз в Н времени

  addUserToRoom(userId: string, room: string, req: Request, res: Response) {
    if (!userId?.trim() || !room?.trim()) {
      throw new ValidationError('Пользователь не авторизован или не была выбрана активная комната');
    }

    let targetRoom = this.rooms.find(r => r.name === room);

    if (!targetRoom) {
      targetRoom =
        {
          users: [],
          name: room,
          messageId: 0
        };
      this.rooms.push(targetRoom);
    }

    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.flushHeaders();

    res.write('retry: 10000\n\n');

    targetRoom.users.push({
      id: userId,
      res: res
    });

    req.once('close', () => {
      for (let i = 0; i < targetRoom!.users.length; i++) {
        if (targetRoom!.users[i].id === userId) {
          targetRoom!.users.splice(i, 1);
          break;
        }
      }
    });
  }

  sendUpdateToRoom(room: string, action: ActionType) {
    if (!room) {
      throw new ValidationError('Комната не найдена');
    }

    const targetRoom = this.rooms.find(r => r.name === room);
    if (!targetRoom) {
      throw new ValidationError('Комната не активирована');
    }

    targetRoom.messageId = targetRoom.messageId + 1;

    targetRoom.users.forEach(u => {
      u.res.write(`id: ${targetRoom.messageId}\n`);
      u.res.write(`data: ${action}\n\n`);
    });
  }

  getRoomUserIds(room: string) {
    let targetRoom = this.rooms.find(r => r.name === room);
    return targetRoom?.users.map(u => u.id);
  }
}
