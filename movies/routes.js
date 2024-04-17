import movieController from './controller.js';
import express from 'express';

const movieRouter = express.Router();

movieRouter.get('/', movieController.getMovies);
// router.get('/:id', movieController.getMovieById);
// router.get('/actor/:movieId', movieController.getMoviesByActorId);
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
