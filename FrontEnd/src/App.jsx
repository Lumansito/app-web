import { Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { EjerciciosRoutes } from "./routes/ejercicios.routes";
import { RutinasRoutes } from "./routes/rutinas.routes";
import { SeguimientosRoutes } from "./routes/seguimientos.routes";
import { CuposRoutes } from "./routes/cuposOtorgado.routes";

import UsuarioProvider from "./context/Usuario/UsuarioProvider";

function App() {
  return (
    <UsuarioProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seguimiento/*" element={<SeguimientosRoutes />} />
        <Route path="/ejercicios/*" element={<EjerciciosRoutes />} />
        <Route path="/rutinas/*" element={<RutinasRoutes />}/>
        <Route path="/cuposOtorgados/*" element={<CuposRoutes />} />
       
      </Routes>
    </UsuarioProvider>
  );
}
export default App;

