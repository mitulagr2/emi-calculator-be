import express from "express";

const router = express.Router();

/* GET ping page. */
router.get("/ping", function (_req, res, _next) {
  res.send("Pong!");
});

export default router;
