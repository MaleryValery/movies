import logger from '../utils/logger.js';
import movieService from './service.js';

// export a controller method that returns all movie
export const getMovies = async (req, res) => {
  const movies = await movieService.fetchMovies();
  if (!movies) {
    return res.status(404).json({ error: 'Movies not found' });
  }
  return res.json(movies);
};

// export a controller method that returns a movie by id
export const getMovieById = async (req, res) => {
  const { id } = req.params;
  const movie = await movieService.getMovieById(id);
  if (!movie) {
    return res.status(404).json({ error: 'movie not found' });
  }
  return res.json(movie);
};

// export a controller method that returns movies by author id
export const getMoviesByActorId = async (req, res) => {
  const { actorId } = req.params;
  const movies = await movieService.getMoviesByActorId(actorId);
  if (!movies.length) {
    console.log('Movies not found for actorId:', actorId);
  }
  return res.json(movies);
};

// export a controller method that creates a movie
export const createMovie = async (req, res) => {
  const movie = req.body;
  const newMovie = await movieService.createMovie(movie);
  logger.info(`Movie created: ${JSON.stringify(newMovie)} req: ${req.uuid}`);
  return res.status(201).json(newMovie);
};

// export a controller method that updates a movie
export const updateMovie = async (req, res) => {
  const movie = req.body;
  const id = req.params.id;
  const updatedMovie = await movieService.updateMovie(id, movie);
  return res.status(201).json(updatedMovie);
};

// export a controller method that deletes a movie
export const deleteMovie = async (req, res) => {
  const { id } = req.params;
  const deleted = await movieService.deleteMovie(id);
  return res.status(204).end();
};

export default {
  getMovies,
  getMovieById,
  getMoviesByActorId,
  createMovie,
  updateMovie,
  deleteMovie,
};
