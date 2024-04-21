import express from 'express';
import imageController from './controller.js';
import getUploadMiddleware from '../multer/index.js';
// import actorValidation from './actor-middleware.js';

const imageRouter = express.Router();

imageRouter.post('/', getUploadMiddleware('image-file'), imageController.addNewImage);
imageRouter.get('/:publicId', imageController.getImageByID);

export default imageRouter;
