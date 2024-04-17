import movieController from './controller.js';
import express from 'express';

const router = express.Router();

router.get('/', movieController.getMovies);
router.get('/single/:id', movieController.getMovieById);
router.get('/actor/:movieId', movieController.getMoviesByActorId);
router.post(
  '/',
movieController.createMovie
);
router.put(
  '/:id',
  movieController.updateMovie
);
router.delete('/:id', movieController.deleteMovie);

export default router;
import express from 'express';
import movieController from './controller.js';

const movieRouter = express.Router();

movieRouter.get('/', movieController.getMovies);

export default movieRouter;
