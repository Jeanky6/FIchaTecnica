const mongoose = require("mongoose");

const gpuSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  memory: {
    type: Number,
    required: true,
  },
  memoryType: {
    type: String,
    required: true,
  },
  coreClock: {
    type: Number,
    required: true,
  },
  boostClock: {
    type: Number,
  },
  cudaCores: {
    type: Number,
  },
  tdp: {
    type: Number,
  },
  releaseDate: {
    type: Date,
  },
  price: {
    type: Number,
  },
});

const GPU = mongoose.model("GPU", gpuSchema);

module.exports = GPU;