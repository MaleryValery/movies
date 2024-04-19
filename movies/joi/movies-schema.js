import Joi from 'joi';
import { fetchActorById } from '../../actors/service.js';
import { fetchMovieById } from '../service.js';

// const validateGenre = async (genreStr, helpers) => {
//   const genre = await getGenreById(genreStr); //! TODO needs to be created
//   if (!genre?.id) {
//     helpers.error('Helper error validation actor☠️'); // TODO should be logger?
//     return null;
//   }
//   return genreStr;
// };

const validateActor = async (actorEl, helpers) => {
  const actor = await fetchActorById(actorEl);

  if (!actor) {
    return helpers.error('any.invalid', { message: 'Actor ID is not valid or does not exist' }); // TODO should be logger?
  }
  return actorEl;
};

const validateMovieId = async (movieId, helpers) => {
  const movie = await fetchMovieById(movieId);
  if (!movie) {
    return helpers.error('any.invalid', { message: 'Movie ID is not valid or does not exist' }); // TODO should be logger?
  }
  return movieId;
};

export const createMovieSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  genre: Joi.string().min(1).max(100).alphanum().required(),
  // genre: Joi.string().alphanum().min(1).max(100).required().external(validateGenre, 'Validation for genre'), // TODO add validation if genre exist
  year: Joi.number().integer().min(0).required(),
  description: Joi.string().min(50).max(1000).required(),
  actors: Joi.array().items(
    Joi.string()
      .required()
      .external(validateActor, 'Validation for actor')
      .options({ stripUnknown: { arrays: true } })
  ),
});

export const updateMovieSchema = Joi.object({
  id: Joi.string().forbidden(),
  _id: Joi.string().forbidden(),
  title: Joi.string().min(1).max(100).optional(),
  // genre: Joi.string().external(validateGenre, 'Validation for genre').optional(),
  genre: Joi.string().min(1).max(100).optional(),
  year: Joi.number().integer().min(0).optional(),
  description: Joi.string().min(50).max(1000).optional(),
  actors: Joi.array().items(Joi.string().external(validateActor, 'Validation for actor')).optional(),
}).min(1);
