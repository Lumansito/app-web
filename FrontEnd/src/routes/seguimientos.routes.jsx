import { Routes, Route } from "react-router-dom";
import SeguimientoProvider from "../context/Seguimiento/SeguimientoProvider.jsx";
import { useUsuario } from "../context/Usuario/UsuarioProvider.jsx";
import {ListadoClientesSeguimiento} from "../pages/listadoClientesSeguimiento";



export function SeguimientosRoutes() {
  const { rol } = useUsuario();

  return (
    <SeguimientoProvider>
      <ProfesionalElement rol={rol}>
        <Routes>
          <Route path="/" element={<ListadoClientesSeguimiento/>} />
          <Route
            path="/dni/:dni"
            element={
              <h1>
                Seguimientos Ordenados Por Ejercicio para un determiando dni
              </h1>
            }
          />
        </Routes>
      </ProfesionalElement>
    </SeguimientoProvider>
  );
}

function ProfesionalElement({ rol, children }) {  //se crea esta fun para rebotar a todos aquellos que no sean profesionales
  if (rol.includes(2)) {
    return <>{children}</>;
  } else {
    return <h1>No tienes permisos para ver esta página</h1>;
  }
}

