import { AsistenciaContext } from "./AsistenciaContext";
import React, { useContext, useState } from "react";

import { getConfirmacionAsitencia } from "../../api/asistencia.api";

export const useAsistencia = () => {
  const context = useContext(AsistenciaContext);
  if (!context) {
    throw new Error(
      "useAsistencia debe estar dentro del proveedor AsistenciaProvider"
    );
  }
  return context;
};

const AsistenciaProvider = ({ children }) => {
  const confirmAsistencia = async (dni) => {
    try {
      const response = await getConfirmacionAsitencia(dni);
      if (response.status === 200) {
        return { success: response };
      } else {
        return { error: response };
      }
    } catch (error) {
      return false;
    }
  };

  /**
         * const response = await postClase(clase);

      if (response.status === 200) {
        return { success: response };
      } else {
        return { error: response };
      }
         */

  return (
    <AsistenciaContext.Provider value={{ confirmAsistencia }}>
      {children}
    </AsistenciaContext.Provider>
  );
};

export default AsistenciaProvider;
