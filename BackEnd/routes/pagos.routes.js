import { Router } from "express";
import {
  getPagos,
  getPagosByDNI,
  createPago,
  updatePago,
} from "../controllers/pagos.controller.js";

const router = Router();

router.get("/api/pagos", getPagos);

router.get("/api/pagos/:dniCliente", getPagosByDNI);

router.post("/api/pagos", createPago);

router.put("/api/pagos/:idPago", updatePago);

export default router;
