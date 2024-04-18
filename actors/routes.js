import express from 'express';
import actorController from './controller.js';

const actorsRouter = express.Router();

actorsRouter.get('/', actorController.getActors);
actorsRouter.get('/single/:id', actorController.getActorById);
//actorsRouter.get('/movie/:actorId', actorController.getActorsByMovieId);
actorsRouter.post('/', actorController.createActor);
actorsRouter.put('/single/:id', actorController.updateActor);
actorsRouter.delete('/single/:id', actorController.deleteActor);

export default actorsRouter;
