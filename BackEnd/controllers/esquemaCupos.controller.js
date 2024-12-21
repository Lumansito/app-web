import { pool } from "../bd.js";
import {getDay} from 'date-fns';

export const obtenerEsquemaCupos = async (req, res, next) => {
  try {
    const [results] = await pool.query("SELECT * FROM esquemaCupos");
    if (results.length === 0) {
      return res.status(404).json({ message: "no hay cupos cargados." });
    } else {
      res.json(results);
    }
  } catch (error) {
    next(error);
  }
};

export const obtenerEsquemaCuposXid = async (req, res, next) => {
  try {
    const { idEsquema } = req.params;
    const [result] = await pool.query(
      "SELECT * FROM esquemaCupos WHERE idEsquema = ?", 
      [idEsquema]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Cupo no encontrado." });
    } else {
      res.json(result[0]); 
    }
  } catch (error) {
    next(error);
  }
};

export const obtenerEsquemaCuposXfecha = async (req, res, next) => {
  try {
    const { diaSemana } = req.params;
    const [result] = await pool.query(
      "SELECT * FROM esquemaCupos WHERE diaSemana = ? ",
      [diaSemana]
    );
    if (result.length === 0) {
      return res.status(404).json({
        message: "No hay cupos cargados en el dia y horario especificado.",
      });
    } else {
      res.json(result[0]);
    }
  } catch (error) {
    next(error);
  }
};

export const obtenerEsquemaCuposXdiaSemana = async (req, res, next) => {
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
    next(error);
  }
};

export const obtenerEsquemaCuposHoy = async (req, res, next) => {
  try {
    const hoy = new Date();
    const diaSemana = getDay(hoy);
    
    const [result] = await pool.query(
      "SELECT * FROM esquemacupos WHERE diaSemana = ? and estado = 'habilitado' and horario >= CURTIME()",
      [diaSemana]
    );
    if (result.length === 0) {
      return res.status(404).json({
        message: "No hay mas clases para el dia de hoy.",
      });
    } else {
      const [cupos] = await pool.query(
        "SELECT horaInicio, count(*) as reservas from cupo_otorgado where fecha = CURDATE() and estado != 'cancelado' group by horaInicio"
      );

      let clases = result.map((clase) => {
        const cupoEncontrado = cupos.find(
          (cupo) => cupo.horaInicio === clase.horario
        );
        return {
          ...clase,
          cuposOcupados: cupoEncontrado ? cupoEncontrado.reservas : 0,
        };
      });
      res.status(200).json(clases);
    }
  } catch (error) {
    next(error);
  }
};

export const crearEsquemaCupos = async (req, res, next) => {
  try {
    const { diaSemana, horario, dniInstructor, cupo } = req.body;
    console.log(req.body);
    const estadoPredeterminado = "habilitado";
    await pool.query(
      "INSERT INTO esquemaCupos (diaSemana, horario, estado, dniInstructor, cupo) VALUES (?, ?, ?, ?, ?)",
      [diaSemana, horario, estadoPredeterminado, dniInstructor, cupo]
    );
    
    if (typeof diaSemana !== "number") {
      return res
        .status(400)
        .json({ error: "El día de la semana debe ser un número" });
    }
    // Devuelve el nuevo esquema creado sin idEsquema, ya que es auto-incremental
    res.status(200).json({
      diaSemana,
      horario,
      estado: estadoPredeterminado,
      dniInstructor,
    });
  } catch (error) {
    next(error);
  }
};

export const actualizarEsquemaCupos = async (req, res, next) => {
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
    next(error);
  }
};

export const actualizarEstadoCupo = async (req, res, next) => {
  try {
    const { idEsquema } = req.params;
    const { estado } = req.body;
    const [result] = await pool.query(
      "UPDATE esquemaCupos SET estado = ? WHERE idEsquema = ?",
      [estado, idEsquema]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cupo no encontrado." });
    }
    res.status(200).json({ message: "Estado del cupo actualizado." });
  } catch (error) {
    next(error);  
  }
};

export const eliminarEsquemaCupos = async (req, res, next) => {
  try {
    const { idEsquema } = req.params;
    const [result] = await pool.query(
      "DELETE FROM esquemaCupos WHERE idEsquema = ?",
      [idEsquema]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cupo no encontrado." });
    }

    res.status(200).json({ message: "Cupo eliminado." });
  } catch (error) {
    next(error);
  }
};
