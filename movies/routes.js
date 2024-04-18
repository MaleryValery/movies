import movieController from './controller.js';
import express from 'express';

const movieRouter = express.Router();

movieRouter.get('/', movieController.getMovies);
movieRouter.get('/single/:id', movieController.getMovieById);
// movieRouter.get('/actor/:movieId', movieController.getMoviesByActorId);
movieRouter.get('/filter', movieController.getMoviesByFilter);
movieRouter.post('/', movieController.createMovie);
movieRouter.put('/single/:id', movieController.updateMovie);
movieRouter.delete('/single/:id', movieController.deleteMovie);

export default movieRouter;
