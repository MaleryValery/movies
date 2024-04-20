import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import logger from './utils/logger.js';
// import mainRouter from './routes.main.js';
import ActorModel from './actors/models/actors-model.js';
import movieRouter from './movies/routes.js';
import actorsRouter from './actors/routes.js';
import genresRouter from './genres/routes.js'
import mainRouter from './routes-main.js';

const app = express();
app.use(express.json());

// add uuid for all reqests, loo request typ, path and time
app.all('*', (req, res, next) => {
  req.uuid = uuidv4();
  logger.info(`[${new Date().toISOString()}] ${req.method} ${req.url} [UUID: ${req.uuid}]`);
  return next();
});

// TODO check how to show home page and render static page
app.get('/', (req, res) => {
  res.status(400).send('Movies api service. Use /api/v1/movies or /api/v1/actors to get valid response');
});

app.get('/health', (req, res) => {
  res.json({ id: req.uuid, ok: new Date().toDateString() });
});

app.use('/api/v1', mainRouter);

//checking if json is valid
app.use((err, req, res, next) => {
  // Check if the error is related to JSON parsing
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    logger.error(err);
    res.status(400).send({ error: 'Invalid JSON' });
  } else {
    next(err);
  }
});
// Catch-all error handling middleware
app.use((err, req, res, next) => {
  logger.error(err);

  // Respond with 500 "Internal Server Error" status code and generic message
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
  });
});

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Page not found',
  });
});

export default app;
