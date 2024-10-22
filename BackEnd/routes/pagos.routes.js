import { Router } from "express";
import {
  obtenerPagos,
  obtenerPagosXdni,
  crearPago,
  actualizarPago,
} from "../controllers/pagos.controller.js";

const router = Router();

router.get("/api/pagos", obtenerPagos);

router.get("/api/pagos/:dniCliente", obtenerPagosXdni);

router.post("/api/pagos", crearPago);

router.put("/api/pagos/:idPago", actualizarPago);

export default router;
