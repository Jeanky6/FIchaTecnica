const router = require("express").Router();
const StorageController = require("../controllers/storage.controller");
const Storage = require("../database/models/storage.model");

const controller = new StorageController();

router.get("/", async (req, res) => {
  try {
    const storages = await controller.index();
    res.json({ storages });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los dispositivos de almacenamiento" });
  }
});

router.post("/", async (req, res) => {
  const { brand, model, capacity, type, formFactor, interface, readSpeed, writeSpeed, cache, releaseDate, price } = req.body;

  const storage = new Storage({
    brand,
    model,
    capacity,
    type,
    formFactor,
    interface,
    readSpeed,
    writeSpeed,
    cache,
    releaseDate,
    price,
  });

  try {
    const newStorage = await controller.create(storage);
    res.status(201).json({ storage: newStorage });
  } catch (error) {
    res.status(500).json({ error: "Error al guardar el dispositivo de almacenamiento." });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const storage = await controller.getById(id);
    res.json({ storage });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el dispositivo de almacenamiento" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { brand, model, capacity, type, formFactor, interface, readSpeed, writeSpeed, cache, releaseDate, price } = req.body;
  const values = {};
  if (brand) values.brand = brand;
  if (model) values.model = model;
  if (capacity) values.capacity = capacity;
  if (type) values.type = type;
  if (formFactor) values.formFactor = formFactor;
  if (interface) values.interface = interface;
  if (readSpeed) values.readSpeed = readSpeed;
  if (writeSpeed) values.writeSpeed = writeSpeed;
  if (cache) values.cache = cache;
  if (releaseDate) values.releaseDate = releaseDate;
  if (price) values.price = price;
  try {
    const storage = await controller.update(id, values);
    res.status(200).json({ storage });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const storage = await controller.remove(id);
    res.status(200).json({ storage });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;    