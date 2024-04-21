import logger from '../utils/logger.js';
import { ID_REGEX } from '../utils/consts.js';
import ActorModel from './models/actors-model.js';

export const fetchActors = async () => {
  try {
    return await ActorModel.find({});
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// export a method that returns an actor by id
export const fetchActorById = async (id) => {
  if (!id.match(ID_REGEX)) return null;
  try {
    return await ActorModel.findById(id);
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export const fetchActorsById = async (ids) => {
  const isValidIds = ids.every((id) => id.match(ID_REGEX));
  if (!isValidIds) return null;
  try {
    return await ActorModel.find({ _id: { $in: ids } });
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// export a method that returns actors by author id
// export const fetchActorsByMovieId = async (movieId) => {
//   try {
//     return await ActorModel.find({ movieId });
//   } catch (error) {
//     logger.error(error);
//     return null;
//   }
// };

// export a method that creates an actor
export const addActor = async (actor) => {
  try {
    const newActor = new ActorModel(actor);
    return await newActor.save();
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// export a method that updates an actor
export const updateActor = async (id, actor) => {
  if (!id.match(ID_REGEX)) return null;
  try {
    return await ActorModel.findByIdAndUpdate(id, actor, { new: true });
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// export a method that deletes an actor
export const deleteActor = async (id) => {
  if (!id.match(ID_REGEX)) return null;
  try {
    await ActorModel.findByIdAndDelete(id);
  } catch (error) {
    logger.error(error);
  }
};

export default {
  fetchActors,
  fetchActorById,
  fetchActorsById,
  //fetchActorsByMovieId,
  addActor,
  updateActor,
  deleteActor,
};
