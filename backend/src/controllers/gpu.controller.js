const GPUService = require("../services/gpu.service");

class GPUController {
  constructor() {
    this.service = new GPUService();
  }

  async index() {
    const gpus = await this.service.get();
    return gpus;
  }

  async create(gpu) {
    const newGPU = await this.service.post(gpu);
    return newGPU;
  }

  async getById(id) {
    const gpu = await this.service.getOne(id);
    return gpu;
  }

  async remove(id) {
    const deletedGPU = await this.service.delete(id);
    return deletedGPU;
  }

  async update(id, values) {
    const updatedGPU = await this.service.update(id, values);
    return updatedGPU;
  }
}

module.exports = GPUController;