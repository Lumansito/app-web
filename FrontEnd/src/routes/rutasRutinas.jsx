import { Routes, Route, Link } from "react-router-dom";

import { useUsuario } from "../context/Usuario/proveedorUsuario.jsx";

import ProveedorRutinas from "../context/Rutinas/proveedorRutinas.jsx";
import ProveedorEjercicio from "../context/Ejercicio/proveedorEjercicio.jsx";
import { ListadoSolicitudes } from "../pages/Rutina/listadoSolicitudes.jsx";
import { FormularioSolicitudRutina } from "../pages/Rutina/formularioSolicitudRutina.jsx";
import { Validacion } from "./Validacion.jsx";

export function RutasRutinas() {
  const { rol } = useUsuario();

  return (
    <ProveedorRutinas>
      <Routes>
        <Route
          path="/solicitudes"
          element={
            <Validacion rol={rol} esperado={2}>
              <ListadoSolicitudes />
            </Validacion>
          }
        />
        <Route
          path="/solicitudes/:idSolicitud"
          element={
            <ProveedorEjercicio>
              <Validacion rol={rol} esperado={2}>
                <FormularioSolicitudRutina />
              </Validacion>
            </ProveedorEjercicio>
          }
        />
        <Route
          path="/"
          element={
            <h1 className="text-center text-4xl font-bold flex items-center justify-center h-screen">
              EN DESARROLLO
            </h1>
          }
        />
        <Route path="/new" element={<h1>EN DESARROLLO</h1>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </ProveedorRutinas>
  );
}
