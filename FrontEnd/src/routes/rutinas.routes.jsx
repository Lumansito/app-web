import { Routes, Route, Link } from "react-router-dom";

import { useUsuario } from "../context/Usuario/UsuarioProvider.jsx";

import RutinasProvider from "../context/Rutinas/RutinasProvider.jsx";
import EjercicioProvider from "../context/Ejercicio/EjercicioProvider.jsx";
import { ListadoSolicitudes } from "../pages/Rutina/ListadoSolicitudes.jsx";
import { FormRutinaSolicitud } from "../pages/Rutina/FormRutinaSolicitud.jsx";

export function RutinasRoutes() {
  const { rol } = useUsuario();

  return (
    <RutinasProvider>
      <Routes>
        <Route
          path="/solicitudes"
          element={
            <ProfesionalElement rol={rol}>
              <ListadoSolicitudes />
            </ProfesionalElement>
          }
        />
        <Route
          path="/solicitudes/:idSolicitud"
          element={
            <EjercicioProvider>
              <ProfesionalElement rol={rol}>
                <FormRutinaSolicitud />
              </ProfesionalElement>
            </EjercicioProvider>
          }
        />
        <Route path="/" element={<h1>1</h1> /*<ListadoRutinas /> */} />
        <Route path="/new" element={<h1>1</h1>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </RutinasProvider>
  );
}

function ProfesionalElement({ rol, children }) {
  //se crea esta fun para rebotar a todos aquellos que no sean profesionales
  if (rol.includes(2)) {
    return <>{children}</>;
  } else {
    return (
      <div>
        <h1>No tienes permisos para ver esta página</h1>
        <Link to="/">Home</Link>
      </div>
    );
  }
}
