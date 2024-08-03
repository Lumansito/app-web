import {pool} from "../bd.js";

export const getRutinas_pre_establecidasBySexoNroDias = async (req, res) => {

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

export const updateRutinas_pre_establecidas = async (req, res) => {
  try {
    const lineas = req.body;
    let variables = "";
  
    //se supone que en la implementacion del front nos viene asi el json
    /*
    [
  {
    "sexo": "m",
    "nroDias": 3,
    "dia":"1",
    "codEjercicio": "1",
    "series": 4,
    "repeticiones": 12
  },
  {
    "sexo": "m",
    "nroDias": 3,
    "dia":"1",
    "codEjercicio": "2",
    "series": 3,
    "repeticiones": 15
  }
] */
    for (let i = 0; i < lineas.length; i++) {
      variables += `("${lineas[i].sexo}", ${lineas[i].nroDias}, ${lineas[i].dia},${i}, ${lineas[i].codEjercicio}, ${lineas[i].series}, ${lineas[i].repeticiones}),`;
    }
    variables = variables.slice(0, -1);
    const query= `INSERT INTO lineas_rutina_pre_establecida (sexo, nroDias,dia, orden, codEjercicio, series, repeticiones) VALUES ${variables}`;
    console.log(query);
    const [result] = await pool.query(query);
    if (result.affectedRows === 0) {
      return res.status(404).json({message:"no se encuentra la linea de rutina pre establecida."});
    } res.json({message:"linea de rutina pre establecida actualizada correctamente."});
     
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};