const mongoose = require("mongoose");

const ramSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
  },
  latency: {
    type: String,
  },
  voltage: {
    type: Number,
  },
  ecc: {
    type: Boolean,
    default: false,
  },
  releaseDate: {
    type: Date,
  },
  price: {
    type: Number,
  },
});

const RAM = mongoose.model("RAM", ramSchema);

module.exports = RAM;