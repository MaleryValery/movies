import express from 'express';
import actorController from './controller.js';

const actorsRouter = express.Router();

actorsRouter.get('/', actorController.getActors);

export default actorsRouter;
