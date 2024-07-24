const CPU = require("../database/models/cpu.model");

class CPUService {
  constructor() {
    this.model = CPU;
  }

  async get() {
    const cpus = await this.model.find();
    return cpus;
  }

  async post(cpu) {
    const newCPU = await this.model.create(cpu);
    return newCPU;
  }

  async getOne(id) {
    const cpu = await this.model.findById(id);
    return cpu;
  }

  async delete(id) {
    const deletedCPU = await this.model.findByIdAndDelete(id);
    return deletedCPU;
  }

  async update(id, values) {
    const updatedCPU = await this.model.findByIdAndUpdate(id, values, { new: true });
    return updatedCPU;
  }
}

module.exports = CPUService;