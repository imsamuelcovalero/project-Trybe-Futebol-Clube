import { Request, Response } from 'express';
import { IGetUserAuthInfoRequest } from '../../interfaces/decoded.interface';
import LoginService from '../services/login.service';

class LoginController {
  constructor(private loginService = new LoginService()) { }

  login = async (req: Request, res: Response) => {
    console.log('loginController');
    const token = await this.loginService.login(req.body);

    res.status(200).json({ token });
  };

  validateToken = async (req: Request, res: Response) => {
    console.log('xablau', (req as IGetUserAuthInfoRequest).user);
    const { role } = (req as IGetUserAuthInfoRequest).user;

    res.status(200).json({ role });
  };
}

export default LoginController;
