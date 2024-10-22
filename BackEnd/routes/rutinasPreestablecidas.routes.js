import { Router } from "express";
import {
  obtenerRutinaPreestablecidaXsexo_nroDias, //no estoy seguro si se filtan por id
  actualizarRutinasPreestablecidas,
  obtenerRutinasPreestablecidas
} from "../controllers/rutinasPreestablecidas.controller.js";


const router = Router();

router.get("/api/rutinasPreestablecidas", obtenerRutinasPreestablecidas);

router.get("/api/rutinasPreestablecidas/:sexo/:nrodias", obtenerRutinaPreestablecidaXsexo_nroDias);

router.put("/api/rutinasPreestablecidas", actualizarRutinasPreestablecidas);

export default router;