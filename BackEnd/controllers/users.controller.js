import {pool} from "../bd.js";

export const getUsers = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM users");
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
    const [result] = await db.query("SELECT * FROM users WHERE dni = ?", [
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

export const createUser = async (req, res) => {
  try {
    const { nombre, apellido, dni } = req.body;
    const res = await pool.query(
      "INSERT INTO users (nombre, apellido, dni) VALUES (?, ?, ?)",
      [nombre, apellido, dni]
    );
    res.json({
      nombre,
      apellido,
      dni,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const res = await pool.quety("UPDATE users SET / WHERE dni = ?", [
      req.body,
      req.params.dni,
    ]);
    req.json({ message: "Usuario actualizado" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const [res] = await pool.query("DELETE FROM users WHERE dni = ?", [
      req.params.dni,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
