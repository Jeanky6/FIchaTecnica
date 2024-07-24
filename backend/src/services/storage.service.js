const Storage = require("../database/models/storage.model");

class StorageService {
  constructor() {
    this.model = Storage;
  }

  async get() {
    const storages = await this.model.find();
    return storages;
  }

  async post(storage) {
    const newStorage = await this.model.create(storage);
    return newStorage;
  }

  async getOne(id) {
    const storage = await this.model.findById(id);
    return storage;
  }

  async delete(id) {
    const deletedStorage = await this.model.findByIdAndDelete(id);
    return deletedStorage;
  }

  async update(id, values) {
    const updatedStorage = await this.model.findByIdAndUpdate(id, values, { new: true });
    return updatedStorage;
  }
}

module.exports = StorageService;