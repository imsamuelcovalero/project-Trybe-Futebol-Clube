import { NextFunction, Request, Response } from 'express';
import Joi = require('joi');
import CustomError from '../errors/CustomError';

const validators = {
  validateLogin(req: Request, _res: Response, next: NextFunction) {
    console.log('validateLogin');

    const schema = Joi.object({
      email: Joi.string().email().required().messages({
        'string.email': '401|Incorrect email or password',
        'string.empty': '400|All fields must be filled',
      }),
      password: Joi.string().required().min(6).messages({
        'string.min': '401|Incorrect email or password',
        'string.empty': '400|All fields must be filled',
      }),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      console.log('erro', error.message);
      // const { message } = error;
      const [status, message] = error.message.split('|');
      throw new CustomError(status, message);
      // return res.status(400).json({ message });
    }

    next();
  },
};

export default validators;
