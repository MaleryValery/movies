import express from 'express';
import logger from './utils/logger.js';
import mainRouter from './routes-main.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(400).send("Movies api service. Use /api/v1/movies or /api/v1/actors to get valid response");
});

app.get('/health', (req, res) => {
  res.json({ ok: new Date().toDateString()});
});

app.use('/api/v1', mainRouter);

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

export default app;
