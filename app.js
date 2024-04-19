// import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import logger from './utils/logger.js';
// import mainRouter from './routes.main.js';
import ActorModel from './actors/models/actors-model.js';
import movieRouter from './movies/routes.js';
import actorsRouter from './actors/routes.js';

const app = express();
app.use(express.json());

app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/actors', actorsRouter);

app.get('/health', (req, res) => {
  res.json({ ok: new Date().toDateString()});
});

// app.use('/api/v1', mainRouter);

app.use((err, req, res, next) => {
  // Check if the error is related to JSON parsing
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400).send({ error: 'Invalid JSON' });
  } else {
   next(err);
  }
});

// Catch-all error handling middleware
app.use((err, req, res, next) => {
  // Log the error internally
  logger.error(err);

  // Respond with 500 "Internal Server Error" status code and generic message
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
  });
});

export default app;
