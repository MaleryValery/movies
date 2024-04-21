export const createUpdatedMovie = (oldMovie, newMovie) => {
  return {
    title: newMovie.title || oldMovie.title,
    genre: newMovie.genre || oldMovie.genre,
    year: newMovie.year || oldMovie.year,
    actors: newMovie.actors.length ? newMovie.actors : oldMovie.actors,
  };
};
