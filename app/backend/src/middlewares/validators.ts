import { NextFunction, Request, Response } from 'express';
import Joi = require('joi');
import CustomError from '../errors/CustomError';
import newUserSchema from './joySchemaNewUser';

const validators = {
  validateLogin(req: Request, _res: Response, next: NextFunction) {
    const schema = Joi.object({
      // testa se o campo email recebe um email válido
      email: Joi.string().email().required().messages({ 'string.empty': '400|"username" is required' }),
      password: Joi.string().required().min(6).messages({ 'string.min': 'Incorrect email or password', 'string.empty': '400|"All fields must be filled' }),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      console.log('erro', error.message);
      const { message } = error;
      // const [status, message] = error.message.split('|');
      throw new CustomError(400, message);
      // return res.status(400).json({ message });
    }

    next();
  },
};

export default validators;
