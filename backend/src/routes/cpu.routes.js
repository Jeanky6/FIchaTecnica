const router = require("express").Router();
const CPUController = require("../controllers/cpu.controller");
const CPU = require("../database/models/cpu.model");

const controller = new CPUController();

router.get("/", async (req, res) => {
  try {
    const cpus = await controller.index();
    res.json({ cpus });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los CPUs" });
  }
});

router.post("/", async (req, res) => {
  const { brand, model, cores, threads, baseClockSpeed, turboClockSpeed, socket, tdp, releaseDate, price } = req.body;

  const cpu = new CPU({
    brand,
    model,
    cores,
    threads,
    baseClockSpeed,
    turboClockSpeed,
    socket,
    tdp,
    releaseDate,
    price,
  });

  try {
    const newCPU = await controller.create(cpu);
    res.status(201).json({ cpu: newCPU });
  } catch (error) {
    res.status(500).json({ error: "Error al guardar el CPU." });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cpu = await controller.getById(id);
    res.json({ cpu });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el CPU" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { brand, model, cores, threads, baseClockSpeed, turboClockSpeed, socket, tdp, releaseDate, price } = req.body;
  const values = {};
  if (brand) values.brand = brand;
  if (model) values.model = model;
  if (cores) values.cores = cores;
  if (threads) values.threads = threads;
  if (baseClockSpeed) values.baseClockSpeed = baseClockSpeed;
  if (turboClockSpeed) values.turboClockSpeed = turboClockSpeed;
  if (socket) values.socket = socket;
  if (tdp) values.tdp = tdp;
  if (releaseDate) values.releaseDate = releaseDate;
  if (price) values.price = price;
  try {
    const cpu = await controller.update(id, values);
    res.status(200).json({ cpu });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cpu = await controller.remove(id);
    res.status(200).json({ cpu });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;