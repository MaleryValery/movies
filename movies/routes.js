import express from 'express';
import movieController from './controller.js';

const movieRouter = express.Router();

movieRouter.get('/', movieController.getMovies);

export default movieRouter;
