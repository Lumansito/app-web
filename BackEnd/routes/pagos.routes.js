import { Router } from "express";
import {
  obtenerPagos,
  obtenerPagosXdni,
  crearPago,
  actualizarPago,
} from "../controllers/pagos.controller.js";

import { Administrador, TodosLosRoles } from "../middleware/authorizeRole.js";


const router = Router();

router.get("/api/pagos",TodosLosRoles, obtenerPagos);

router.get("/api/pagos/:dniCliente",TodosLosRoles, obtenerPagosXdni);

router.post("/api/pagos", Administrador,crearPago);

router.put("/api/pagos/:idPago",Administrador, actualizarPago);

export default router;
