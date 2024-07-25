import { Router } from "express";
import {
  getRutinas_pre_establecidasBySexoNroDias, //no estoy seguro si se filtan por id
  updateRutinas_pre_establecidas,
} from "../controllers/rutinas_pre_establecidas.controllers.js";


const router = Router();

router.get("/api/rutinas_pre_establecidas/:sexo/:nrodias", getRutinas_pre_establecidasBySexoNroDias);

router.put("/api/rutinas_pre_establecidas", updateRutinas_pre_establecidas);

export default router;