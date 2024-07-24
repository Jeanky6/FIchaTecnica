const mongoose = require("mongoose");

const cpuSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  cores: {
    type: Number,
    required: true,
  },
  threads: {
    type: Number,
    required: true,
  },
  baseClockSpeed: {
    type: Number,
    required: true,
  },
  turboClockSpeed: {
    type: Number,
  },
  socket: {
    type: String,
    required: true,
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

const CPU = mongoose.model("CPU", cpuSchema);

module.exports = CPU;