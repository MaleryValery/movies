// import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import logger from './utils/logger.js';
// import mainRouter from './routes.main.js';
import ActorModel from './actors/models/actors-model.js';
import movieRouter from './movies/routes.js';
import actorsRouter from './actors/routes.js';
import cloudinaryService from './cloudinary/service.js';
import getUploadMiddleware from './multer/index.js';
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/actors', actorsRouter);
// app.all('*', (req, res, next) => {
//   req.uuid = uuidv4();
//   return next();
// });

// app.get('/health', (req, res) => {
//   res.json({ ok: new Date().toDateString(), uuid: req.uuid });
// });

// app.use('/api/v1', mainRouter);

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
