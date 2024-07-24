const CPUService = require("../services/cpu.service");

class CPUController {
  constructor() {
    this.service = new CPUService();
  }

  async index() {
    const cpus = await this.service.get();
    return cpus;
  }

  async create(cpu) {
    const newCPU = await this.service.post(cpu);
    return newCPU;
  }

  async getById(id) {
    const cpu = await this.service.getOne(id);
    return cpu;
  }

  async remove(id) {
    const deletedCPU = await this.service.delete(id);
    return deletedCPU;
  }

  async update(id, values) {
    const updatedCPU = await this.service.update(id, values);
    return updatedCPU;
  }
}

module.exports = CPUController;