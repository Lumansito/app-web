import { Routes, Route } from "react-router-dom";
import UsuarioProvider, { useUsuario } from "../context/Usuario/UsuarioProvider.jsx";
import { Perfil } from "../pages/Perfil/Perfil.jsx";
//import { CambiarContrasena } from "../pages/Perfil/CambiarContrasena.jsx"; // Página para cambiar contraseña
//<Route path="/perfil/cambiar-contrasena" element={<CambiarContrasena />} />

export function PerfilRoutes() {
  const { rol } = useUsuario(); 

  return (
    <UsuarioProvider>
      <Routes>
        <Route path="/" element={<Perfil />} />
        <Route path="/*" element={<h1>Not Found</h1>} />
      </Routes>
    </UsuarioProvider>
  );
}