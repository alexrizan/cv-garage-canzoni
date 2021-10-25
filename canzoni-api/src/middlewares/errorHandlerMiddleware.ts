import {NextFunction, Request, Response} from 'express';
import {CommonError, NonAuthError, ValidationError} from '../error.model';

export function errorHandlerMiddleware(err: Error, req: Request, res: Response, _next: NextFunction) {
  let error = new CommonError();
  let statusCode = 500;

  if (err instanceof ValidationError) {
    error = err;
    statusCode = 422;
  }

  if (err instanceof NonAuthError) {
    error = err;
    statusCode = 403;
  }

  ///TODO Придумать куда логировать, если не CommonError
  res.status(statusCode).send(error.message);
}
