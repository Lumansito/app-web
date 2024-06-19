import { Router } from "express";
import {
  getEjercicios,
  getEjercicioBycodEjercicios,
  createEjercicio,
  updateEjercicio,
  deleteEjercicio,
} from "../controllers/ejercicios.controller.js";

const router = Router();

router.get("/ejercicios", getEjercicios);

router.get("/ejercicios/:codEjercicio", getEjercicioBycodEjercicios);

router.post("/ejercicios", createEjercicio);

router.put("/ejercicios/:codEjercicio", updateEjercicio);

router.delete("/ejercicios/:codEjercicio", deleteEjercicio);

export default router;