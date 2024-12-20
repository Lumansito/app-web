import {pool} from "../bd.js";

export const obtenerRutinaPreestablecidaXsexo_nroDias = async (req, res, next) => {

  try{
    const { sexo, nrodias } = req.params;
    const [result] = await pool.query(
      `
      SELECT lineas_rutina_pre_establecida.*, ejercicios.nombre 
      FROM rutinas_pre_establecidas 
      INNER JOIN lineas_rutina_pre_establecida 
      ON rutinas_pre_establecidas.sexo = lineas_rutina_pre_establecida.sexo 
      AND rutinas_pre_establecidas.nroDias = lineas_rutina_pre_establecida.nroDias 
      INNER JOIN ejercicios 
      ON lineas_rutina_pre_establecida.codEjercicio = ejercicios.codEjercicio 
      WHERE rutinas_pre_establecidas.sexo = ? 
      AND rutinas_pre_establecidas.nroDias = ? 
      ORDER BY lineas_rutina_pre_establecida.orden
      `
      , [sexo, nrodias]);
    if (result.length === 0) {
      return res.status(404).json({message: "no hay rutinas pre establecidas cargadas."});
    }else{
      res.json(result);
    }
  } catch (error){
    next(error);
  }
};

export const obtenerRutinasPreestablecidas = async (req, res, next) => {
  try {
    const [result] = await pool.query("SELECT * FROM rutinas_pre_establecidas");
    if (result.length === 0) {
      return res.status(404).json({ message: "No hay rutinas pre establecidas cargadas" });
    } else {
      res.json(result);
    }
  }
  catch (error) {
    next(error);
  }
};

export const actualizarRutinasPreestablecidas = async (req, res, next) => {
  
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
    
    next(error);
  } finally {
    if (connection) connection.release();
  }
  
};