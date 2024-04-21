import mongoose from 'mongoose';

const { Schema } = mongoose;

const genreSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const GenreModel = mongoose.model('Genre', genreSchema);

export default GenreModel;
