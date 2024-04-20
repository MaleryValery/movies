import 'dotenv/config';
import GenreModel from '../models/genre-model.js';
import movieGenres from './genres.js';
import mongoose from 'mongoose';
import { MONGO_URL } from '../../config/index.js';

mongoose.connect(MONGO_URL);

const importGenres = async () => {
  try {
    GenreModel.deleteMany({});
    const genres = movieGenres.map((genre) => new GenreModel({ name: genre }));
    await GenreModel.insertMany(genres);
    console.log('All genres have been successfully imported');
    mongoose.disconnect();
  } catch (error) {
    console.error('Failed to import genres:', error);
    mongoose.disconnect();
  }
};

importGenres();