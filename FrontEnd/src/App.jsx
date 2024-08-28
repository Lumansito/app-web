
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { EjerciciosRoutes } from "./routes/ejercicios.routes";
import { SeguimientosRoutes } from "./routes/seguimientos.routes";
import {Rutina} from "./pages/Rutina";
import UsuarioProvider from "./context/Usuario/UsuarioProvider";



function App() {
  return (
    <UsuarioProvider>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/seguimiento/*" element={<SeguimientosRoutes />} />
      <Route path="/rutina" element={<Rutina/>} />
      <Route path="/rutina/preestablecida" element={<Rutina />} />
      <Route path="/ejercicios/*" element={<EjerciciosRoutes/>} />
    </Routes> 
    </UsuarioProvider>
    
  )
}
export default App
