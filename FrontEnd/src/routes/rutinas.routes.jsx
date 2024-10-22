import { Routes, Route, Link } from "react-router-dom";

import { useUsuario } from "../context/Usuario/proveedorUsuario.jsx";

import ProveedorRutinas from "../context/Rutinas/proveedorRutinas.jsx";
import ProveedorEjercicio from "../context/Ejercicio/proveedorEjercicio.jsx";
import { ListadoSolicitudes } from "../pages/Rutina/ListadoSolicitudes.jsx";
import { FormRutinaSolicitud } from "../pages/Rutina/FormRutinaSolicitud.jsx";
import { Validation } from "./validation.jsx";

export function RutinasRoutes() {
  const { rol } = useUsuario();

  return (
    <ProveedorRutinas>
      <Routes>
        <Route
          path="/solicitudes"
          element={
            <Validation rol={rol} esperado={2}>
              <ListadoSolicitudes />
            </Validation>
          }
        />
        <Route
          path="/solicitudes/:idSolicitud"
          element={
            <ProveedorEjercicio>
              <Validation rol={rol} esperado={2}>
                <FormRutinaSolicitud />
              </Validation>
            </ProveedorEjercicio>
          }
        />
        <Route path="/" element={<h1>1</h1> /*<ListadoRutinas /> */} />
        <Route path="/new" element={<h1>1</h1>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </ProveedorRutinas>
  );
}
