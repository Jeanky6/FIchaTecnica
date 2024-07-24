const RAMService = require("../services/ram.service");

class RAMController {
  constructor() {
    this.service = new RAMService();
  }

  async index() {
    const rams = await this.service.get();
    return rams;
  }

  async create(ram) {
    const newRAM = await this.service.post(ram);
    return newRAM;
  }

  async getById(id) {
    const ram = await this.service.getOne(id);
    return ram;
  }

  async remove(id) {
    const deletedRAM = await this.service.delete(id);
    return deletedRAM;
  }

  async update(id, values) {
    const updatedRAM = await this.service.update(id, values);
    return updatedRAM;
  }
}

module.exports = RAMController;