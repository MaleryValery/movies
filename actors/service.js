import logger from '../utils/logger.js';
import ActorModel from './models/actors-model.js';

export const getActors = async () => {
  try {
    return await ActorModel.find({});
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// export a method that returns a book by id
export const getActorsById = async (id) => {
  try {
    return await ActorModel.findByID(id);
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// export a method that returns books by author id
export const getActorsByMovieId = async (actorId) => {
  try {
    return await ActorModel.find({ actorId });
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// export a method that returns books filtered by {filter:title||description, value}
export const getActorsByFilter = async ({ filter, value }) => {
  // {filter:'title',value:'foo'}
  try {
    return await ActorModel.find({
      [filter]: {
        $regex: new RegExp(value, 'i'),
      },
    });
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// export a method that creates a book
export const createActor = async (actor) => {
  try {
    const newMovie = new ActorModel(actor);
    return await newMovie.save();
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// export a method that updates a book
export const updateActor = async (id, actor) => {
  try {
    return await ActorModel.findByIdAndUpdate(id, actor, { new: true });
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// export a method that deletes a book
export const deleteActors = async (id) => {
  try {
    await ActorModel.findByIdAndDelete(id);
  } catch (error) {
    logger.error(error);
  }
};

export default {
  getActors,
  getActorsById,
  getActorsByMovieId,
  getActorsByFilter,
  createActor,
  updateActor,
  deleteActors,
};
