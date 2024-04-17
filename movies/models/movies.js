import mongoose from 'mongoose';
const { Schema } = mongoose;

const movieSchema = new Schema({
  movieId: { type: mongoose.Schema.ObjectId, required: true },
  title: { type: String, required: true },
  year: { type: Number, required: true }


});

const MovieModel = mongoose.model('Movie', movieSchema);

export default MovieModel;
