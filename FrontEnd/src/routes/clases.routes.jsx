import { Routes, Route } from "react-router-dom";

import ClasesProvider from "../context/Clases/ClasesProvider";
import { useUsuario } from "../context/Usuario/UsuarioProvider";

import { ListClases } from "../pages/Clases/ListClases";
import { ConfirmClases } from "../pages/Clases/ConfirmClases";

import { Validation } from "./validation";

export function ClasesRoutes() {
  const { rol } = useUsuario();

  return (
    <ClasesProvider>
      <Validation rol={rol} esperado={1}>
        <Routes>
          <Route path="/" element={<ListClases />} />
          <Route path="/:idClase" element={<ConfirmClases />} />
        </Routes>
      </Validation>
    </ClasesProvider>
  );
}
