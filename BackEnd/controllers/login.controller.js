import { pool } from "../bd.js";
import jwt from "jsonwebtoken";

import config from "dotenv"

config.config();

const CLAVE_SUPER_SEGURA = process.env.CLAVE;

export const iniciarSesion = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM usuarios WHERE dni = ? AND contrasenia = ?",
      [req.body.dni, req.body.contrasenia]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Credenciales erroneas" });
    } else {
      const roles = await pool.query(
        "SELECT idRol FROM usuarios_roles WHERE dni = ?",
        [req.body.dni]
      );
      let rol = [];
      for (let i = 0; i < roles[0].length; i++) {
        rol[i] = roles[0][i].idRol;
      }
      if (result[0].contrasenia == result[0].fechaNac) {
        return res.json({ message: "Debe cambiar la contraseña" }, rol); //pequeña valuidacion cambio de contraseña
      }
      const token = jwt.sign(
        { dni: req.body.dni, rol: rol },
        CLAVE_SUPER_SEGURA,
        { expiresIn: "1d" }
      );

      res.send({ token: token });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
