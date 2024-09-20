import { ClasesContext } from "./ClasesContext.jsx";
import React, { useContext, useState } from "react";
import {getClasesToday} from "../../api/clases.api";

export const useClases = () => {
  const context = useContext(ClasesContext);
  if (!context) {
    throw new Error("useClases debe estar dentro del proveedor ClasesProvider");
  }
  return context;
};

const ClasesProvider = ({ children }) => {
  const [clases, setClases] = useState([]);

  const loadClases = async() => {
    const response =   await getClasesToday()
    setClases(response.data)
  };

  return (
    <ClasesContext.Provider value={{ clases, loadClases}}>
      {children}
    </ClasesContext.Provider>
  );
};

export default ClasesProvider;
