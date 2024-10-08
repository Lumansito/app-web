import { Router } from "express";
import {
  getUsers,
  getUserByDni,
  getClientesConMembresia,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/usuarios.controller.js";

const router = Router();



router.get("/api/users", getUsers);

router.get("/api/users/:dni", getUserByDni);

router.get("/api/users/membresia/:codMembresia", getClientesConMembresia);

router.post("/api/users", createUser);

router.put("/api/users/:dni", updateUser);

router.delete("/api/users/:dni", deleteUser);


export default router;
