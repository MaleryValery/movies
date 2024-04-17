import actorController from './controller.js';
import express from 'express';

const actorsRouter = express.Router();

router.get('movies/', actorController.getActors());

export default actorsRouter;
