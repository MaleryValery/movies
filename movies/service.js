import MovieModel from './models/movies.js';

const getMovies = async () => {
  try {
    return await MovieModel.find({});
  } catch (error) {
    logger.error(error);
    return null;
  }
};


export {
  getMovies
};
