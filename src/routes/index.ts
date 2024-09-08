import express from "express";
import controller from "../controllers/index.ts";

/** Index router */
const router = express.Router();

/* GET ping page */
router.get("/ping", function (_req, res, _next) {
  res.send("Pong!");
});

/* EMI Router */
router.get("/emis", controller.emi.list);
router.get("/emi/:id", controller.emi.getById);
router.post("/calculate-emi", controller.emi.calculate);

export default router;
