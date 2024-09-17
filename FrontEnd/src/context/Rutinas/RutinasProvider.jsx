import { RutinasContext } from "./RutinasContext.jsx";
import React, { useContext, useState } from "react";

import {
  getSolicitudes,
  getSolicitud,
  uploadRutinaApi,
} from "../../api/rutinas.api.js";

import { useUsuario } from "../Usuario/UsuarioProvider.jsx";

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
  const { dni } = useUsuario();
  // Función de ejemplo para mostrar un mensaje en la consola
  const [solicitudes, setSolicitudes] = useState([]);
  const [solicitud, setSolicitud] = useState(null);
  const [diasRutina, setDiasRutina] = useState([
    { dia: 1, lineas: [] },
    // Agrega más días si es necesario
  ]);
  const [indice, setIndice] = useState(1);

  async function loadSolicitudes() {
    const response = await getSolicitudes();
    setSolicitudes(response.data);
  }
  async function loadSolicitud(id) {
    const response = await getSolicitud(id);
    setSolicitud(response.data);
  }

  const updateLineaRutina = (dia, idLinea, nuevaLinea) => {
    setDiasRutina((prevDiasRutina) => {
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
  const uploadRutina = async () => {
    console.log(diasRutina);
    console.log(solicitud);
    let response = await uploadRutinaApi(solicitud.idRutina, diasRutina, dni);
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
    <RutinasContext.Provider
      value={{
        loadSolicitudes,
        solicitudes,
        loadSolicitud,
        solicitud,
        indice,
        setIndice,
        updateLineaRutina,
        diasRutina,
        setDiasRutina,
        uploadRutina,
        comprobarLineasRutina,
      }}
    >
      {children}
    </RutinasContext.Provider>
  );
};

export default RutinasProvider;
