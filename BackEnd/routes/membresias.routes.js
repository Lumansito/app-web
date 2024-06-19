import { Router } from "express";
import {
  getMembresias,
  getMembresiaBycodMembresia,
  createMembresia,
  updateMembresia,
  deleteMembresia,
} from "../controllers/membresias.controller.js";

const router = Router();

router.get("/membresias", getMembresias);

router.get("/membresias/:codMembresia", getMembresiaBycodMembresia);

router.post("/membresias", createMembresia);

router.put("/membresias/:codMembresia", updateMembresia);

router.delete("/membresias/:codMembresia", deleteMembresia);

export default router;
