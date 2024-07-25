import { Router } from "express";
import {
  getMembresias,
  getMembresiaBycodMembresia,
  createMembresia,
  updateMembresia,
  deleteMembresia,
} from "../controllers/membresias.controller.js";

const router = Router();

router.get("/api/membresias", getMembresias);

router.get("/api/membresias/:codMembresia", getMembresiaBycodMembresia);

router.post("/api/membresias", createMembresia);

router.put("/api/membresias/:codMembresia", updateMembresia);

router.delete("/api/membresias/:codMembresia", deleteMembresia);

export default router;
