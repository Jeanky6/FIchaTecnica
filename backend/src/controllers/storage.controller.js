const StorageService = require("../services/storage.service");

class StorageController {
  constructor() {
    this.service = new StorageService();
  }

  async index() {
    const storages = await this.service.get();
    return storages;
  }

  async create(storage) {
    const newStorage = await this.service.post(storage);
    return newStorage;
  }

  async getById(id) {
    const storage = await this.service.getOne(id);
    return storage;
  }

  async remove(id) {
    const deletedStorage = await this.service.delete(id);
    return deletedStorage;
  }

  async update(id, values) {
    const updatedStorage = await this.service.update(id, values);
    return updatedStorage;
  }
}

module.exports = StorageController;