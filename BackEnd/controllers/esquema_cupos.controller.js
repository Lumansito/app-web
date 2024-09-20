import { pool } from "../bd.js";

export const getEsquemaCupos = async (req, res) => {
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

export const getEsquemaCuposById = async (req, res) => {
  try {
    const { idEsquema } = req.params; // Obtenemos el ID del parámetro de la solicitud
    const [result] = await pool.query(
      "SELECT * FROM esquemaCupos WHERE idEsquema = ?", // Suponiendo que 'idEsquema' es el nombre de la columna en tu base de datos
      [idEsquema]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Cupo no encontrado." });
    } else {
      res.json(result[0]); // Devolvemos el primer resultado
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al obtener el cupo." });
  }
};

export const getEsquemaCuposByDate = async (req, res) => {
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

export const getEsquemaCuposByDiaSemana = async (req, res) => {
  try {
    const { diaSemana } = req.params;
    const [result] = await pool.query(
      "SELECT * FROM esquemaCupos WHERE diaSemana = ?",
      [diaSemana]
    );
    if (result.length === 0) {
      return res.status(404).json({
        message: "no hay cupos cargados en el dia .",
      });
    } else {
      res.json(result[0]);
    }
  } catch (error) {
    console.log(error);
  }
};


export const getEsquemaCuposToday = async (req, res) => {
  try {
    const diaSemana = new Date().getDay();
    
    const [result] = await pool.query(
      "SELECT * FROM esquemaCupos WHERE diaSemana = ? and estado = 'active'",
      [diaSemana]
    );
    if (result.length === 0) {
      return res.status(404).json({
        message: "no hay cupos cargados en el dia de hoy.",
      });
    } else {
      res.json(result);
    }
  } catch (error) {
    console.log(error);
  }
};

export const createEsquemaCupos = async (req, res) => {
  try {
    const { diaSemana, horario, estado, cupo, dniInstructor } = req.body;
    await pool.query(
      "INSERT INTO esquemaCupos (diaSemana, horario, estado, cupo, dniInstructor) VALUES (?, ?, ?, ?,  ?)",
      [diaSemana, horario, estado, cupo, dniInstructor]
    );
    res.json({
      diaSemana,
      horario,
      estado,
      cupo,
      dniInstructor,

    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateEsquemaCupos = async (req, res) => {
  try {
    const { diaSemana, horario } = req.params;
    const [result] = await pool.query(
      "UPDATE esquemaCupos SET ? WHERE diaSemana = ? and horario = ?", //ESTO ESTA RARO
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

export const deleteEsquemaCupos = async (req, res) => {
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