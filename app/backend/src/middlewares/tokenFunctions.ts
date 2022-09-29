import { sign, SignOptions, verify } from 'jsonwebtoken';
import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
// import { ILogin } from '../interfaces/login.interface';
import { IUser } from '../interfaces/user.interface';
import { IDecoded, IGetUserAuthInfoRequest } from '../interfaces/decoded.interface';
import CustomError from '../errors/CustomError';

// dotenv.config();

const secret = process.env.JWT_SECRET || 'secret';

const tokenFunctions = {
  generateToken: (user: IUser) => {
    const signOptions: SignOptions = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = sign({ id: user.id, username: user.email, role: user.role }, secret, signOptions);
    return token;
  },

  decode: (req: Request, _res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // console.log('token', token);

    if (!token) {
      throw new CustomError(401, 'Token not found');
    }

    try {
      // decodifica o token e atribui a uma constante decoded
      const decoded = verify(token, secret) as unknown as IDecoded;
      // console.log('decoded', decoded);

      (req as IGetUserAuthInfoRequest).user = decoded;

      next();
    } catch (err) {
      throw new CustomError(401, 'Invalid token');
    }
  },
};

export default tokenFunctions;
