const GPU = require("../database/models/gpu.model");

class GPUService {
  constructor() {
    this.model = GPU;
  }

  async get() {
    const gpus = await this.model.find();
    return gpus;
  }

  async post(gpu) {
    const newGPU = await this.model.create(gpu);
    return newGPU;
  }

  async getOne(id) {
    const gpu = await this.model.findById(id);
    return gpu;
  }

  async delete(id) {
    const deletedGPU = await this.model.findByIdAndDelete(id);
    return deletedGPU;
  }

  async update(id, values) {
    const updatedGPU = await this.model.findByIdAndUpdate(id, values, { new: true });
    return updatedGPU;
  }
}

module.exports = GPUService;