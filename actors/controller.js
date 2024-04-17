import { getActors } from 'service.js';

export const getActors = async (req, res) => {
  const actors = await getActors();
  if (!actors) {
    return res.status(404).json({ error: 'actors not found' });
  }
  return res.json(actors);
};

export default {
  getActors,
};
