import express from 'express';
import actorController from './controller.js';

const actorsRouter = express.Router();

router.get('movies/', actorController.getActors());

export default actorsRouter;
