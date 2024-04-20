import genresController from './controller.js';
import express from 'express';

const genresRouter = express.Router();

genresRouter.get('/', genresController.getAllGenres);
genresRouter.post('/', genresController.createGenre);

export default genresRouter;

