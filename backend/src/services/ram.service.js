const RAM = require("../database/models/ram.model");

class RAMService {
  constructor() {
    this.model = RAM;
  }

  async get() {
    const rams = await this.model.find();
    return rams;
  }

  async post(ram) {
    const newRAM = await this.model.create(ram);
    return newRAM;
  }

  async getOne(id) {
    const ram = await this.model.findById(id);
    return ram;
  }

  async delete(id) {
    const deletedRAM = await this.model.findByIdAndDelete(id);
    return deletedRAM;
  }

  async update(id, values) {
    const updatedRAM = await this.model.findByIdAndUpdate(id, values, { new: true });
    return updatedRAM;
  }
}

module.exports = RAMService;