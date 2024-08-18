import { Router } from "express";
import {
    createCupoOtorgado
} from "../controllers/cupo_otorgado.controller.js";


const router = Router();

router.post("/api/cupos", createCupoOtorgado);


export default router;