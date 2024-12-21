import { Routes, Route } from "react-router-dom";
import ProveedorUsuario, { useUsuario } from "../context/Usuario/ProveedorUsuario.jsx";
import { Perfil } from "../pages/Perfil/perfil.jsx";
import { Validacion } from "Validacion.jsx";

export function RutasPerfil() {
  
  const { rol, comprobarToken } = useUsuario(); 
  comprobarToken();
  return (
    <ProveedorUsuario>
      <Validacion esperado={alguno}>
      <Routes>
        <Route path="/" element={<Perfil />} />
        <Route path="/*" element={<h1>Not Found</h1>} />
      </Routes>
      </Validacion>
    </ProveedorUsuario>
  );
}