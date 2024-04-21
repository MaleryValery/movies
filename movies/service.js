import { createUpdatedMovie } from '../utils/createUpdatedMovie.js';
import logger from '../utils/logger.js';
import MovieModel from './models/movies-model.js';
import { fetchActorsById } from '../actors/service.js';

// export a method that returns all books
export const fetchMovies = async () => {
  try {
    const movies = await MovieModel.find({});
    return constructNewMoviesArr(movies);
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// export a method that returns a Movie by id with actors like array of objects
export const fetchMovieById = async (id) => {
  try {
    const movie = await MovieModel.findById(id);
    console.log('movie: ', movie);
    if (!movie) {
      logger.error('Movie not found');
      return null;
    }
    let ids = movie.actors;
    const actorsArr = await fetchActorsById(ids);
    movie.actors = actorsArr;
    return movie;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// export a method that returns Movies by actor id
export const fetchMoviesByActorId = async (actorId) => {
  try {
    const movies = await MovieModel.find({ actors: { $elemMatch: { $eq: actorId } } });
    return constructNewMoviesArr(movies);
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
    const movies = await MovieModel.find(query);
    return constructNewMoviesArr(movies);
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export const fetchActorsByMovieId = async (id) => {
  try {
    const movie = await MovieModel.findById(id);
    if (!movie?.actors.length) return null;
    return constructNewMoviesArr(movie);
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
    const newMovie = createUpdatedMovie(movieById, movie);

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

// const constructActorsArr = async (ids) => {
//   try {
//     if (ids.length !== 0) {
//       let actors = await Promise.all(
//         ids.map(async (id) => {
//           const actor = await fetchActorById(id);
//           return actor;
//         })
//       );
//       return actors;
//     }
//     return [];
//   } catch (error) {
//     logger.error('Error while mapping actors objects', error);
//   }
// };

// const constructNewMoviesArr = async (movies) => {
//   if (movies.length === 0) {
//     return [];
//   }
//   let newMovies = await Promise.all(
//     movies.map(async (movie) => {
//       let ids = movie.actors;
//       const actorsArr = await constructActorsArr(ids);
//       movie.actors = actorsArr;
//       return movie;
//     })
//   );
//   return newMovies;
// };

const constructNewMoviesArr = async (movies) => {
  if (!movies.length) return [];

  const actorIds = movies.map((movie) => movie.actors).flat();
  const actorsBD = await fetchActorsById(actorIds);
  const actorsMap = new Map(actorsBD.map((actorsBD) => [actorsBD._id.toString(), actorsBD]));

  movies.forEach((movie) => {
    movie.actors = movie.actors.map((actor) => actorsMap.get(actor));
  });
  return movies;
};

export default {
  fetchMovies,
  fetchMovieById,
  fetchActorsByMovieId,
  fetchMoviesByActorId,
  fetchMoviesByFilter,
  addMovie,
  updateMovie,
  deleteMovie,
};
