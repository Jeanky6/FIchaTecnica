const router = require("express").Router();
const GPUController = require("../controllers/gpu.controller");
const GPU = require("../database/models/gpu.model");

const controller = new GPUController();

router.get("/", async (req, res) => {
  try {
    const gpus = await controller.index();
    res.json({ gpus });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las GPUs" });
  }
});

router.post("/", async (req, res) => {
  const { brand, model, memory, memoryType, coreClock, boostClock, cudaCores, tdp, releaseDate, price } = req.body;

  const gpu = new GPU({
    brand,
    model,
    memory,
    memoryType,
    coreClock,
    boostClock,
    cudaCores,
    tdp,
    releaseDate,
    price,
  });

  try {
    const newGPU = await controller.create(gpu);
    res.status(201).json({ gpu: newGPU });
  } catch (error) {
    res.status(500).json({ error: "Error al guardar la GPU." });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const gpu = await controller.getById(id);
    res.json({ gpu });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la GPU" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { brand, model, memory, memoryType, coreClock, boostClock, cudaCores, tdp, releaseDate, price } = req.body;
  const values = {};
  if (brand) values.brand = brand;
  if (model) values.model = model;
  if (memory) values.memory = memory;
  if (memoryType) values.memoryType = memoryType;
  if (coreClock) values.coreClock = coreClock;
  if (boostClock) values.boostClock = boostClock;
  if (cudaCores) values.cudaCores = cudaCores;
  if (tdp) values.tdp = tdp;
  if (releaseDate) values.releaseDate = releaseDate;
  if (price) values.price = price;
  try {
    const gpu = await controller.update(id, values);
    res.status(200).json({ gpu });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const gpu = await controller.remove(id);
    res.status(200).json({ gpu });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;