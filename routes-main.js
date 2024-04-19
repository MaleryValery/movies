import express from 'express';
import moviesRouter from './movies/routes.js';
import actorsRouter from './actors/routes.js';

const router = express.Router();

router.use('/movies', moviesRouter);
router.use('/actors', actorsRouter);

export default router;