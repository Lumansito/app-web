import { pool } from "../bd.js";

export const obtenerUsuarios = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM usuarios");
    if (result.length === 0) {
      return res.status(404).json({ message: "No hay usuarios cargados" });
    } else {
      res.json(result);
    }
  } catch (error) {
    console.log(error);
  }
};

export const obtenerUsuarioXdni = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM usuarios WHERE dni = ?", [
      req.params.dni,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    } else {
      res.json(result[0]);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// los roles vienen en un arreglo si es cliente roles = [1] si es cleinte y profesor roles = [1,2] si es admin roles = [3]
export const crearUsuario = async (req, res) => {
  const { nombre, apellido, dni, roles, fechaNac, sexo, telefono, mail } =
    req.body;
  try {
    await pool.query(
      "INSERT INTO usuarios (nombre, apellido, dni, contrasenia, fechaNac, sexo, telefono, mail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [nombre, apellido, dni, fechaNac, fechaNac, sexo, telefono, mail]
    );
    for (let i = 0; i < roles.length; i++) {
      await pool.query(
        "INSERT INTO USUARIOS_ROLES (dni, idRol) VALUES (?, ?)",
        [dni, roles[i]]
      );
    }
    res.status(201).json({ message: "Usuario Creado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const [result] = await pool.query("UPDATE usuarios SET / WHERE dni = ?", [
      req.body,
      req.params.dni,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario actualizado" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { tipoUsuario } = req.body;
    const [result] = await pool.query("DELETE FROM usuarios WHERE dni = ?  ", [
      req.params.dni,
      tipoUsuario,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const obtenerClientesXcodMembresiaActiva = async (req, res) => {
  try {
    const { codMembresia } = req.params;
    const [result] = await pool.query(
      `
      SELECT * 
      FROM usuarios u
      INNER JOIN pagos p
      ON p.dniCliente = u.dni
      WHERE p.fecha BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY) AND CURRENT_DATE() and u.codMembresia=?;
      `,
      [codMembresia]
    );

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay usuarios con membresia activa" });
    } else {
      res.json(result);
    }
  } catch (error) {
    console.log(error);
  }
};

export const obtenerProfesionales = async (req, res) => {
  try {
    const [result] = await pool.query(
      `
      SELECT u.dni, u.nombre, u.apellido
        FROM usuarios u 
        INNER JOIN usuarios_roles ur ON u.dni = ur.dni
        WHERE ur.idRol = 2
      `
    );
    console.log(result);
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay profesionales disponibles" });
    }
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
