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

export const createGenre = async (req, res) => {
  try {
    const genre = req.body;
    const newGenre = await genreServise.addGenre(genre);
    return res.status(201).json(newGenre);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating the genre' });
  }
};

export default {
  getAllGenres,
  createGenre,
};
