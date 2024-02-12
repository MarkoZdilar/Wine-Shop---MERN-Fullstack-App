import mongoose from "mongoose";

const producerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  foundingYear: { type: Number, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: String, required: true },
});

const Producer = mongoose.model("Producer", producerSchema);

export default Producer;
