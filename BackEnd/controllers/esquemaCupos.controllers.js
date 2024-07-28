import { pool } from "../bd.js";

export const getCupos = async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM esquemaCupos");
    if (results.length === 0) {
      return res.status(404).json({ message: "no hay cupos cargados." });
    } else {
      res.json(results);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCupoByDate = async (req, res) => {
  try {
    const { diaSemana, horario } = req.params;
    const [result] = await pool.query(
      "SELECT * FROM esquemaCupos WHERE diaSemana = ? and horario = ?",
      [diaSemana, horario]
    );
    if (result.length === 0) {
      return res.status(404).json({
        message: "no hay cupos cargados en el dia y horario especificado.",
      });
    } else {
      res.json(result[0]);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCupoToday = async (req, res) => {
  try {
    const diaSemana = new Date().getDay();
    const [result] = await pool.query(
      "SELECT * FROM esquemaCupos WHERE diaSemana = ?",
      [diaSemana]
    );
    if (result.length === 0) {
      return res.status(404).json({
        message: "no hay cupos cargados en el dia especificado.",
      });
    } else {
      res.json(result);
    }
  } catch (error) {
    console.log(error);
  }
};

export const createCupo = async (req, res) => {
  try {
    const { diaSemana, horario, estado, cupo, dniInstructor, tipoUsuario } = req.body;
    await pool.query(
      "INSERT INTO esquemaCupos (diaSemana, horario, estado, cupo) VALUES (?, ?, ?, ?, ?, ?)",
      [diaSemana, horario, estado, cupo, dniInstructor, tipoUsuario]
    );
    res.json({
      diaSemana,
      horario,
      estado,
      cupo,
      dniInstructor,
      tipoUsuario,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCupo = async (req, res) => {
  try {
    const { diaSemana, horario } = req.params;
    const [result] = await pool.query(
      "UPDATE esquemaCupos SET ? WHERE diaSemana = ? and horario = ?",
      [diaSemana, horario]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "cupo no encontrado." });
    }
    res.json({ message: "cupo actualizado." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCupo = async (req, res) => {
  try {
    const { diaSemana, horario } = req.params;
    const [result] = await pool.query(
      "DELETE FROM esquemaCupos WHERE diaSemana = ? and horario = ?",
      [diaSemana, horario]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "cupo no encontrado." });
    }
    res.json({ message: "cupo eliminado." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};