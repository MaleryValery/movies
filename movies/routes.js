import movieController from './controller.js';
import express from 'express';

const router = express.Router();

router.get('movies/', movieController.getMovies());

export default router;
