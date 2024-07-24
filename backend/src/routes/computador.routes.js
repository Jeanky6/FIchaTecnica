const router = require("express").Router();
const ComputerController = require("../controllers/computador.controller");
const Computer = require("../database/models/computador.model");

const controller = new ComputerController();

router.get("/", async (req, res) => {
  try {
    const computers = await controller.index();
    res.json({ computers });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los computadores" });
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    location,
    computerType,
    manufacturer,
    technicianInCharge,
    groupInCharge,
    alternateUsernameNumber,
    serialNumber,
    alternateUsername,
    inventoryNumber,
    user,
    group,
    comments,
    updateSource,
    cpu,
    gpu,
    ram,
    storage
  } = req.body;

  const serialNumberDup = await Computer.findOne({ serialNumber });
  if (serialNumberDup) {
    return res
      .status(400)
      .json({ message: "El número de serie ya se encuentra registrado" });
  }

  const computer = new Computer({
    name,
    location,
    computerType,
    manufacturer,
    technicianInCharge,
    groupInCharge,
    alternateUsernameNumber,
    serialNumber,
    alternateUsername,
    inventoryNumber,
    user,
    group,
    comments,
    updateSource,
    cpu,
    gpu,
    ram,
    storage
  });

  try {
    const newComputer = await controller.create(computer);
    res.status(201).json({ computer: newComputer });
  } catch (error) {
    res.status(500).json({ error: "Error al guardar el computador." });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const computer = await controller.getById(id);
    res.json({ computer });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el computador" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    location,
    computerType,
    manufacturer,
    technicianInCharge,
    groupInCharge,
    alternateUsernameNumber,
    serialNumber,
    alternateUsername,
    inventoryNumber,
    user,
    group,
    comments,
    updateSource,
    cpu,
    gpu,
    ram,
    storage
  } = req.body;
  const values = {};
  if (name) values.name = name;
  if (location) values.location = location;
  if (computerType) values.computerType = computerType;
  if (manufacturer) values.manufacturer = manufacturer;
  if (technicianInCharge) values.technicianInCharge = technicianInCharge;
  if (groupInCharge) values.groupInCharge = groupInCharge;
  if (alternateUsernameNumber) values.alternateUsernameNumber = alternateUsernameNumber;
  if (serialNumber) values.serialNumber = serialNumber;
  if (alternateUsername) values.alternateUsername = alternateUsername;
  if (inventoryNumber) values.inventoryNumber = inventoryNumber;
  if (user) values.user = user;
  if (group) values.group = group;
  if (comments) values.comments = comments;
  if (updateSource) values.updateSource = updateSource;
  if (cpu) values.cpu = cpu;
  if (gpu) values.gpu = gpu;
  if (ram) values.ram = ram;
  if (storage) values.storage = storage;
  try {
    const computer = await controller.update(id, values);
    res.status(200).json({ computer });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const computer = await controller.remove(id);
    res.status(200).json({ computer });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;