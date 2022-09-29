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

    console.log('user', user);

    if (!user) {
      throw new CustomError(401, 'User not found');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      throw new CustomError(401, 'Incorrect password');
    }

    // const userToToken = { id: user.id, email: user.email };

    const token = tokenValidator.generateToken(user);

    return token;
  };
}
