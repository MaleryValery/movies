import actorsService from './service.js';

export const getActors = async (req, res) => {
  const actors = await actorsService.fetchActors();
  if (!actors) {
    return res.status(404).json({ error: 'actors not found' });
  }
  return res.json(actors);
};

export default {
  getActors,
};
