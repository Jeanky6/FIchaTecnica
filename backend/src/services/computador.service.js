const Computer = require("../database/models/computador.model");

class ComputerService {
  constructor() {
    this.model = Computer;
  }

  async get() {
    const computers = await this.model.find().populate('cpu gpu ram storage');
    return computers;
  }

  async post(computer) {
    const newComputer = await this.model.create(computer);
    return newComputer.populate('cpu gpu ram storage');
  }

  async getOne(id) {
    const computer = await this.model.findById(id).populate('cpu gpu ram storage');
    return computer;
  }

  async delete(id) {
    const deletedComputer = await this.model.findByIdAndDelete(id);
    return deletedComputer;
  }

  async update(id, values) {
    const updatedComputer = await this.model.findByIdAndUpdate(id, values, { new: true }).populate('cpu gpu ram storage');
    return updatedComputer;
  }
}

module.exports = ComputerService;