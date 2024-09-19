import { Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { EjerciciosRoutes } from "./routes/ejercicios.routes";
import { RutinasRoutes } from "./routes/rutinas.routes";
import { SeguimientosRoutes } from "./routes/seguimientos.routes";
import { CuposRoutes } from "./routes/cupos.routes";
import { ReservasRoutes } from "./routes/reservas.routes";

import UsuarioProvider from "./context/Usuario/UsuarioProvider";

function App() {
  return (
    <UsuarioProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seguimiento/*" element={<SeguimientosRoutes />} />
        <Route path="/ejercicios/*" element={<EjerciciosRoutes />} />
        <Route path="/rutinas/*" element={<RutinasRoutes />}/>
        <Route path="/cupos/*" element={<CuposRoutes />} />
        <Route path="/reservas/*" element={<ReservasRoutes />} />
        <Route path="*" element={<h1>Not Found</h1>} />
       
      </Routes>
    </UsuarioProvider>
  );
}
export default App;

