import logger from '../utils/logger.js';
import GenreModel from './models/genre-model.js';

export const fetchAllGenres = async () => {
  try {
    return await GenreModel.find();
  } catch (error) {
    logger.error('Error during fetching genres from database Genre', error);
    throw new Error('Error fetching genres from database');
  }
};

export const fetchGenreById = async (id) => {
  try {
    const regexp = new RegExp(/^[0-9a-fA-F]{24}$/);
    if (id.match(regexp)) {
      return await GenreModel.findById(id);
    }
    return null;
  } catch (error) {
    logger.error('Error find Genre in MongoDB', error);
    throw new Error('Error fetching Genre in MongoDB', error);
  }
};

export const addGenre = async (genreObj) => {
  try {
    const genreStr = genreObj.name;
    const genreLowerCase = genreStr.trim().toLowerCase();
    const genres = await GenreModel.find({ name: genreLowerCase });
    if (genres.length === 0) {
      const newGenre = new GenreModel({ name: genreLowerCase });
      await newGenre.save();
      logger.info(`Genre '${JSON.stringify(genreObj)}' added to genre catalogue successfully`);
      return newGenre;
    } else {
      logger.info('Genre already exists.');
      return null;
    }
  } catch (error) {
    logger.error('Error during saving a Genre in MongoDB', error);
    throw new Error('Error during saving a Genre in MongoDB');
  }
};

// export const deleteGenre = async (id) => {
//   try {
//     const regexp = new RegExp(/^[0-9a-fA-F]{24}$/);
//     if (id.match(regexp)) {
//       const result = await GenreModel.deleteOne({ _id: id });
//       if (result.deletedCount === 0) {
//         logger.info(`No genres found by id '${id}'`);
//         return null;
//       }
//       logger.info(`Genre '${genre.name}' deleted successfully`);
//       return result;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     logger.error('Error deleting Genre in MongoDB', error);
//     throw new Error('Error fetching Genre in MongoDB', error);
//   }
// };

// export const checkMovieToGenreExist = async (movie) => {
//   try {
//     const genre = movie.genre;
//     const genreLowerCase = genre.trim().toLowerCase();
//     const genres = await GenreModel.find({ name: genreLowerCase });
//     if (genres.length === 0) {
//       logger.info(`Genre '${genre}' is not in Database. Please check for genres and add a new genre if needed`);
//       return false;
//     }
//     return true;
//   } catch (error) {
//     logger.error('Error fetching Genres in MongoDB', error);
//     throw new Error('Error fetching Genres in MongoDB', error);
//   }
// };

export default {
  fetchAllGenres,
  fetchGenreById,
  addGenre,
  // deleteGenre,
  // checkMovieToGenreExist,
};
