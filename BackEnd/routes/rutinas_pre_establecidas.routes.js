import { Router } from "express";
import {
  getRutinas_pre_establecidas,
  getRutinas_pre_establecidasByFechaNroDias, //no estoy seguro si se filtan por id
} from "../controllers/rutinas_pre_establecidas.controllers";

const router = Router();

router.get(
  "/rutinas_pre_establecidas/:sexo/:nrodias",
  getRutinas_pre_establecidasByFechaNroDias
);

export default router;