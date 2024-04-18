import logger from '../utils/logger.js';
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
  try {
    return await ActorModel.findById(id);
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
  try {
    return await ActorModel.findByIdAndUpdate(id, actor, { new: true });
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// export a method that deletes an actor
export const deleteActor = async (id) => {
  try {
    await ActorModel.findByIdAndDelete(id);
  } catch (error) {
    logger.error(error);
  }
};


export default {
  fetchActors,
  fetchActorById,
  //fetchActorsByMovieId,
  addActor,
  updateActor,
  deleteActor,
};
