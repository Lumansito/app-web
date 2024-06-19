import { pool } from "../bd.js";

export const getMembresias = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM membresias");
    if (result.length === 0) {
      return res.status(404).json({ message: "No hay membresias cargadas" });
    } else {
      res.json(result);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMembresiaByCodeMembresia = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM membresias WHERE CodeMembresia = ?",
      [req.params.CodeMembresia]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Membresia no encontrada" });
    } else {
      res.json(result[0]);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createMembresia = async (req, res) => {
  try {
    const { nombre, costo, descripcion, costoDia } = req.body;
    await pool.query(
      "INSERT INTO membresias (nombre, costo, descripcion, costoDia) VALUES (?, ?, ?, ?)",
      [nombre, costo, descripcion, costoDia]
    );
    res.json({
      nombre,
      costo,
      descripcion,
      costoDia,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateMembresia = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE membresias SET ? WHERE CodeMembresia = ?",
      [req.body, req.params.CodeMembresia]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Membresia no encontrada" });
    }
    res.json({ message: "Membresia actualizada" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteMembresia = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM membresias WHERE CodeMembresia = ?",
      [req.params.CodeMembresia]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Membresia no encontrada" });
    }
    res.json({ message: "Membresia eliminada" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
