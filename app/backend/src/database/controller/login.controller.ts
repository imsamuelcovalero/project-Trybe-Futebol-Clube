import { Request, Response } from 'express';
import LoginService from '../services/login.service';

class LoginController {
  constructor(private loginService = new LoginService()) { }

  login = async (req: Request, res: Response) => {
    console.log('loginController');
    const token = await this.loginService.login(req.body);

    res.status(200).json({ token });
  };
}

export default LoginController;
