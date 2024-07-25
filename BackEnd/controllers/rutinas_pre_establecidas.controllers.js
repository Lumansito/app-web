import {pool} from "../bd.js";

export const getRutinas_pre_establecidasByFechaNroDias = async (req, res) => {
  try{
    const { sexo, nrodias } = req.body
    const [result] = await pool.query("SELECT lrp.* , ej.nombre FROM rutinas_pre_establecidas rp  inner join lineas_rutina_pre_establecida lrp on rp.sexo = lrp.sexo and rp.nroDias = lrp.nroDias inner join ejercicios ejon lrp.codEjercicio = ej.codEjercicio WHERE rp.sexo = ? and rp.nroDias = ? order by orden ", [sexo, nrodias]);
    if (result.length === 0) {
      return res.status(404).json({message: "no hay rutinas pre establecidas cargadas."});
    }else{
      res.json(result);
    }
  } catch (error){
    console.log(error);
  }
};
