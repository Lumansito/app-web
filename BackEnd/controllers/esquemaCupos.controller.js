import { pool } from "../bd.js";

export const obtenerEsquemaCupos = async (req, res) => {
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

export const obtenerEsquemaCuposXid = async (req, res) => {
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

export const obtenerEsquemaCuposXfecha = async (req, res) => {
  try {
    const { diaSemana } = req.params;
    const [result] = await pool.query(
      "SELECT * FROM esquemaCupos WHERE diaSemana = ? ",
      [diaSemana]
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

export const obtenerEsquemaCuposXdiaSemana = async (req, res) => {
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

export const obtenerEsquemaCuposHoy = async (req, res) => {
  try {
    const diaSemana = new Date().getDay();
    const [result] = await pool.query(
      "SELECT * FROM esquemacupos WHERE diaSemana = ? and estado = 'active' and horario >= CURTIME()",
      [diaSemana]
    );
    if (result.length === 0) {
      console.log(diaSemana);
      return res.status(404).json({
        message: "no hay cupos cargados en el dia de hoy.",
      });
    } else {

      const [cupos] = await pool.query(
        "SELECT horaInicio, count(*) as reservas from cupo_otorgado where fecha = CURDATE() and estado != 'cancelado' group by horaInicio"
      );
      console.log(result);
      let clases = result.map((clase) => {
        const cupoEncontrado = cupos.find(
          (cupo) => cupo.horaInicio === clase.horario
        );
        return {
          ...clase,
          cuposOcupados: cupoEncontrado ? cupoEncontrado.reservas : 0,
        };
      });
      console.log(clases);
      res.status(200).json(clases);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const crearEsquemaCupos = async (req, res) => {
  try {
    const { diaSemana, horario, estado, dniInstructor, cupo } = req.body; // Eliminar idEsquema
    await pool.query(
      "INSERT INTO esquemaCupos (diaSemana, horario, estado, dniInstructor, cupo) VALUES (?, ?, ?, ?, ?)",
      [diaSemana, horario, estado, dniInstructor, cupo]
    );
    if (typeof diaSemana !== 'number') {
      return res.status(400).json({ error: "El día de la semana debe ser un número" });
    }
    // Devuelve el nuevo esquema creado sin idEsquema, ya que es auto-incremental
    res.status(201).json({
      diaSemana,
      horario,
      estado,
      dniInstructor,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const actualizarEsquemaCupos = async (req, res) => {
  try {
    const { idEsquema } = req.params;
    const { dniInstructor, estado, cupo, horario } = req.body; 
    const [result] = await pool.query(
      "UPDATE esquemaCupos SET dniInstructor = ?, estado = ?, cupo = ?, horario = ? WHERE idEsquema = ?",
      [dniInstructor, estado, cupo, horario, idEsquema]  
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cupo no encontrado." });
    }
    res.json({ message: "Cupo actualizado.", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const eliminarEsquemaCupos = async (req, res) => {
  try {
    const { idEsquema } = req.params;
    const [result] = await pool.query(
      "DELETE FROM esquemaCupos WHERE idEsquema = ?",
      [idEsquema]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cupo no encontrado." });
    }

    res.json({ message: "Cupo eliminado." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
