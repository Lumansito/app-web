
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { EjerciciosRoutes } from "./routes/ejercicios.routes";



function App() {
  return (
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ejercicios/*" element={<EjerciciosRoutes/>} > </Route>
    </Routes> 
  )
}
export default App
