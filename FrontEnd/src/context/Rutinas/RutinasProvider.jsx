import { RutinasContext } from "./RutinasContext.jsx";
import React, { useContext, useState } from "react";

import { getSolicitudes, getSolicitud } from "../../api/rutinas.api.js";

export const useRutinas = () => {
  const context = useContext(RutinasContext);
  if (!context) {
    throw new Error(
      "useRutinas debe estar dentro del proveedor RutinasProvider"
    );
  }
  return context;
};

const RutinasProvider = ({ children }) => {
  // Función de ejemplo para mostrar un mensaje en la consola
  const [solicitudes, setSolicitudes] = useState([]);
  const [solicitud, setSolicitud] = useState(null);
  const [lineas, setLineas] = useState([]);


  async function loadSolicitudes() {
    const response = await getSolicitudes();
    setSolicitudes(response.data);
  }
  async function loadSolicitud(id) {
    
    const response = await getSolicitud(id);
    setSolicitud(response.data);
    
    }

    const updateLineaRutina = (index, nuevaLinea) => {
        setLineas((prevLineas) => {
          const nuevasLineas = [...prevLineas];
          nuevasLineas[index] = nuevaLinea;
          return nuevasLineas;
        });
        console.log(lineas)
      };



  return (
    <RutinasContext.Provider value={{ loadSolicitudes, solicitudes, loadSolicitud, solicitud , updateLineaRutina, lineas}}>
      {children}
    </RutinasContext.Provider>
  );
};

export default RutinasProvider;
