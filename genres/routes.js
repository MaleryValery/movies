import genresController from './controller.js';
import express from 'express';

const genresRouter = express.Router();

genresRouter.get('/', genresController.getAllGenres);
genresRouter.get('/:id', genresController.getGenreById);
genresRouter.post('/', genresController.createGenre);
// genresRouter.delete('/:id', genresController.deleteGenreById);

export default genresRouter;
