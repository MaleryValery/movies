import GenreModel from './models/genre-model.js';

export const fetchAllGenres = async () => {
  try {
    const genres = await GenreModel.find();
    if (genres.length !== 0) {
      return genres;
    } 
  } catch (error) {
    console.error('Error during fetching genres from database Genre', error);
    throw new Error('Error fetching genres from database');
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
      console.log(`Genre '${JSON.stringify(genreObj)}' added to genre catalogue successfully`);
      return newGenre;
    } else {
      console.log('Genre already exists.');
    }
  } catch (error) {
    console.error('Error occurred during saving a Genre in MongoDB', error);
    throw new Error('Error occurred during saving a Genre in MongoDB');
  }
};

export const checkMovieToGenreExist = async (movie) => {
  try {
    const genre = movie.genre;
    const genreLowerCase = genre.toLowerCase();
    const genres = await GenreModel.find({ name: genreLowerCase });
    if (genres.length === 0) {
      console.log(`Genre '${genre}' is not in Database. Please check for genres and add a new genre if needed`);
      return false; 
     } 
     return true;
  } catch (error) {
    console.error('Error occurred during fetching Genres in MongoDB', error);
    throw new Error('Error occured during fetching Genres in MongoDB', error);
  }
};

export default {
  fetchAllGenres,
  addGenre,
  checkMovieToGenreExist,
};
