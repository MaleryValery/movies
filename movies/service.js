// import booksJson from '../jsons/books.json' assert { type: 'json' };
// import { v4 as uuidv4 } from 'uuid';
// import BookModel from './models/books.js';
import logger from '../utils/logger.js';

// const books = booksJson;

// export a method that returns all books
export const getMovies = async () => {
  try {
    return await MoviesModel.find({});
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// export a method that returns a book by id
export const getMovieById = async (id) => {
  try {
    return await MovieModel.findByID(id);
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// export a method that returns books by author id
export const getMoviesByActorId = async (authorId) => {
  try {
    return await MoviesModel.find({ authorId });
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// export a method that returns books filtered by {filter:title||description, value}
export const getMoviesByFilter = async ({ filter, value }) => {
  // {filter:'title',value:'foo'}
  try {
    return await MovieModel.find({
      [filter]: {
        $regex: new RegExp(value, 'i'),
      },
    });
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// export a method that creates a book
export const createMovie = async (book) => {
  try {
    const newMovie = new MovieModel(book);
    return await newMovie.save();
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// export a method that updates a book
export const updateMovie = async (id, book) => {
  try {
    return await MovieModel.findByIdAndUpdate(id, book, { new: true });
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// export a method that deletes a book
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
  getMovieByActorId,
  getMoviesByFilter,
  createMovie,
  updateMovie,
  deleteMovie,
};
