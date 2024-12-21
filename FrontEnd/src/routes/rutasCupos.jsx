import { Route, Routes } from "react-router-dom";
import ListaCupos from "../pages/Cupos/listaCupos.jsx";
import FormularioCupos from "../pages/Cupos/formularioCupos.jsx";
import DetalleCupo from "../pages/Cupos/detalleCupo.jsx";
import ProveedorCupo from "../context/Cupo/proveedorCupo.jsx";
import { Validacion } from "Validacion.jsx";
import { useUsuario } from "../context/Usuario/ProveedorUsuario.jsx";

export function RutasCupos() {
  const { rol, comprobarToken } = useUsuario();
  comprobarToken();
  return (
    <ProveedorCupo>
      <Validacion esperado={1} rol={rol}>
        <Routes>
          <Route path="/lista" element={<ListaCupos />} />
          <Route path="/:id" element={<DetalleCupo />} />
          <Route path="/new/:diaSemana" element={<FormularioCupos />} />
          <Route path="/edit/:idEsquema" element={<FormularioCupos />} />
        </Routes>
      </Validacion>
    </ProveedorCupo>
  );
}
