import { Router } from "express";
import {
  getEjercicios,
  getEjercicioBycodEjercicios,
  createEjercicio,
  updateEjercicio,
  deleteEjercicio,
} from "../controllers/ejercicios.controller.js";

const router = Router();

router.get("/api/ejercicios", getEjercicios);

router.get("/api/ejercicios/:codEjercicio", getEjercicioBycodEjercicios);

router.post("/api/ejercicios", createEjercicio);

router.put("/api/ejercicios/:codEjercicio", updateEjercicio);

router.delete("/api/ejercicios/:codEjercicio", deleteEjercicio);

export default router;