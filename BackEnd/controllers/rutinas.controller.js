import { pool } from "../bd.js";

// usuario agrega un comentario a una rutina personalizada
export const crearSolicitudRutinas = async (req, res) => {
  try {
    const { dni } = req.params;
    const { peticion } = req.body;
    const fecha = new Date().toISOString().split("T")[0];

    const[valido] = await pool.query(
      `
      SELECT condMembresia FROM usuarios WHERE dni = ?`,
      [dni]
    );
    if (valido[0].condMembresia != 3) {
      return res
        .status(400)
        .json({ message: "El usuario no tiene una membresía activa." });
    }

    const [result] = await pool.query(
      "INSERT INTO rutinas (dniCliente, peticion, fechaPeticion) VALUES (?, ?, ?)",
      [dni, peticion, fecha]
    );

    res.json({ message: "Comentario agregado correctamente." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
//se supone que en la implementacion del front nos viene asi el json
/*
{dia: 1, lineas: Array(1)},
{dia: 2, lineas: Array(0)},
{dia: 3, lineas: Array(0)}
 */

// administrador cree o modifique una rutina personalizada
export const actualizarRutina = async (req, res) => {
  const {idRutina } = req.params;


  const dniProf = req.body.dniProf;
  const data = req.body.data; // Array de objetos que representan las líneas de la rutina
  let _lineas = [];
  let variables = "";



  let iteraciones = 0;
  for (let i = 0; i < data.length; i++) {
    iteraciones = data[i].lineas.length + iteraciones;
  }

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].lineas.length; j++) {
      _lineas.push({
        dia: data[i].dia,
        codejercicio: data[i].lineas[j].codejercicio || 0,
        series: data[i].lineas[j].series|| 0,
        repeticiones: data[i].lineas[j].rep || 0,
      });
    }
  }
  


  for (let i = 0; i < iteraciones; i++) {
    variables += `(${idRutina}, ${_lineas[i].dia}, ${i}, ${_lineas[i].codejercicio}, ${_lineas[i].series}, ${_lineas[i].repeticiones}),`;
  }
  variables = variables.slice(0, -1);

  const queryInsert = `INSERT INTO lineas_rutina (idRutina, dia, orden, codEjercicio, series, repeticiones) VALUES ${variables}`;
  const queryDelete = `DELETE FROM lineas_rutina WHERE idRutina = ${idRutina} `;

  const queryInsert2 = `UPDATE rutinas SET fechaCarga = date(now()), dniInstructor = ${dniProf} WHERE idRutina = ${idRutina}`;
  let connection;
  
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    await connection.query(queryDelete);

    await connection.query(queryInsert); 
    await connection.query(queryInsert2);
    

    await connection.commit();
    res.status(200).json({ message: "Correcto" });
  } catch (error) {
    if (connection) await connection.rollback();
    res.status(500).json({ message: error.message });
  } finally {
    if (connection) connection.release();
  }
  
};

// obtener las rutinas personalizadas de un usuario
export const obtenerRutinaXdni = async (req, res) => {
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
      return res
        .status(404)
        .json({
          message:
            "No se encontraron rutinas personalizadas para este usuario.",
        });
    } else {
      res.json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const obtenerSolicitudRutinas = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT r.*, u.nombre, u.apellido FROM rutinas r INNER JOIN usuarios u ON r.dniCliente = u.dni where r.fechaCarga is null"
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const obtenerRutinaXid = async (req, res) => {
  try {
    const { idRutina } = req.params;

    const [result] = await pool.query(
      "SELECT r.*, u.nombre, u.apellido FROM rutinas r INNER JOIN usuarios u ON r.dniCliente = u.dni where r.idRutina = ?",
      [idRutina]
    );

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontró la rutina solicitada." });
    } else {
      res.json(result[0]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
