import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useClases } from "../../context/Clases/ClasesProvider";
import { Clase } from "../../components/Clase";

export const ConfirmClases = () => {
  const { clase, loadClase, reservarClase } = useClases();

  const params = useParams();
  const { idClase } = params;



  useEffect(() => {
    loadClase(idClase);
  }, [idClase]);

  useEffect(() => {
    if (clase) {
      console.log(clase);
    }
  }
    , [clase]);
  const handleConfirm = async () => {
    
    reservarClase(clase.dniInstructor, clase.horario);
  };


  return <>{clase ? <Clase clase={clase} /> : <p>Cargando...</p>}
  
    <button  onClick={handleConfirm}>Confirmar Asistencia</button>
  </>;

};
