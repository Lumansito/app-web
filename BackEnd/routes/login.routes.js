import { Router } from "express";

import { login } from "../controllers/login.controller.js";

const router = Router();


router.post("/api/users/login", login);

export default router;