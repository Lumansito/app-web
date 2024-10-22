import { Router } from "express";
import {
  obtenerEsquemaCupos,
  obtenerEsquemaCuposXfecha,
  obtenerEsquemaCuposXid,
  obtenerEsquemaCuposHoy,
  crearEsquemaCupos,
  actualizarEsquemaCupos,
  eliminarEsquemaCupos,
} from "../controllers/esquemaCupos.controller.js";

const router = Router();

router.get("/api/esquemaCupos", obtenerEsquemaCupos);
router.get("/api/esquemaCupos/today", obtenerEsquemaCuposHoy);
router.get("/api/esquemaCupos/:idEsquema", obtenerEsquemaCuposXid); // Nueva ruta para obtener por idEsquema
router.get("/api/esquemaCupos/dia/:diaSemana", obtenerEsquemaCuposXfecha);
router.post("/api/esquemaCupos", crearEsquemaCupos);
router.put("/api/esquemaCupos/:idEsquema", actualizarEsquemaCupos); // Nueva ruta para actualizar por idEsquema
router.delete("/api/esquemaCupos/:idEsquema", eliminarEsquemaCupos); // Nueva ruta para eliminar por idEsquema

export default router;
