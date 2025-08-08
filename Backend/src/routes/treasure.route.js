import express from "express";
import treasureController from "../controllers/treasure.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// POST
router.post("/", treasureController.create);
// GET
router.get("/", treasureController.list);
router.get("/:id", treasureController.getById);
// PUT
router.put("/:id", treasureController.update);
// DELETE
router.delete("/:id", treasureController.destroy);
// ANSWER
router.post(
  "/:id/check",
  authMiddleware.authenticate,
  treasureController.checkAnswer
);
// BEGIN
router.post("/begin", authMiddleware.authenticate, treasureController.begin);

export default router;
