import logger from '../utils/logger.js';
import GenreModel from './models/genre-model.js';

export const fetchAllGenres = async () => {
  try {
    const genres = await GenreModel.find();
    if (genres.length !== 0) {
      return genres;
    }
  } catch (error) {
    logger.error('Error during fetching genres from database Genre', error);
    throw new Error('Error fetching genres from database');
  }
};

export const fetchGenreById = async (id) => {
  try {
    const genre = await GenreModel.findById(id);
    if (genre !== null) {
      logger.info(`Genre with id ${id} is '${genre.name}'`);
      return genre;
    } else {
      logger.info(`No genres found by id '${id}'`);
      return null;
    }
  } catch (error) {
    logger.error('Error find Genre in MongoDB', error);
    throw new Error('Error fetching Genre in MongoDB', error);
  }
};

export const addGenre = async (genreObj) => {
  try {
    const genreStr = genreObj.name;
    const genreLowerCase = genreStr.toLowerCase();
    const genres = await GenreModel.find({ name: genreLowerCase });
    if (genres.length === 0) {
      const newGenre = new GenreModel({ name: genreLowerCase });
      await newGenre.save();
      logger.info(`Genre '${JSON.stringify(genreObj)}' added to genre catalogue successfully`);
      return newGenre;
    } else {
      logger.info('Genre already exists.');
    }
  } catch (error) {
    logger.error('Error during saving a Genre in MongoDB', error);
    throw new Error('Error during saving a Genre in MongoDB');
  }
};

export const deleteGenre = async (id) => {
  try {
    const genre = await GenreModel.findById(id);
    if (genre !== null) {
      const result = await GenreModel.deleteOne({ _id: id });
      logger.info(`Genre '${genre.name}' deleted successfully`);
      return result;
    } else {
      logger.info(`No genres found by id '${id}'`);
      return null;
    }
  } catch (error) {
    logger.error('Error deleting Genre in MongoDB', error);
    throw new Error('Error fetching Genre in MongoDB', error);
  }
};

export const checkMovieToGenreExist = async (movie) => {
  try {
    const genre = movie.genre;
    const genreLowerCase = genre.toLowerCase();
    const genres = await GenreModel.find({ name: genreLowerCase });
    if (genres.length === 0) {
      logger.info(`Genre '${genre}' is not in Database. Please check for genres and add a new genre if needed`);
      return false;
    }
    return true;
  } catch (error) {
    logger.error('Error fetching Genres in MongoDB', error);
    throw new Error('Error fetching Genres in MongoDB', error);
  }
};

export default {
  fetchAllGenres,
  fetchGenreById,
  addGenre,
  deleteGenre,
  checkMovieToGenreExist,
};
