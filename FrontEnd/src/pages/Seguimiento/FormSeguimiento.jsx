import React, { useEffect, useState} from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useSeguimiento } from "../../context/Seguimiento/SeguimientoProvider";

export const FormSeguimiento = () => {
  const [values, setValues] = useState({
    peso: "",
    repeticiones: "",
  });
  
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  
  const { loadSeguimiento, seguimiento, updateSeguimientoId } = useSeguimiento();

  const isEditRoute = location.pathname.includes("/edit");
  const isNewRoute = location.pathname.includes("/new");


  useEffect(() => {
    if (isEditRoute) {
      // Cargar seguimiento si es ruta de edición
      loadSeguimiento(params.idSeguimiento);
    }
  }, []);
  
  useEffect(() => {
    if (isEditRoute && seguimiento) { 
      setValues({
        peso: seguimiento.peso || "",
        repeticiones: seguimiento.repeticiones || "",
      });
    }
  }, [seguimiento]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditRoute) {
      const ok =updateSeguimientoId(params.idSeguimiento, values);
      if(ok){
        alert("Seguimiento actualizado correctamente");
        navigate("/seguimiento/lista");
      }
      
      return;
    }

  };

  return (
    <div>
      <h1>{isNewRoute ? "Nuevo" : "Editar"} Seguimiento</h1>
      <form action="" onSubmit={handleSubmit}>
        <h1>Form</h1>
        <input
          type="text"
          name="peso"
          value={values.peso}
          placeholder="Ingrese el peso"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="repeticiones"
          value={values.repeticiones}
          placeholder="Ingrese las repeticiones"
          onChange={handleInputChange}
        />

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};
