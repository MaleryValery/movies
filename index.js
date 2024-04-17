// import dotenv
import 'dotenv/config';
import app from './app.js';
import { PORT } from './config/index.js';
import logger from './utils/logger.js';
import { connect } from './db/mongoos.js';

connect()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Movies api listening at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    logger.error(error);
  });
