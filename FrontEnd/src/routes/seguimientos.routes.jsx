import { Routes, Route } from "react-router-dom";
import  SeguimientoProvider  from "../context/Seguimiento/SeguimientoProvider.jsx";

export function SeguimientosRoutes() {
  return (
    <SeguimientoProvider>
      <Routes>
        <Route path="/" element={<h1>Seguimientos</h1>} />
      </Routes>
    </SeguimientoProvider>
  );
}


