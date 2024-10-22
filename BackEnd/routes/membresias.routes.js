import { Router } from "express";
import {
  obtenerMembresias,
  obtenerMembresiasXcodMembresia,
  crearMembresia,
  actualizarMembresia,
  eliminarMembresia,
} from "../controllers/membresias.controller.js";

const router = Router();

router.get("/api/membresias", obtenerMembresias);

router.get("/api/membresias/:codMembresia", obtenerMembresiasXcodMembresia);

router.post("/api/membresias", crearMembresia);

router.put("/api/membresias/:codMembresia", actualizarMembresia);

router.delete("/api/membresias/:codMembresia", eliminarMembresia);

export default router;
