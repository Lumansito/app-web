import { Router } from "express";
import {
  crearCupoOtorgado,
  obtenerCantCuposHoy,
  obtenerCuposOcupadosXidEsquema,
  confirmarAsistencia,
  obtenerReservasCliente,
  cancelarReserva,
} from "../controllers/cupoOtorgado.controller.js";

import { Administrador,  TodosLosRoles } from "../middleware/authorizeRole.js";

const router = Router();

router.post("/api/cupoOtorgado", Administrador, crearCupoOtorgado);

router.get(
  "/api/cupoOtorgado/:idEsquema",
  TodosLosRoles,
  obtenerCuposOcupadosXidEsquema
);

router.get("/api/cupoOtorgado", obtenerCantCuposHoy);

router.post(
  "/api/cupoOtorgado/confirmar/:dniCliente",
  TodosLosRoles,
  confirmarAsistencia
);

router.get(
  "/api/cupoOtorgado/reservas/:dniCliente",
  TodosLosRoles,
  obtenerReservasCliente
);

router.post("/api/cupoOtorgado/cancelar/:dniCliente", TodosLosRoles, cancelarReserva);

export default router;
