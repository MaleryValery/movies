import { getMovies } from "service.js";

export const getMovies = async (req, res) => {
  const movies = await getMovies();
  if (!movies) {
    return res.status(404).json({ error: "Movies not found" });
  }
  return res.json(movies);
};


export const getMovieById = async (req, res) => {
    const { id } = req.params;
    const movie = await MovieService.getMovieById(id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    return res.json(movie);
  };
  
  export const getMoviesByActorId = async (req, res) => {
    const { actorId } = req.params;
    const movies = await MovieService.getMoviesByActorId(actorId);
    if (!movies.length) {
      console.log('Movies not found for actorId:', actorId);
    }
    return res.json(movies);
  };
  
  export const createMovie = async (req, res) => {
    const movie = req.body;
    const newMovie = await MovieService.createMovie(movie);
    logger.info(`Movie created: ${JSON.stringify(newMovie)} req: ${req.uuid}`);
    return res.status(201).json(newMovie);
  };
  
  export const updateMovie = async (req, res) => {
    const movie = req.body;
    const id = req.params.id;
    const updatedMovie = await MovieService.updateMovie(id, movie);
    return res.status(201).json(updatedMovie);
  };
  
  export const deleteMovie = async (req, res) => {
    const { id } = req.params;
    await MovieService.deleteMovie(id);
    return res.status(204).end();
  };
  
  export default {
    getMovies,
    getMovieById,
    getMoviesByActorId,
    createMovie,
    updateMovie,
    deleteMovie,
  };
