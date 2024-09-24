import { Router } from "express";
import {
    createCupoOtorgado,
    getCantidadCuposHoy,
    getCuposOcupadosByidEsquema,
    confirmarAsistencia,
    getReservasCliente,
    cancelarReserva
} from "../controllers/cupo_otorgado.controller.js";


const router = Router();

router.post("/api/cupos", createCupoOtorgado);

router.get("/api/cupos/:idEsquema", getCuposOcupadosByidEsquema);

router.get("/api/cupos", getCantidadCuposHoy);

router.post("/api/cupos/confirmar/:dniCliente", confirmarAsistencia);

router.get("/api/cupos/reservas/:dniCliente", getReservasCliente);

router.post("/api/cupos/cancelar/:dniCliente", cancelarReserva);

export default router;