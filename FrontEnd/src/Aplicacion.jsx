import { Route, Routes } from "react-router-dom";
import { PaginaPrincipal } from "./pages/paginaPrincipal.jsx";
import { rutasEjercicios } from "./routes/rutasEjercicios.jsx";
import { rutasRutinas } from "./routes/rutasRutinas.jsx";
import { rutasSeguimientos } from "./routes/rutasSeguimientos.jsx";
import { rutasCupos } from "./routes/rutasCupos.jsx";
import { rutasClases } from "./routes/rutasClases.jsx";
import { rutasPerfil } from "./routes/rutasPerfil.jsx";
import ProveedorUsuario from "./context/Usuario/proveedorUsuario.jsx";
import { Asistencia } from "./pages/asistencia.jsx";

function Aplicacion() {
  return (
    <ProveedorUsuario>
      <Routes>
        <Route path="/" element={<paginaPrincipal />} />
        <Route path="/confirmar-Asistencia" element={<asistencia />} />
        <Route path="/seguimiento/*" element={<rutasSeguimientos />} />
        <Route path="/ejercicios/*" element={<rutasEjercicios />} />
        <Route path="/rutinas/*" element={<rutasRutinas />}/>
        <Route path="/cupos/*" element={<rutasCupos />} />
        <Route path="/clases/*" element={<rutasClases />} />
        <Route path="/perfil/*" element={<rutasPerfil/>} />
        <Route path="*" element={<h1>Not Found</h1>} />
       
      </Routes>
    </ProveedorUsuario>
  );
}
export default Aplicacion;

