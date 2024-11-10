import { pool } from "../bd.js";

export const obtenerUsuarios = async (req, res) => {
  try {
    const [result] = await pool.query( //esto me devuelve un array de objetos, y coloca un campo roles con los valores de los mismos separados por coma
      ` 
      SELECT 
        u.*,
        GROUP_CONCAT(ur.idrol SEPARATOR ',') AS roles    
      FROM usuarios u
      INNER JOIN usuarios_roles ur ON u.dni = ur.dni
      WHERE u.estado = 1
      GROUP BY u.dni
    `);
    
    if (result.length === 0) {
      return res.status(404).json({ message: "No hay usuarios cargados" });
    } else {
      const usuarios = result.map(usuario => {
        // Convertimos la fecha de nacimiento al formato YYYY-MM-DD
        const fechaNac = usuario.fechaNac ? new Date(usuario.fechaNac).toISOString().split('T')[0] : null;
        
        return {
          ...usuario,
          fechaNac,  // Asignamos la fecha ya formateada
          roles: usuario.roles ? usuario.roles.split(',') : []
        };
      });
      res.json(usuarios);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};


export const obtenerUsuarioXdni = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT u.*, p.fecha as fechaPago FROM usuarios u INNER JOIN pagos p on p.dniCliente = u.dni WHERE u.dni = ?", [
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
  const connection = await pool.getConnection();
  const { nombre, apellido, dni, roles, fechaNac, contrasenia, sexo, telefono, mail } = req.body;
  const estado = 1;

  try {
    await connection.beginTransaction();

    await connection.query(
      "INSERT INTO usuarios (nombre, apellido, dni, contrasenia, fechaNac, sexo, telefono, mail, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [nombre, apellido, dni, contrasenia, fechaNac, sexo, telefono, mail, estado]
    );

    for (let i = 0; i < roles.length; i++) {
      await connection.query(
        "INSERT INTO USUARIOS_ROLES (dni, idRol) VALUES (?, ?)",
        [dni, roles[i]]
      );
    }

    await connection.commit();
    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    await connection.rollback();
    return res.status(500).json({ message: error.message });
  } finally {
    connection.release();
  }
};

export const actualizarUsuario = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const { nombre, apellido, dni, roles, fechaNac, sexo, telefono, mail , contrasenia} = req.body;

    const [result] = await connection.query(
      `UPDATE usuarios SET nombre = ?, apellido = ?, fechaNac = ?, sexo = ?, telefono = ?, mail = ? , contrasenia = ? WHERE dni = ?`,
      [nombre, apellido, fechaNac, sexo, telefono, mail, contrasenia,  dni]
    );

    if (result.affectedRows === 0) {
      await connection.rollback(); 
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    await connection.query(`DELETE FROM usuarios_roles WHERE dni = ?`, [dni]);
    for (let i = 0; i < roles.length; i++) {
      await connection.query(
        `INSERT INTO usuarios_roles (dni, idRol) VALUES (?, ?)`,
        [dni, roles[i]]
      );
    }
    await connection.commit();

    res.json({ message: "Usuario y roles actualizados" });
  } catch (error) {
    await connection.rollback();
    return res.status(500).json({ message: error.message });
  } finally {
    connection.release();
  }
};


export const eliminarUsuario = async (req, res) => {
  try {
    
    const [result] = await pool.query("UPDATE usuarios  set estado=0 WHERE dni = ?  ", [
      req.params.dni,
      
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
