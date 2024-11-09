import { Router } from "express";
import {
  obtenerEjercicios,
  obtenerEjerciciosXcodigoEj,
  crearEjercicio,
  actualizarEjercicio,
  eliminarEjercicio,
} from "../controllers/ejercicios.controller.js";

import { Administrador, TodosLosRoles } from "../middleware/authorizeRole.js";

const router = Router();

router.get("/api/ejercicios", TodosLosRoles, obtenerEjercicios);

router.get(
  "/api/ejercicios/:codEjercicio",
  TodosLosRoles,
  obtenerEjerciciosXcodigoEj
);

router.post("/api/ejercicios", Administrador, crearEjercicio);

router.put("/api/ejercicios/:codEjercicio", Administrador, actualizarEjercicio);

router.delete(
  "/api/ejercicios/:codEjercicio",
  Administrador,
  eliminarEjercicio
);

export default router;
