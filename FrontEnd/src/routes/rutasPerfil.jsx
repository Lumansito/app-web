import { Routes, Route } from "react-router-dom";
import { Perfil } from "../pages/Perfil/perfil.jsx";
import {Validacion} from "./Validacion.jsx";

export function RutasPerfil() {
  
  return (
    
      <Validacion esperado={"alguno"}>
      <Routes>
        <Route path="/" element={<Perfil />} />
        <Route path="/*" element={<h1>Not Found</h1>} />
      </Routes>
      </Validacion>
    
  );
}