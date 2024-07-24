const mongoose = require("mongoose");

const storageSchema = new mongoose.Schema({
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
    enum: ['HDD', 'SSD', 'NVMe'],
  },
  formFactor: {
    type: String,
  },
  interface: {
    type: String,
  },
  readSpeed: {
    type: Number,
  },
  writeSpeed: {
    type: Number,
  },
  cache: {
    type: Number,
  },
  releaseDate: {
    type: Date,
  },
  price: {
    type: Number,
  },
});

const Storage = mongoose.model("Storage", storageSchema);

module.exports = Storage;