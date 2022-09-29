import UserModel from '../models/user.model';
import { ILogin } from '../interfaces/login.interface';
import tokenValidator from '../middlewares/tokenFunctions';
import CustomError from '../errors/CustomError';


class LoginService {
  model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public async login(login: ILogin): Promise<string> {
    const { email, password } = login;
    const user = await User.findOne({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new CustomError(401, 'User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new CustomError(401, 'Invalid password');
    }

    // const userToToken = { id: user.id, email: user.email };
    console.log('user', user[0]);

    const token = tokenValidator.generateToken(user[0]);

    return token;
  }
}

export default LoginService;