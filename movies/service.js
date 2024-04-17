import MovieModel from './models/movies-model.js';

const getMovies = async () => {
  try {
    return await MovieModel.find({});
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export const getMovieById = async (id) => {
    try {
      return await MovieModel.findById(id);
    } catch (error) {
      logger.error(error);
      return null;
    }
  };
  

  export const getMoviesByActorId = async (actorId) => {
    try {
      return await MovieModel.find({ actorId });
    } catch (error) {
      logger.error(error);
      return null;
    }
  };
  
 
  export const createMovie = async (Movie) => {
    try {
      const newMovie = new MovieModel(Movie);
      return await newMovie.save();
    } catch (error) {
      logger.error(error);
      return null;
    }
  };
  
  export const updateMovie = async (id, Movie) => {
    try {
      return await MovieModel.findByIdAndUpdate(id, Movie, { new: true });
    } catch (error) {
      logger.error(error);
      return null;
    }
  };
  
  export const deleteMovie = async (id) => {
    try {
      await MovieModel.findByIdAndDelete(id);
    } catch (error) {
      logger.error(error);
    }
  };
  
  export default {
    getMovies,
    getMovieById,
    getMoviesByActorId,
    createMovie,
    updateMovie,
    deleteMovie,
  };
