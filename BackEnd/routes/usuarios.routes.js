import { Router } from "express";
import {
  obtenerUsuarios,
  obtenerUsuarioXdni,
  obtenerClientesXcodMembresiaActiva,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerProfesionales,
} from "../controllers/usuarios.controller.js";

import {
  ProfesionalAdmin,
  Administrador,
} from "../middleware/authorizeRole.js";

const router = Router();

router.get("/api/users/profesionales", ProfesionalAdmin, obtenerProfesionales);

router.get("/api/users", ProfesionalAdmin, obtenerUsuarios);

router.get("/api/users/:dni", ProfesionalAdmin, obtenerUsuarioXdni);

router.get(
  "/api/users/membresia/:codMembresia",
  ProfesionalAdmin,
  obtenerClientesXcodMembresiaActiva
);

router.post("/api/users", Administrador, crearUsuario);

router.put("/api/users/:dni", Administrador, actualizarUsuario);

router.delete("/api/users/:dni", Administrador, eliminarUsuario);

export default router;
