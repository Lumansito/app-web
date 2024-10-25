import { ContextoRutinas } from "./ContextoRutinas.jsx";
import  { useContext, useState } from "react";

import {
  obtenerSolicitudesRutinasAPI,
  obtenerSolicitudRutinaXidRutinaAPI,
  actualizarRutinaAPI,
} from "../../api/rutinas.api.js";

import { useUsuario } from "../Usuario/ProveedorUsuario.jsx";

export const useRutinas = () => {
  const context = useContext(ContextoRutinas);
  if (!context) {
    throw new Error(
      "useRutinas debe estar dentro del proveedor ProveedorRutinas"
    );
  }
  return context;
};

const ProveedorRutinas = ({ children }) => {
  const { dni } = useUsuario();
  // Función de ejemplo para mostrar un mensaje en la consola
  const [solicitudes, setSolicitudes] = useState([]);
  const [solicitud, setSolicitud] = useState(null);
  const [diasRutina, asignarDiasRutina] = useState([
    { dia: 1, lineas: [] },
    // Agrega más días si es necesario
  ]);
  const [indice, asignarIndice] = useState(1);

  async function cargarSolicitudes() {
    const response = await obtenerSolicitudesRutinasAPI();
    setSolicitudes(response.data);
  }
  async function cargarSolicitudXid(id) {
    const response = await obtenerSolicitudRutinaXidRutinaAPI(id);
    setSolicitud(response.data);
  }

  const actualizarLineaRutina = (dia, idLinea, nuevaLinea) => {
    asignarDiasRutina((prevDiasRutina) => {
      return prevDiasRutina.map((diaRutina) => {
        if (diaRutina.dia === dia) {
          // Actualizar la línea dentro del día específico
          const nuevasLineas = diaRutina.lineas.map((linea) =>
            linea.id === idLinea ? nuevaLinea : linea
          );
          return { ...diaRutina, lineas: nuevasLineas };
        }
        return diaRutina;
      });
    });
    console.log(diasRutina);
  };
  const actualizarRutina = async () => {
    console.log(diasRutina);
    console.log(solicitud);
    let response = await actualizarRutinaAPI(solicitud.idRutina, diasRutina, dni);
    if (response.data.message && response.data.message === "Correcto") {
      return true;
    } else {
      return false;
    }
  };

  const comprobarLineasRutina = () => {
    // Encuentra el primer día con líneas inválidas
    const diaInvalido = diasRutina.find((dia) =>
      dia.lineas.some(
        (linea) =>
          linea.codEjercicio == "" || linea.series == 0 || linea.rep == 0
      )
    );
    
    // Retorna el día si se encontró un error, o null si todos son válidos
    return diaInvalido ? diaInvalido.dia : null;
  };

  return (
    <ContextoRutinas.Provider
      value={{
        cargarSolicitudes,
        solicitudes,
        cargarSolicitudXid,
        solicitud,
        indice,
         asignarIndice,
        actualizarLineaRutina,
        diasRutina,
        asignarDiasRutina,
        actualizarRutina,
        comprobarLineasRutina,
      }}
    >
      {children}
    </ContextoRutinas.Provider>
  );
};

export default ProveedorRutinas;
