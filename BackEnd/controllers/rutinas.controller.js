import { pool } from "../bd.js";
import { TZDate } from "@date-fns/tz";
import { format} from 'date-fns';
// usuario agrega un comentario a una rutina personalizada
export const crearSolicitudRutinas = async (req, res, next) => {
  try {
    const { dni } = req.params;
    const { peticion } = req.body;

    const fechaActual = new Date();
    const fechaZonaHoraria = new TZDate(fechaActual, zonaHoraria);
    const fecha = format(fechaZonaHoraria, 'yyyy-MM-dd');


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
    next(error);
  }
};
//se supone que en la implementacion del front nos viene asi el json
/*
{dia: 1, lineas: Array(1)},
{dia: 2, lineas: Array(0)},
{dia: 3, lineas: Array(0)}
 */

// administrador cree o modifique una rutina personalizada
export const actualizarRutina = async (req, res, next) => {
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
    next(error);
  } finally {
    if (connection) connection.release();
  }
  
};

// obtener las rutinas personalizadas de un usuario
export const obtenerRutinaXdni = async (req, res, next) => {
  try {
    const { dniCliente } = req.params;

    const [result] = await pool.query(
    `
      SELECT rutinas.*, lineas_rutina.*, ejercicios.nombre, comentarios_rutinas.peticion 
      FROM rutinas 
      INNER JOIN lineas_rutina ON rutinas.id = lineas_rutina.rutinaId 
      INNER JOIN ejercicios ON lineas_rutina.codEjercicio = ejercicios.codEjercicio 
      LEFT JOIN comentarios_rutinas ON rutinas.id = comentarios_rutinas.rutinaId 
      WHERE rutinas.dniCliente = ? 
      ORDER BY lineas_rutina.dia, lineas_rutina.orden
    `,
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
    next(error);
  }
};

export const obtenerSolicitudRutinas = async (req, res, next) => {
  try {
    const [result] = await pool.query(
      `
      SELECT rutinas.*, usuarios.nombre, usuarios.apellido 
      FROM rutinas 
      INNER JOIN usuarios ON rutinas.dniCliente = usuarios.dni 
      WHERE rutinas.fechaCarga IS NULL
      `
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const obtenerRutinaXid = async (req, res, next) => {
  try {
    const { idRutina } = req.params;

    const [result] = await pool.query(
      `
      SELECT rutinas.*, usuarios.nombre, usuarios.apellido 
      FROM rutinas 
      INNER JOIN usuarios ON rutinas.dniCliente = usuarios.dni 
      WHERE rutinas.idRutina = ?`
      ,[idRutina]
    );

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontró la rutina solicitada." });
    } else {
      res.json(result[0]);
    }
  } catch (error) {
    next(error);
  }
};
