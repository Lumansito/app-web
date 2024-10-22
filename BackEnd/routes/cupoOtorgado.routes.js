import { Router } from "express";
import {
    crearCupoOtorgado,
    obtenerCantCuposHoy,
    obtenerCuposOcupadosXidEsquema,
    confirmarAsistencia,
    obtenerReservasCliente,
    cancelarReserva
} from "../controllers/cupoOtorgado.controller.js";


const router = Router();

router.post("/api/cupoOtorgado", crearCupoOtorgado);

router.get("/api/cupoOtorgado/:idEsquema", obtenerCuposOcupadosXidEsquema);

router.get("/api/cupoOtorgado", obtenerCantCuposHoy);

router.post("/api/cupoOtorgado/confirmar/:dniCliente", confirmarAsistencia);

router.get("/api/cupoOtorgado/reservas/:dniCliente", obtenerReservasCliente);

router.post("/api/cupoOtorgado/cancelar/:dniCliente", cancelarReserva);

export default router;