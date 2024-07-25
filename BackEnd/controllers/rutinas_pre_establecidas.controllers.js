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
    const [result] = await pool.query("INSERT INTO lineas_rutina_pre_establecida (sexo, nroDias, orden, codEjercicio, series, repeticiones) VALUES (?, ?, ?, ?, ?, ?)", [req.body.sexo, req.body.nroDias, req.body.orden, req.body.codEjercicio, req.body.series, req.body.repeticiones]);
    if (result.affectedRows === 0) {
      return res.status(404).json({message:"no se encuentra la linea de rutina pre establecida."});
    } res.json({message:"linea de rutina pre establecida actualizada correctamente."});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};