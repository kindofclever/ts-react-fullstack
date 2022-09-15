import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Response, Request } from 'express';
import Logging from '../library/logging';
import { IPuppy } from '../types/puppyType';

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      Logging.error(error);
      return res.status(422).json({ error})
    }
  }
};

export const Schemas = {
  puppy: {
    create: Joi.object<IPuppy>({
      breed: Joi.string().required(),
      name: Joi.string().required(),
      dob: Joi.date().required(),
      size: Joi.number().required(),
      img: Joi.string().required(),
    }),
    update: Joi.object<IPuppy>({
      breed: Joi.string().required(),
      name: Joi.string().required(),
      dob: Joi.date().required(),
      size: Joi.number().required(),
      img: Joi.string().required(),
    })
  }
};