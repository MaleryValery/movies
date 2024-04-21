import express from 'express';
import moviesRouter from './movies/routes.js';
import actorsRouter from './actors/routes.js';
import genresRouter from './genres/routes.js';

const router = express.Router();

router.use('/movies', moviesRouter);
router.use('/actors', actorsRouter);
router.use('/genres', genresRouter)

export default router;