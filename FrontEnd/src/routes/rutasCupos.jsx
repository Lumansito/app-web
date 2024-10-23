import { Route, Routes } from "react-router-dom";
import ListaCupos from "../pages/Cupos/listaCupos.jsx";
import FormularioCupos from "../pages/Cupos/formularioCupos.jsx";
import FormularioEditarCupo from "../pages/Cupos/formularioEditar.jsx";
import DetalleCupo from "../pages/Cupos/detalleCupo.jsx";
import ProveedorCupo from "../context/Cupo/proveedorCupo.jsx";

export function rutasCupos() {
  return (
    <ProveedorCupo>
      <Routes>
        <Route path="/lista" element={<ListaCupos />} />
        <Route path="/:id" element={<DetalleCupo />} />
        <Route path="/new/:diaSemana" element={<FormularioCupos />} />
        <Route path="/edit/:idEsquema" element={<FormularioEditarCupo />} />
      </Routes>
    </ProveedorCupo>
  );
}
