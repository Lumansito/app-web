
import { pool } from "../bd.js";

// usuario agrega un comentario a una rutina personalizada
export const getSolicitudRutinas = async (req, res) => {
  try {
    const { dni, rutinaId } = req.params;
    const { peticion } = req.body;

    const [result] = await pool.query(
      "INSERT INTO rutinas (dniCliente, rutinaId, peticion) VALUES (?, ?, ?)",
      [dni, rutinaId, peticion]
    );

    res.json({ message: "Comentario agregado correctamente.", id: result.insertId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// administrador cree o modifique una rutina personalizada
export const updatePersonalizedRoutine = async (req, res) => {
    const { rutinaId } = req.params;
    const lineas = req.body; // Array de objetos que representan las líneas de la rutina
    let variables = "";
  
    for (let i = 0; i < lineas.length; i++) {
      variables += `(${rutinaId}, ${lineas[i].dia}, ${i}, ${lineas[i].codEjercicio}, ${lineas[i].series}, ${lineas[i].repeticiones}),`;
    }
    variables = variables.slice(0, -1);
  
    const queryInsert = `INSERT INTO lineas_rutina (rutinaId, dia, orden, codEjercicio, series, repeticiones) VALUES ${variables}`;
    const queryDelete = `DELETE FROM lineas_rutina WHERE rutinaId = ${rutinaId} AND dia = ?`;
  
    let connection;
  
    try {
      connection = await pool.getConnection();
      await connection.beginTransaction();
  
      for (let i = 0; i < lineas.length; i++) {
        await connection.query(queryDelete, [lineas[i].dia]);
      }
  
      await connection.query(queryInsert);
  
      await connection.commit();
      res.json({ message: "Rutina personalizada actualizada correctamente." });
    } catch (error) {
      if (connection) await connection.rollback();
      res.status(500).json({ message: error.message });
    } finally {
      if (connection) connection.release();
    }
  };
  
  // obtener las rutinas personalizadas de un usuario
  export const getRutinaByDni = async (req, res) => {
    try {
      const { dniCliente } = req.params;
  
      const [result] = await pool.query(
        "SELECT rp.*, lrp.*, ej.nombre, c.peticion FROM rutinas rp " +
        "INNER JOIN lineas_rutina lrp ON rp.id = lrp.rutinaId " +
        "INNER JOIN ejercicios ej ON lrp.codEjercicio = ej.codEjercicio " +
        "LEFT JOIN comentarios_rutinas c ON rp.id = c.rutinaId " +
        "WHERE rp.dniCliente = ? ORDER BY lrp.dia, lrp.orden",
        [dniCliente]
      );
  
      if (result.length === 0) {
        return res.status(404).json({ message: "No se encontraron rutinas personalizadas para este usuario." });
      } else {
        res.json(result);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };