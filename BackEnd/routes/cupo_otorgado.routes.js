import { Router } from "express";
import {
    createCupoOtorgado,
    getCantidadCuposHoy,
    getCuposOcupadosByidEsquema,
    confirmarAsistencia
} from "../controllers/cupo_otorgado.controller.js";


const router = Router();

router.post("/api/cupos", createCupoOtorgado);

router.get("/api/cupos/:idEsquema", getCuposOcupadosByidEsquema);

router.get("/api/cupos", getCantidadCuposHoy);

router.post("/api/cupos/confirmar", confirmarAsistencia);

export default router;