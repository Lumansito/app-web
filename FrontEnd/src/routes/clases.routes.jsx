import { Routes, Route } from "react-router-dom";

import ProveedorClases from "../context/Clases/proveedorClases.jsx";
import { useUsuario } from "../context/Usuario/proveedorUsuario.jsx";

import { ListClases } from "../pages/Clases/ListClases";
import { ConfirmClases } from "../pages/Clases/ConfirmClases";

import { Validation } from "./validation";

export function ClasesRoutes() {
  const { rol } = useUsuario();

  return (
    <ProveedorClases>
      <Validation rol={rol} esperado={1}>
        <Routes>
          <Route path="/" element={<ListClases />} />
          <Route path="/:idClase" element={<ConfirmClases />} />
        </Routes>
      </Validation>
    </ProveedorClases>
  );
}
