const { Router } = require("express");
const ComputadorRouter = require("./computador.routes");
const CpuRouter = require("./cpu.routes");
const GpuRouter = require("./gpu.routes");
const RamRouter = require("./ram.routes");
const StorageRouter = require("./storage.routes");

function routerApi(app) {
  const router = Router();

  app.use("/api/v1", router);
  router.use("/computador", ComputadorRouter);
  router.use("/cpu", CpuRouter);
  router.use("/gpu", GpuRouter);
  router.use("/ram", RamRouter);
  router.use("/storage", StorageRouter);

}

module.exports = routerApi;
  