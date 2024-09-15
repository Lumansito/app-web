import { Router } from "express";
import {
    
    getSoliciutdesRutinas,
    getRutinaById,
    updatePersonalizedRoutine
} from "../controllers/rutinas.controller.js";

const router = Router();



router.get("/api/solicitudes", getSoliciutdesRutinas);

router.get("/api/solicitudes/:idRutina", getRutinaById);

router.put("/api/solicitudes/:idRutina", updatePersonalizedRoutine);

export default router;
