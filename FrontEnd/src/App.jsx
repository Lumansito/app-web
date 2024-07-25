
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { EjerciciosRoutes } from "./routes/ejercicios.routes";
import {Rutina} from "./pages/Rutina";



function App() {
  return (
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rutina" element={<Rutina/>} />
      <Route path="/ejercicios/*" element={<EjerciciosRoutes/>} />
    </Routes> 
  )
}
export default App
