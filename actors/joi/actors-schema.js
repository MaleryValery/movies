import Joi from 'joi';
import { fetchMoviesByActorId } from '../../movies/service.js';
import logger from '../../utils/logger.js';

// Middleware to validate the actor is not included into movies and it is possible to delete it
const actorNotInMovies = async (actorId, helpers) => {
  const movies = await fetchMoviesByActorId(actorId);
  if (movies && movies.length) return helpers.error('ActorUsed', { message: 'Actor ID is included into some movies' });
  return actorId;
};

export const createActorSchema = Joi.object({
  firstName: Joi.string().min(1).max(100).required(),
  lastName: Joi.string().min(1).max(100).required(),
});

export const updateActorSchema = Joi.object({
  id: Joi.string().forbidden(),
  _id: Joi.string().forbidden(),
  firstName: Joi.string().min(1).max(100).optional(),
  lastName: Joi.string().min(1).max(100).optional(),
}).min(1);

export const deleteActorSchema = Joi.object({
  id: Joi.string().required().external(actorNotInMovies, 'Validation for actors included in movies'),
});
