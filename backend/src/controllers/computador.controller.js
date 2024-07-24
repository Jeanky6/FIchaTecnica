const ComputerService = require("../services/computador.service");

class ComputerController {
  constructor() {
    this.service = new ComputerService();
  }

  async index() {
    const computers = await this.service.get();
    return computers;
  }

  async create(computer) {
    const newComputer = await this.service.post(computer);
    return newComputer;
  }

  async getById(id) {
    const computer = await this.service.getOne(id);
    return computer;
  }

  async remove(id) {
    const deletedComputer = await this.service.delete(id);
    return deletedComputer;
  }

  async update(id, values) {
    const updatedComputer = await this.service.update(id, values);
    return updatedComputer;
  }
}

module.exports = ComputerController;