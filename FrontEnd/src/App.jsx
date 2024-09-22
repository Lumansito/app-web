import { Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { EjerciciosRoutes } from "./routes/ejercicios.routes";
import { RutinasRoutes } from "./routes/rutinas.routes";
import { SeguimientosRoutes } from "./routes/seguimientos.routes";
import { CuposRoutes } from "./routes/cupos.routes";
import { ClasesRoutes } from "./routes/clases.routes";

import UsuarioProvider from "./context/Usuario/UsuarioProvider";
import { Asistencia } from "./pages/Asistencia";

function App() {
  return (
    <UsuarioProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/confirmar-asistencia" element={<Asistencia />} />
        <Route path="/seguimiento/*" element={<SeguimientosRoutes />} />
        <Route path="/ejercicios/*" element={<EjerciciosRoutes />} />
        <Route path="/rutinas/*" element={<RutinasRoutes />}/>
        <Route path="/cupos/*" element={<CuposRoutes />} />
        <Route path="/clases/*" element={<ClasesRoutes />} />
        <Route path="*" element={<h1>Not Found</h1>} />
       
      </Routes>
    </UsuarioProvider>
  );
}
export default App;

