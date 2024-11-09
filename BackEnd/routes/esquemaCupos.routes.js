import { Router } from "express";
import {
  obtenerEsquemaCupos,
  obtenerEsquemaCuposXfecha,
  obtenerEsquemaCuposXid,
  obtenerEsquemaCuposHoy,
  crearEsquemaCupos,
  actualizarEsquemaCupos,
  actualizarEstadoCupo,
  eliminarEsquemaCupos,
} from "../controllers/esquemaCupos.controller.js";

import { Administrador, TodosLosRoles } from "../middleware/authorizeRole.js";

const router = Router();

router.get("/api/esquemaCupos", TodosLosRoles, obtenerEsquemaCupos);
router.get("/api/esquemaCupos/today", TodosLosRoles, obtenerEsquemaCuposHoy);
router.get(
  "/api/esquemaCupos/:idEsquema",
  TodosLosRoles,
  obtenerEsquemaCuposXid
); 
router.get(
  "/api/esquemaCupos/dia/:diaSemana",
  TodosLosRoles,
  obtenerEsquemaCuposXfecha
);
router.post("/api/esquemaCupos", Administrador, crearEsquemaCupos);
router.put(
  "/api/esquemaCupos/:idEsquema",
  Administrador,
  actualizarEsquemaCupos
); 
router.put(
  "/api/esquemaCupos/estado/:idEsquema",
  Administrador,
  actualizarEstadoCupo
); 
router.delete(
  "/api/esquemaCupos/:idEsquema",
  Administrador,
  eliminarEsquemaCupos
);

export default router;
