import { Router } from 'express';
import LoginController from '../database/controller/login.controller';
import validators from '../middlewares/validators';
import tokenValidator from '../middlewares/tokenFunctions';

const routers = Router();

const loginController = new LoginController();

routers.post('/', validators.validateLogin, loginController.login);
routers.get('/validate', tokenValidator.decode, loginController.validateToken);

export default routers;
