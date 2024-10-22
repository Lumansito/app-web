import { Router } from "express";
import {
  obtenerEjercicios,
  obtenerEjerciciosXcodigoEj,
  crearEjercicio,
  actualizarEjercicio,
  eliminarEjercicio,
} from "../controllers/ejercicios.controller.js";

const router = Router();

router.get("/api/ejercicios", obtenerEjercicios);

router.get("/api/ejercicios/:codEjercicio", obtenerEjerciciosXcodigoEj);

router.post("/api/ejercicios", crearEjercicio);

router.put("/api/ejercicios/:codEjercicio", actualizarEjercicio);

router.delete("/api/ejercicios/:codEjercicio", eliminarEjercicio);

export default router;