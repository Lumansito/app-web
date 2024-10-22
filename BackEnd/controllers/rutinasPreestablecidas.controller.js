import e from "cors";
import {pool} from "../bd.js";

export const obtenerRutinaPreestablecidaXsexo_nroDias = async (req, res) => {

  try{
    const { sexo, nrodias } = req.params;
    const [result] = await pool.query("SELECT lrp.* , ej.nombre FROM rutinas_pre_establecidas rp  inner join lineas_rutina_pre_establecida lrp on rp.sexo = lrp.sexo and rp.nroDias = lrp.nroDias inner join ejercicios ej on lrp.codEjercicio = ej.codEjercicio WHERE rp.sexo = ? and rp.nroDias = ? order by orden", [sexo, nrodias]);
    if (result.length === 0) {
      return res.status(404).json({message: "no hay rutinas pre establecidas cargadas."});
    }else{
      res.json(result);
    }
  } catch (error){
    console.log(error);
  }
};

export const obtenerRutinasPreestablecidas = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM rutinas_pre_establecidas");
    if (result.length === 0) {
      return res.status(404).json({ message: "No hay rutinas pre establecidas cargadas" });
    } else {
      res.json(result);
    }
  }
  catch (error) {
    console.log(error);
  }
};

export const actualizarRutinasPreestablecidas = async (req, res) => {
  
    const lineas = req.body;
    let variables = "";
  
    //se supone que en la implementacion del front nos viene asi el json
    /*
    [
  {
    "idRutinaPre": "1",
    "dia":"1",
    "codEjercicio": "1",
    "series": 4,
    "repeticiones": 12
  },
  {
    "idRutinaPre": "1",
    "dia":"1",
    "codEjercicio": "2",
    "series": 3,
    "repeticiones": 15
  }
] */
    for (let i = 0; i < lineas.length; i++) {
      variables += `("${lineas[i].IdRutinaPre}", ${lineas[i].dia},${i}, ${lineas[i].codEjercicio}, ${lineas[i].series}, ${lineas[i].repeticiones}),`;
    }
    variables = variables.slice(0, -1);
    const queryInsert= `INSERT INTO lineas_rutina_pre_establecida (idRutinaPre ,dia, orden, codEjercicio, series, repeticiones) VALUES ${variables}`;
    const queryDelete = `DELETE FROM lineas_rutina_pre_establecida WHERE idRutinaPre = "${lineas[0].IdRutinaPre}"`;

    let connection;

  try {  //generamos una transaccion para que se hagan todas las operaciones o ninguna para evitar inconsistencias
    connection = await pool.getConnection();
    await connection.beginTransaction();

    await connection.query(queryDelete);
    await connection.query(queryInsert);

    await connection.commit();
    res.json({ message: "Lineas de rutina pre establecida actualizadas correctamente." });
  } catch (error) {
    if (connection) await connection.rollback();
    res.status(500).json({ message: error.message });
  } finally {
    if (connection) connection.release();
  }
  
};