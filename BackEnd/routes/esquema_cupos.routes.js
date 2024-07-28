import { Router } from "express";
import {
  getEsquemaCupos,
  getEsquemaCuposByDate,
  getEsquemaCuposToday,
  createEsquemaCupos,
  updateEsquemaCupos,
  deleteEsquemaCupos,
} from "../controllers/esquema_cupos.controller.js";

const router = Router();

router.get("/api/esquema_cupos", getEsquemaCupos);

router.get("/api/esquema_cupos/:diaSemana/:horario", getEsquemaCuposByDate);

router.get("/api/esquema_cupos/today", getEsquemaCuposToday);

router.post("/api/esquema_cupos", createEsquemaCupos);

router.put("/api/esquema_cupos/:diaSemana/:horario", updateEsquemaCupos);

router.delete("/api/esquema_cupos/:diaSemana/:horario", deleteEsquemaCupos);

export default router;