import { Router } from "express";
import {
  getCupos,
  getCupoByDate,
  getCupoToday,
  createCupo,
  updateCupo,
  deleteCupo,
} from "../controllers/esquemaCupos.controllers.js";

const router = Router();

router.get("/api/cupos", getCupos);

router.get("/api/cupos/:diaSemana/:horario", getCupoByDate);

router.get("/api/cupos/today", getCupoToday);

router.post("/api/cupos", createCupo);

router.put("/api/cupos/:diaSemana/:horario", updateCupo);

router.delete("/api/cupos/:diaSemana/:horario", deleteCupo);

export default router;