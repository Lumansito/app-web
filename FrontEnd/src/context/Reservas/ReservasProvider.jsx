import { ReservasContext } from "./ReservasContext.jsx";
import React, { useContext, useState } from "react";

export const useEjercicios = () => {
  const context = useContext(ReservasContext);
  if (!context) {
    throw new Error(
      "useReservas debe estar dentro del proveedor ReservasProvider"
    );
  }
  return context;
};

const ReservasProvider = ({ children }) => {
  return (
    <ReservasContext.Provider value={{}}>{children}</ReservasContext.Provider>
  );
};

export default ReservasProvider;
