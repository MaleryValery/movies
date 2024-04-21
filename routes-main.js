import express from 'express';
import moviesRouter from './movies/routes.js';
import actorsRouter from './actors/routes.js';
import imageRouter from './cloudinary/routes.js';

const router = express.Router();

router.use('/movies', moviesRouter);
router.use('/actors', actorsRouter);
router.use('/images', imageRouter);

export default router;
