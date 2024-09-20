import { ClasesContext } from "./ClasesContext.jsx";
import React, { useContext, useState } from "react";
import { getClasesToday, getCuposOcupados } from "../../api/clases.api";

export const useClases = () => {
  const context = useContext(ClasesContext);
  if (!context) {
    throw new Error("useClases debe estar dentro del proveedor ClasesProvider");
  }
  return context;
};

const ClasesProvider = ({ children }) => {
  const [clases, setClases] = useState([]);

  const loadClases = async () => {
    const response = await getClasesToday();
    const clases = response.data;
    const a = await getCuposOcupados();
    const cuposOcupados = a.data;
    const clasesConCupos = clases.map((clase) => {
      const cupos = cuposOcupados.find(
        (cupos) => cupos.horaInicio === clase.horario
      );
      return {
        ...clase,
        cuposOcupados: cupos.reservas,
      };
    });

    setClases(clasesConCupos);
  };

  return (
    <ClasesContext.Provider value={{ clases, loadClases }}>
      {children}
    </ClasesContext.Provider>
  );
};

export default ClasesProvider;
