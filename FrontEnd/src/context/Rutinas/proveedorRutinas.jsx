import { ContextoRutinas } from "./ContextoRutinas.jsx";
import { useContext, useState } from "react";

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

  const cargarSolicitudes = async () => {
    try {
      const { data } = await obtenerSolicitudesRutinasAPI();
      setSolicitudes(data);
      return { correcto: true };
    } catch (error) {
      return { error };
    }
  };

  const cargarSolicitudXid = async (id) => {
    try {
      const { data } = await obtenerSolicitudRutinaXidRutinaAPI(id);
      if(data.fechaCarga !== null){
        return { error: 
          "No se ha cargado la rutina, por favor, espere a que el instructor la cargue"
         };
      }
      setSolicitud(data);
      return { correcto: true };
    } catch (error) {
      return { error };
    }
  };

  const actualizarLineaRutina = (dia, idLinea, nuevaLinea) => {
    asignarDiasRutina((prevDiasRutina) => {
      return prevDiasRutina.map((diaRutina) => {
        if (diaRutina.dia === dia) {
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
    try {
      const response = await actualizarRutinaAPI(
        solicitud.idRutina,
        diasRutina,
        dni
      );
      if (response.data.message === "Correcto") {
        return { correcto: true };
      } else {
        return { error: response.data.message };
      }
    } catch (error) {
      return { error };
    }
  };

  const comprobarLineasRutina = () => {
    const diaInvalido = diasRutina.find((dia) =>
      dia.lineas.some(
        (linea) =>
          linea.codEjercicio == "" || linea.series == 0 || linea.rep == 0
      )
    );
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
