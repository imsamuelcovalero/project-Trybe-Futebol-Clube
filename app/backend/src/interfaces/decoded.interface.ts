import { Request } from 'express';

// cria uma interface para o decoded que é o payload do token
export interface IDecoded {
  role: string;
}

// cria uma interface para o req.user, em que user recebe o decoded
export interface IGetUserAuthInfoRequest extends Request {
  user: IDecoded;
}
