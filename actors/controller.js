import actorsService from './service.js';
import logger from '../utils/logger.js';

// export a controller method that returns all actors
export const getActors = async (req, res) => {
  const actors = await actorsService.fetchActors();
  if (!actors) {
    return res.status(404).json({ error: 'actors not found' });
  }
  return res.json(actors);
};

// export a controller method that returns an actor by id
export const getActorById = async (req, res) => {
  const { id } = req.params;
  const actor = await actorsService.fetchActorById(id);
  if (!actor) {
    return res.status(404).json({ error: 'actor not found' });
  }
  return res.json(actor);
};

// export a controller method that returns actors by movie id
// export const getActorsByMovieId = async (req, res) => {
//   const { movieId } = req.params;
//   const actors = await actorsService.fetchActorsByMovieId(movieId);
//   if (!actors.length) {
//     console.log('Actors not found for movieId:', movieId);
//   }
//   return res.json(actors);
// };

// export a controller method that creates an actor
export const createActor = async (req, res) => {
  const actor = req.body;
  const newActor = await actorsService.addActor(actor);
  logger.info(`Actor created: ${JSON.stringify(newActor)} req: ${req.uuid}`);
  return res.status(201).json(newActor);
};

// export a controller method that updates an actor
export const updateActor = async (req, res) => {
  const actor = req.body;
  const id = req.params.id;
  const updatedActor = await actorsService.updateActor(id, actor);
  return res.status(201).json(updatedActor);
};

// export a controller method that deletes an actor
export const deleteActor = async (req, res) => {
  const { id } = req.params;
  const deleted = await actorsService.deleteActor(id);
  return res.status(204).end();
};

export default {
  getActors,
  getActorById,
  //getActorsByMovieId,
  createActor,
  updateActor,
  deleteActor,
};
