import logger from '../utils/logger.js';
import { createMovieSchema, updateMovieSchema } from './joi/movies-schema.js';

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

// Middleware to validate the request body for creating a new movie
export const validateAddModie = async (req, res, next) => {
  logger.info(`Validating add new movie request:${req.body}`);
  try {
    const result = await createMovieSchema.validateAsync(req.body, options);
    return next();
  } catch (error) {
    return res.status(500).json({ error: createErrorDetailsObj(error.details) });
  }
};

// Middleware to validate the request body for updating an existing movie
export const validateUpdateMovie = async (req, res, next) => {
  try {
    const { error } = await updateMovieSchema.validateAsync(req.body, options);
    return next();
  } catch (error) {
    return res.status(400).json({ error: createErrorDetailsObj(error.details) });
  }
};

export default {
  validateAddModie,
  validateUpdateMovie,
};
