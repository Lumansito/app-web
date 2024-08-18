import { Router } from "express";
import {
    getClientesParaSeguimiento,
    getSeguimientosByDni_CodEje,
    createSeguimiento,
    updateSeguimiento,
    deleteSeguimiento    
} from "../controllers/seguimientos.controller.js";

const router = Router();

router.get("/api/seguimientos/clientes", getClientesParaSeguimiento);

router.get("/api/seguimientos/clientes/:dniCliente/:codEjercicio", getSeguimientosByDni_CodEje);

router.post("/api/seguimientos/clientes/", createSeguimiento);

router.put("/api/seguimientos/clientes/", updateSeguimiento);

router.delete("/api/seguimientos/clientes/", deleteSeguimiento);

export default router;
