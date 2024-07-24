const mongoose = require("mongoose");

const computerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  computerType: {
    type: String,
  },
  manufacturer: {
    type: String,
  },
  technicianInCharge: {
    type: String,
  },
  groupInCharge: {
    type: String,
  },
  alternateUsernameNumber: {
    type: String,
  },
  serialNumber: {
    type: String,
  },
  alternateUsername: {
    type: String,
  },
  inventoryNumber: {
    type: String,
  },
  user: {
    type: String,
  },
  group: {
    type: String,
  },
  comments: {
    type: String,
  },
  updateSource: {
    type: String,
  },
  cpu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CPU'
  },
  gpu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GPU'
  },
  ram: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RAM'
  }],
  storage: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Storage'
  }]
});

const Computer = mongoose.model("Computer", computerSchema);

module.exports = Computer;