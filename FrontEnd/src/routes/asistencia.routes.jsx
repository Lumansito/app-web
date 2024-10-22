import { Route, Routes } from "react-router-dom";
import ProveedorAsistencia from "../context/Asitencia/proveedorAsistencia.jsx";

import { Asistencia } from "../pages/Asistencia";

export function AsistenciaRoutes() {
  return (
    <ProveedorAsistencia>
      <Routes>
        <Route path="/" element={<Asistencia />} />
        
      </Routes>
    </ProveedorAsistencia>
  );
}
