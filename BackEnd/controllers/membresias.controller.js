import { pool } from "../bd.js";

export const obtenerMembresias = async (req, res, next) => {
  try {
    const [result] = await pool.query("SELECT * FROM membresias");
    if (result.length === 0) {
      return res.status(404).json({ message: "No hay membresias cargadas" });
    } else {
      res.json(result);
    }
  } catch (error) {
    next(error);
  }
};

export const obtenerMembresiasXcodMembresia = async (req, res, next) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM membresias WHERE codMembresia = ?",
      [req.params.codMembresia]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Membresia no encontrada" });
    } else {
      res.json(result[0]);
    }
  } catch (error) {
    next(error);
  }
};

export const crearMembresia = async (req, res, next) => {
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
    next(error);
  }
};

export const actualizarMembresia = async (req, res, next) => {
  try {
    const [result] = await pool.query(
      "UPDATE membresias SET ? WHERE codMembresia = ?",
      [req.body, req.params.codMembresia]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Membresia no encontrada" });
    }
    res.json({ message: "Membresia actualizada" });
  } catch (error) {
    next(error);
  }
};

export const eliminarMembresia = async (req, res, next) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM membresias WHERE codMembresia = ?",
      [req.params.codMembresia]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Membresia no encontrada" });
    }
    res.json({ message: "Membresia eliminada" });
  } catch (error) {
    next(error);
  }
};
