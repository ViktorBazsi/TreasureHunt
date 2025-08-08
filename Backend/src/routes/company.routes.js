import express from "express";
import companyController from "../controllers/company.controller.js";

const router = express.Router();

// POST
router.post("/", companyController.create);
// GET
router.get("/", companyController.list);
router.get("/:id", companyController.getById);
// PUT
router.put("/:id", companyController.update);
// DELETE
router.delete("/:id", companyController.destroy);

export default router;
