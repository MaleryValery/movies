import movieController from './controller.js';
import express from 'express';

const movieRouter = express.Router();

movieRouter.get('/', movieController.getMovies);
movieRouter.get('/single/:id', movieController.getMovieById);
// movieRouter.get('/actor/:movieId', movieController.getMoviesByActorId);
movieRouter.get('/filter', movieController.getMoviesByFilter);
// router.post(
//   '/',
// movieController.createMovie
// );
// router.put(
//   '/:id',
//   movieController.updateMovie
// );
// router.delete('/:id', movieController.deleteMovie);

export default movieRouter;
