import { Router } from "express";
import {
  getEsquemaCupos,
  getEsquemaCuposByDate,
  getEsquemaCuposById,
  getEsquemaCuposToday,
  createEsquemaCupos,
  updateEsquemaCupos,
  deleteEsquemaCupos,
} from "../controllers/esquema_cupos.controller.js";

const router = Router();

router.get("/api/esquema_cupos", getEsquemaCupos);
router.get("/api/esquema_cupos/today", getEsquemaCuposToday);
router.get("/api/esquema_cupos/:idEsquema", getEsquemaCuposById); // Nueva ruta para obtener por idEsquema
router.get("/api/esquema_cupos/dia/:diaSemana", getEsquemaCuposByDate);
router.post("/api/esquema_cupos", createEsquemaCupos);
router.put("/api/esquema_cupos/:idEsquema", updateEsquemaCupos); // Nueva ruta para actualizar por idEsquema
router.delete("/api/esquema_cupos/:idEsquema", deleteEsquemaCupos); // Nueva ruta para eliminar por idEsquema

export default router;
