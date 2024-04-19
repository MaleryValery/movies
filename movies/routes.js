import movieController from './controller.js';
import movieValidation from './movie-middleware.js';
import express from 'express';

const movieRouter = express.Router();

movieRouter.get('/', movieController.getMovies);
movieRouter.get('/single/:id', movieController.getMovieById);
// movieRouter.get('/actor/:movieId', movieController.getMoviesByActorId);
movieRouter.get('/filter', movieController.getMoviesByFilter);
movieRouter.post('/', movieValidation.validateAddModie, movieController.createMovie);
movieRouter.put('/single/:id', movieValidation.validateUpdateMovie, movieController.updateMovie);
movieRouter.delete('/single/:id', movieController.deleteMovie);
movieRouter.get('/single/:id/actors', movieController.getActorsByMovieId);

export default movieRouter;
