import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import logger from './utils/logger.js';
import mainRouter from './routes-main.js';
import cloudinaryService from './cloudinary/service.js';
import getUploadMiddleware from './multer/index.js';
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

app.get('/api/v1/images/:publicId', async (req, res) => {
  logger.info(`Received request to get image:`, req.params.publicId);
  const data = await cloudinaryService.getAssetInfo(req.params.publicId);
  if (!data) {
    return res.status(404).send('Image not found');
  }
  res.send({ url: data.secure_url, publicId: data.public_id });
});

app.post('/api/v1/images', getUploadMiddleware('image-file'), async (req, res) => {
  logger.info(JSON.stringify({ body: req.body, file: req.file }));
  logger.info(`Received request to upload image: ${req.file.originalname}`);
  // upload to cloudinary
  const result = await cloudinaryService.uploadImage(req.file.path, '');
  if (!result) {
    return res.status(500).send('Image upload failed');
  }
  res.send(result);
});

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
