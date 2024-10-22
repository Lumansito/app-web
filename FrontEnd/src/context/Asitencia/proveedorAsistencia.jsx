import { ContextoAsistencia } from "./contextoAsistencia.jsx";
import React, { useContext, useState } from "react";

import { obtenerConfirmacionAsistenciaAPI } from "../../api/asistencia.api";

export const useAsistencia = () => {
  const context = useContext(ContextoAsistencia);
  if (!context) {
    throw new Error(
      "useAsistencia debe estar dentro del proveedor ProveedorAsistencia"
    );
  }
  return context;
};

const ProveedorAsistencia = ({ children }) => {
  const confirmarAsistencia = async (dni) => {
    try {
      const response = await obtenerConfirmacionAsistenciaAPI(dni);
      if (response.status === 200) {
        return { success: response };
      } else {
        return { error: response };
      }
    } catch (error) {
      return false;
    }
  };


  return (
    <ContextoAsistencia.Provider value={{ confirmAsistencia: confirmarAsistencia }}>
      {children}
    </ContextoAsistencia.Provider>
  );
};

export default ProveedorAsistencia;
