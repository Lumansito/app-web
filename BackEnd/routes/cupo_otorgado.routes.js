import { Router } from "express";
import {
    createCupoOtorgado,
    getCantidadCuposHoy,
    getCuposOcupadosByidEsquema
} from "../controllers/cupo_otorgado.controller.js";


const router = Router();

router.post("/api/cupos", createCupoOtorgado);

router.get("/api/cupos", getCantidadCuposHoy);

router.get("/api/cupos/:idEsquema", getCuposOcupadosByidEsquema);

export default router;