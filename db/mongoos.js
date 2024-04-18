import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import { MONGO_URL } from '../config/index.js';

export const connect = async () => {
  // Connect to the database
  try {
    await mongoose.connect(MONGO_URL);
    logger.info('Connected to the database');
  } catch (error) {
    logger.error(error);
  }
};
