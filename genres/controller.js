import logger from '../utils/logger.js';
import genreServise from './service.js';

export const getAllGenres = async (req, res) => {
  try {
    const genres = await genreServise.fetchAllGenres();
    if (genres === null) {
      return res.status(404).json({ message: 'Genres not found' });
    } else {
      return res.json(genres);
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server error' });
  }
};

export const getGenreById = async (req, res) => {
  try {
    const id = req.params.id;
    const genre = await genreServise.fetchGenreById(id);
    if (genre === null) {
      return res.status(404).json({ message: 'Genre not found' });
    } else {
      return res.json(genre);
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server error' });
  }
};


export const createGenre = async (req, res) => {
  try {
    const genre = req.body;
    const newGenre = await genreServise.addGenre(genre);
    return res.status(201).json(newGenre);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating the genre' });
  }
};

export const deleteGenreById = async (req, res) => {
  try {
    const genreId = req.params.id;
    const result = await genreServise.deleteGenre(genreId);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Genre not found' });
    }
    return res.status(204).send();
  } catch (error) {
    logger.error('Error deleting the genre:', error);
    return res.status(500).json({ message: 'Error deleting the genre' });
  }
};

export default {
  getAllGenres,
  getGenreById,
  createGenre,
  deleteGenreById,
};
