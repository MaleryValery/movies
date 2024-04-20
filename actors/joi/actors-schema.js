import Joi from 'joi';

export const createActorSchema = Joi.object({
  firstName: Joi.string().min(1).max(100).required(),
  lastName: Joi.string().min(1).max(100).required(),
});

export const updateActorSchema = Joi.object({
  id: Joi.string().forbidden(),
  _id: Joi.string().forbidden(),
  firstName: Joi.string().min(1).max(100).optional(),
  lastName: Joi.string().min(1).max(100).optional(),
}).min(1);
