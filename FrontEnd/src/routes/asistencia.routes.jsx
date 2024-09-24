import { Route, Routes } from "react-router-dom";
import AsistenciaProvider from "../context/Asitencia/AsistenciaProvider";

import { Asistencia } from "../pages/Asistencia";

export function AsistenciaRoutes() {
  return (
    <AsistenciaProvider>
      <Routes>
        <Route path="/" element={<Asistencia />} />
        
      </Routes>
    </AsistenciaProvider>
  );
}
