import { Router } from "express";
import {
  obtenerUsuarios,
  obtenerUsuarioXdni,
  obtenerClientesXcodMembresiaActiva,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerProfesionales
} from "../controllers/usuarios.controller.js";

const router = Router();

router.get("/api/users/profesionales", obtenerProfesionales);

router.get("/api/users", obtenerUsuarios);

router.get("/api/users/:dni", obtenerUsuarioXdni);

router.get("/api/users/membresia/:codMembresia", obtenerClientesXcodMembresiaActiva);

router.post("/api/users", crearUsuario);

router.put("/api/users/:dni", actualizarUsuario);

router.delete("/api/users/:dni", eliminarUsuario);


export default router;
