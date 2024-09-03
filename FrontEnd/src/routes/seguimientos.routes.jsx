import { Routes, Route , Link} from "react-router-dom";
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
          <Route path="/:dni" element={<ListadoClientesSeguimiento/>} />
          <Route path="/:dni/:codEjercicio" element={<ListadoClientesSeguimiento/>} />
          
          
        </Routes>
      </ProfesionalElement>
    </SeguimientoProvider>
  );
}

function ProfesionalElement({ rol, children }) {  //se crea esta fun para rebotar a todos aquellos que no sean profesionales
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

