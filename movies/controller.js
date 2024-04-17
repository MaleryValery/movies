import { fetchMovies } from './service.js';

export const getMovies = async (req, res) => {
  const movies = await fetchMovies();
  if (!movies) {
    return res.status(404).json({ error: 'Movies not found' });
  }
  return res.json(movies);
};

export default {
  getMovies,
};
