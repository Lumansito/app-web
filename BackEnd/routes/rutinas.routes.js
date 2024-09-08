import { Router } from "express";
import {
    
    getSoliciutdesRutinas,
    getRutinaById,
} from "../controllers/rutinas.controller.js";

const router = Router();



router.get("/api/solicitudes", getSoliciutdesRutinas);

router.get("/api/solicitudes/:idRutina", getRutinaById);



export default router;
