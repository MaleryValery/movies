import mongoose from "mongoose";
const { Schema } = mongoose;

const actorSchema = new Schema({
  //from Movie
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const ActorModel = mongoose.model("Actor", actorSchema);

export default ActorModel;
