import { Router } from "express";
import {
    createCupoOtorgado,
    getCantidadCuposHoy
} from "../controllers/cupo_otorgado.controller.js";


const router = Router();

router.post("/api/cupos", createCupoOtorgado);

router.get("/api/cupos", getCantidadCuposHoy);

export default router;