import * as bcrypt from 'bcryptjs';
import UserModel from '../models/user.model';
import { ILogin } from '../../interfaces/login.interface';
import tokenValidator from '../../middlewares/tokenFunctions';
import CustomError from '../../errors/CustomError';

export default class LoginService {
  model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  login = async (login: ILogin): Promise<string> => {
    console.log('loginService', login);

    const { email, password } = login;
    const user = await UserModel.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new CustomError(401, 'Incorrect email or password');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      throw new CustomError(401, 'Incorrect password');
    }

    const token = tokenValidator.generateToken(user);

    return token;
  };
}
