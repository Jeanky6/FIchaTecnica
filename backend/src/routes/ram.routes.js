const router = require("express").Router();
const RAMController = require("../controllers/ram.controller");
const RAM = require("../database/models/ram.model");

const controller = new RAMController();

router.get("/", async (req, res) => {
  try {
    const rams = await controller.index();
    res.json({ rams });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las memorias RAM" });
  }
});

router.post("/", async (req, res) => {
  const { brand, model, capacity, type, speed, latency, voltage, ecc, releaseDate, price } = req.body;

  const ram = new RAM({
    brand,
    model,
    capacity,
    type,
    speed,
    latency,
    voltage,
    ecc,
    releaseDate,
    price,
  });

  try {
    const newRAM = await controller.create(ram);
    res.status(201).json({ ram: newRAM });
  } catch (error) {
    res.status(500).json({ error: "Error al guardar la memoria RAM." });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const ram = await controller.getById(id);
    res.json({ ram });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la memoria RAM" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { brand, model, capacity, type, speed, latency, voltage, ecc, releaseDate, price } = req.body;
  const values = {};
  if (brand) values.brand = brand;
  if (model) values.model = model;
  if (capacity) values.capacity = capacity;
  if (type) values.type = type;
  if (speed) values.speed = speed;
  if (latency) values.latency = latency;
  if (voltage) values.voltage = voltage;
  if (ecc !== undefined) values.ecc = ecc;
  if (releaseDate) values.releaseDate = releaseDate;
  if (price) values.price = price;
  try {
    const ram = await controller.update(id, values);
    res.status(200).json({ ram });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const ram = await controller.remove(id);
    res.status(200).json({ ram });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;