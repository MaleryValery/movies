import Joi from 'joi';
import { getActorsById } from '../../actors/service';
import { getMovieById } from '../service';

const validateGenre = async (genreStr, helpers) => {
  const genre = await getGenreById(genreStr); //! TODO needs to be created
  if (!genre?.id) {
    helpers.error('Helper error validation actor☠️'); // TODO should be logger?
    return null;
  }
  return genreStr;
};

const validateActor = async (actorId, helpers) => {
  const actor = await getActorsById(actorId);
  if (!actor?.id) {
    helpers.error('Helper error validation actor ☠️'); // TODO should be logger?
    return null;
  }
  return actorId;
};

const validateMovieId = async (movieId, helpers) => {
  const movie = await getMovieById(movieId);
  if (!movie?.id) {
    helpers.error('Helper error validation actor ☠️'); // TODO should be logger?
    return null;
  }
  return movieId;
};

export const createMovieSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  genre: Joi.string().alphanum().required().external(validateGenre, 'Validation for genre'), // TODO add validation if genre exist
  year: Joi.number().integer().min(0).required(),
  description: Joi.string().min(50).max(1000).required(),
  actors: Joi.array().items(Joi.string().required().external(validateActor, 'Validation for actor')),
});

export const updateMovieSchema = Joi.object({
  id: Joi.string().required().external(validateMovieId, 'Validation for movie'),
  title: Joi.string().min(1).max(100).optional(),
  genre: Joi.string().external(validateGenre, 'Validation for genre').optional(),
  year: Joi.number().integer().min(0).optional(),
  description: Joi.string().min(50).max(1000).optional(),
  actors: Joi.array().items(Joi.string().external(validateActor, 'Validation for actor')).optional(),
}).min(2);
