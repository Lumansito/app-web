import { Router } from "express";

import { iniciarSesion } from "../controllers/login.controller.js";

const router = Router();


router.post("/api/users/login", iniciarSesion);

export default router;