
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { EjerciciosRoutes } from "./routes/ejercicios.routes";
import {Rutina} from "./pages/Rutina";
import { MenuPorfesional } from "./pages/MenuProfesional";



function App() {
  return (
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<MenuPorfesional/>} />
      <Route path="/rutina" element={<Rutina/>} />
      <Route path="/rutina/preestablecida" element={<Rutina />} />
      <Route path="/ejercicios/*" element={<EjerciciosRoutes/>} />
    </Routes> 
  )
}
export default App
