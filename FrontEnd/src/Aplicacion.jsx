import { Route, Routes } from "react-router-dom";
import { PaginaPrincipal } from "./pages/PaginaPrincipal.jsx";
import { RutasEjercicios } from "./routes/RutasEjercicios.jsx";
import { RutasRutinas } from "./routes/RutasRutinas.jsx";
import { RutasSeguimientos } from "./routes/RutasSeguimientos.jsx";
import { RutasCupos } from "./routes/RutasCupos.jsx";
import { RutasClases } from "./routes/RutasClases.jsx";
import { RutasPerfil } from "./routes/RutasPerfil.jsx";
import ProveedorUsuario from "./context/Usuario/ProveedorUsuario.jsx";
import {RutasAsistencia} from "./routes/RutasAsistencia.jsx";
import {RutasUsuarios} from "./routes/RutasUsuarios.jsx";
import { Toaster } from "react-hot-toast";

function Aplicacion() {
  return (
    <ProveedorUsuario>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/asistencia/*" element={<RutasAsistencia />} />
        <Route path="/seguimiento/*" element={<RutasSeguimientos />} />
        <Route path="/ejercicios/*" element={<RutasEjercicios />} />
        <Route path="/rutinas/*" element={<RutasRutinas />}/>
        <Route path="/cupos/*" element={<RutasCupos />} />
        <Route path="/clases/*" element={<RutasClases />} />
        <Route path="/perfil/*" element={<RutasPerfil/>} />
        <Route path="/usuarios/*" element={<RutasUsuarios/>} />
        <Route path="*" element={<h1>Not Found</h1>} />
       
      </Routes>
    </ProveedorUsuario>
  );
}
export default Aplicacion;

