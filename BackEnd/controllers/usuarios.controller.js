import { pool } from "../bd.js";



export const getUsers = async (req, res) => {
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

export const getUserByDni = async (req, res) => {
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
export const createUser = async (req, res) => {
  const { nombre, apellido, dni, roles, fechaNac, sexo, telefono, mail } =
    req.body;
  try {
    //Insertamos la fecha de nacimiento en la contraseña, para que luego la cambie el usuario
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

export const updateUser = async (req, res) => {
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

export const deleteUser = async (req, res) => {
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

//obtener los clientes con la membresia suficiente para tener seguimientos

export const getClientesConMembresia = async (req, res) => {
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
