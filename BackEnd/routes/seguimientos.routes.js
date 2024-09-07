import { Router } from "express";
import {
    
    getSeguimientosByDni_CodEje,
    createSeguimiento,
    updateSeguimiento,
    deleteSeguimiento,
    getSeguimiento
} from "../controllers/seguimientos.controller.js";

const router = Router();



router.get("/api/seguimientos/clientes/:dniCliente/:codEjercicio", getSeguimientosByDni_CodEje);

router.post("/api/seguimientos", createSeguimiento);

router.put("/api/seguimientos/:idSeguimiento/", updateSeguimiento);

router.delete("/api/seguimientos/:idSeguimiento", deleteSeguimiento);

router.get("/api/seguimientos/:idSeguimiento", getSeguimiento);

export default router;
