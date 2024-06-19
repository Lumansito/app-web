import { Router } from "express";
import {
  getMembresias,
  getMembresiaByCodeMembresia,
  createMembresia,
  updateMembresia,
  deleteMembresia,
} from "../controllers/membresias.controller.js";

const router = Router();

router.get("/membresias", getMembresias);

router.get("/membresias/:id", getMembresiaByCodeMembresia);

router.post("/membresias", createMembresia);

router.put("/membresias/:id", updateMembresia);

router.delete("/membresias/:id", deleteMembresia);

export default router;
