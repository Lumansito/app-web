import { Router } from "express";
import {
  getRutinas_pre_establecidasBySexoNroDias, //no estoy seguro si se filtan por id
} from "../controllers/rutinas_pre_establecidas.controllers.js";


const router = Router();

router.get("/api/rutinas_pre_establecidas/:sexo/:nrodias", getRutinas_pre_establecidasBySexoNroDias);

export default router;