import { Router } from "express";
import {
    
    obtenerSeguimientosXdni_codEjercicio,
    crearSeguimiento,
    actualizarSeguimiento,
    eliminarSeguimiento,
    obtenerSeguimiento
} from "../controllers/seguimientos.controller.js";

const router = Router();



router.get("/api/seguimientos/clientes/:dniCliente/:codEjercicio", obtenerSeguimientosXdni_codEjercicio);

router.post("/api/seguimientos", crearSeguimiento);

router.put("/api/seguimientos/:idSeguimiento/", actualizarSeguimiento);

router.delete("/api/seguimientos/:idSeguimiento", eliminarSeguimiento);

router.get("/api/seguimientos/:idSeguimiento", obtenerSeguimiento);

export default router;
