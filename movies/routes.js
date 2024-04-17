import movieController from './controller.js';
import express from 'express';

const router = express.Router();

router.get('/', movieController.getMovies);
router.get('/single/:id', movieController.getMovieById);
router.get('/actor/:movieId', movieController.getMoviesByActorId);
router.post(
  '/',
  movieMiddlewares.validateCreateMovie,
  movieController.createMovie
);
router.put(
  '/:id',
  movieMiddlewares.validateUpdateMovie,
  movieController.updateMovie
);
router.delete('/:id', movieController.deleteMovie);

export default router;
