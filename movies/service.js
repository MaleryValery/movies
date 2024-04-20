import { creatUpdatedMovie } from '../utils/createUpdatedMovie.js';
import logger from '../utils/logger.js';
import MovieModel from './models/movies-model.js';

// export a method that returns all books
export const fetchMovies = async () => {
  try {
    return await MovieModel.find({});
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// export a method that returns a Movie by id
export const fetchMovieById = async (id) => {
  try {
    return await MovieModel.findById(id);
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// export a method that returns Movies by actor id
export const fetchMoviesByActorId = async (actorId) => {
  try {
    return await MovieModel.find( { actors: { $elemMatch: { $eq: actorId } } } );
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// export a method that returns Movies filtered by {filter:title||genre, value}
export const fetchMoviesByFilter = async ({ type, value }) => {
  try {
    let query = {};
    query[type] = { $regex: new RegExp(value, 'i') };
    return await MovieModel.find(query);
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// export a method that creates a Movie
export const addMovie = async (movie) => {
  try {
    const parsedData = JSON.parse(JSON.stringify(movie));
    const newMovie = new MovieModel(parsedData);
    newMovie.actors = Array.from(new Set(newMovie.actors));
    return await newMovie.save();
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// export a method that updates a Movie
export const updateMovie = async (id, movie) => {
  try {
    const movieById = fetchMovieById(id);
    movie.actors = Array.from(new Set(movie.actors));
    const newMovie = creatUpdatedMovie(movieById, movie);

    return await MovieModel.findByIdAndUpdate(id, newMovie, { new: true });
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// export a method that deletes a Movie
export const deleteMovie = async (id) => {
  try {
    await MovieModel.findByIdAndDelete(id);
  } catch (error) {
    logger.error(error);
  }
};

export default {
  fetchMovies,
  fetchMovieById,
  fetchMoviesByActorId,
  fetchMoviesByFilter,
  addMovie,
  updateMovie,
  deleteMovie,
};
