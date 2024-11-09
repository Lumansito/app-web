import { Router } from "express";
import {
  obtenerMembresias,
  obtenerMembresiasXcodMembresia,
  crearMembresia,
  actualizarMembresia,
  eliminarMembresia,
} from "../controllers/membresias.controller.js";
import { Administrador, TodosLosRoles } from "../middleware/authorizeRole.js";


const router = Router();

router.get("/api/membresias",TodosLosRoles, obtenerMembresias);

router.get("/api/membresias/:codMembresia",TodosLosRoles, obtenerMembresiasXcodMembresia);

router.post("/api/membresias", Administrador,crearMembresia);

router.put("/api/membresias/:codMembresia", Administrador,actualizarMembresia);

router.delete("/api/membresias/:codMembresia",Administrador, eliminarMembresia);

export default router; 