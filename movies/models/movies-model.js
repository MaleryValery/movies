import mongoose from 'mongoose';
const { Schema } = mongoose;

const movieSchema = new Schema({
  //from Movie
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
  },
  year: {
    type: String,
  },
  picturePath: {
    type: String,
    default: '',
  },
  //from ACTORS
  actors: {
    type: Array,
    default: [],
  },
});

const MovieModel = mongoose.model('Movie', movieSchema);

export default MovieModel;
