import logger from '../utils/logger.js';
import ActorsModel from './models/ActorsModel.js';
// export a method that returns all actors
export const getAuthors = async () => {
  try {
    return await ActorsModel.find({});
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// export a method that returns an actor
export const getAuthorById = async (id) => {
  try {
    return await ActorsModel.findById(id);
  } catch (error) {
    logger.error(error);
    return null;
  }
};
