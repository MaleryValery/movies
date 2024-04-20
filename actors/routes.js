import express from 'express';
import actorController from './controller.js';
import actorValidation from './actor-middleware.js'

const actorsRouter = express.Router();

actorsRouter.get('/', actorController.getActors);
actorsRouter.get('/single/:id', actorController.getActorById);
//actorsRouter.get('/movie/:actorId', actorController.getActorsByMovieId);
actorsRouter.post('/', actorValidation.validateAddActor, actorController.createActor);
actorsRouter.put('/single/:id', actorValidation.validateUpdateActor, actorController.updateActor);
actorsRouter.delete('/single/:id', actorValidation.validateDeleteActor, actorController.deleteActor);

export default actorsRouter;
