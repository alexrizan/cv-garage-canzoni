import * as jwt from 'jsonwebtoken';
import {config} from '../../configs';
import {NextFunction, Request, Response} from 'express';

interface IJwtData {
  userId: string;
  room: string;
  exp: number;
}

export interface AuthUserRequest extends Request {
  jwtData: IJwtData;
}

export const verifyTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['x-access-token']?.toString();

    if (token) {
      (req as AuthUserRequest).jwtData = await getDataFromJwt(token);
    }

    next();

  } catch (e) {
    next(e);
  }
};

export async function getDataFromJwt(token: string): Promise<IJwtData> {
  return new Promise<IJwtData>((resolve, reject) => {
    jwt.verify(token, config.AUTH_SALT, function (err, decoded) {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as IJwtData);
      }
    });
  });
}
