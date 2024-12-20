import { Router } from "express";
import {
    
    obtenerSolicitudRutinas,
    obtenerRutinaXid,
    actualizarRutina
} from "../controllers/rutinas.controller.js";

const router = Router();



router.get("/api/solicitudes", obtenerSolicitudRutinas);

router.get("/api/solicitudes/:idRutina", obtenerRutinaXid);

router.put("/api/solicitudes/:idRutina", actualizarRutina);

export default router;
