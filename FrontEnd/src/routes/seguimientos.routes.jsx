import { Routes, Route , Link} from "react-router-dom";
import ProveedorSeguimiento from "../context/Seguimiento/proveedorSeguimiento.jsx";
import { useUsuario } from "../context/Usuario/proveedorUsuario.jsx";
import {ListadoClientesSeguimiento} from "../pages/Seguimiento/listadoClientesSeguimiento";
import {FormSeguimiento} from "../pages/Seguimiento/FormSeguimiento";
import { Validation } from "./validation.jsx";

export function SeguimientosRoutes() {
  const { rol } = useUsuario();

  return (
    <ProveedorSeguimiento>
      <Validation rol={rol} esperado={2}>
        <Routes>
        <Route path="/edit/:idSeguimiento" element={<FormSeguimiento/>} />
        <Route path="/new/:dni/:codEjercicio" element={<FormSeguimiento/>} /> 
        <Route path="/lista/:dni/:codEjercicio" element={<ListadoClientesSeguimiento/>} />
        <Route path="/lista/:dni" element={<ListadoClientesSeguimiento/>} />
        <Route path="/lista" element={<ListadoClientesSeguimiento/>} />
        <Route path="*" element={<h1>Not Found</h1>} />

          
        </Routes>
      </Validation>
    </ProveedorSeguimiento>
  );
}

