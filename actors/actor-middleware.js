import logger from '../utils/logger.js';
import { createActorSchema, updateActorSchema } from './joi/actors-schema.js';

const options = {
  abortEarly: false,
  stripUnknown: true,
};
function createErrorDetailsObj(details) {
  return details.reduce((acc, err) => {
    acc[err.path] = err.message;
    return acc;
  }, {});
}

// Middleware to validate the request body for creating a new actor
export const validateAddActor = async (req, res, next) => {
  logger.info(`Validating add new actor request:${req.body}`);
  try {
    const result = await createActorSchema.validateAsync(req.body, options);
    return next();
  } catch (error) {
    return res.status(500).json({ error: createErrorDetailsObj(error.details) });
  }
};

// Middleware to validate the request body for updating an existing actor
export const validateUpdateActor = async (req, res, next) => {
  try {
    const { error } = await updateActorSchema.validateAsync(req.body, options);
    return next();
  } catch (error) {
    return res.status(400).json({ error: createErrorDetailsObj(error.details) });
  }
};

export default {
  validateAddActor,
  validateUpdateActor,
};
