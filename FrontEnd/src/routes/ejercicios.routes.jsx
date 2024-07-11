import { Routes, Route } from 'react-router-dom';
import { ListadoEjercicios } from '../pages/listadoEjercicios';


export function EjerciciosRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ListadoEjercicios />} />
      
    </Routes>
  );
}