import { ContextoAsistencia } from "./contextoAsistencia.jsx";
import React, { useContext, useState } from "react";

import { obtenerConfirmacionAsistenciaAPI } from "../../api/asistencia.api";

export const useAsistencia = () => {
  const contexto = useContext(ContextoAsistencia);
  if (!contexto) {
    throw new Error(
      "useAsistencia debe estar dentro del proveedor ProveedorAsistencia"
    );
  }
  return contexto;
};

const ProveedorAsistencia = ({ children }) => {
  const confirmarAsistencia = async (dni) => {
    try {
      const respuesta = await obtenerConfirmacionAsistenciaAPI(dni);
      if (respuesta.status === 200) {
        return { correcto: respuesta };
      } else {
        return { error: respuesta };
      }
    } catch (error) {
      return {error};
    }
  };

  return (
    <ContextoAsistencia.Provider value={{ confirmAsistencia: confirmarAsistencia }}>
      {children}
    </ContextoAsistencia.Provider>
  );
};

export default ProveedorAsistencia;
