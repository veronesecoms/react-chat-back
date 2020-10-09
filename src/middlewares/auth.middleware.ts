import { NextFunction, Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token: string = req.headers.authorization;
  const secret = process.env.JWT_SECRET;
  try {
    jwt.verify(token, secret);
    next();
  } catch (error) {
    next(new HttpException(401, 'Token de autorização não é válido'));
  }
}

export default authMiddleware;
