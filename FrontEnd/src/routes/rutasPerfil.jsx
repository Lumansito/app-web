import { Routes, Route } from "react-router-dom";
import ProveedorUsuario, { useUsuario } from "../context/Usuario/proveedorUsuario.jsx";
import { Perfil } from "../pages/Perfil/perfil.jsx";
//import { CambiarContrasena } from "../pages/Perfil/CambiarContrasena.jsx"; // Página para cambiar contraseña
//<Route path="/perfil/cambiar-contrasena" element={<CambiarContrasena />} />

export function RutasPerfil() {
  
  const { rol } = useUsuario(); 

  return (
    <ProveedorUsuario>
      <Routes>
        <Route path="/" element={<Perfil />} />
        <Route path="/*" element={<h1>Not Found</h1>} />
      </Routes>
    </ProveedorUsuario>
  );
}