import { Routes, Route } from 'react-router-dom';
import { ListadoEjercicios } from '../pages/listadoEjercicios';
import  EjercicioProvider  from '../context/Ejercicio/EjercicioProvider';


export function EjerciciosRoutes() {
  return (
    <EjercicioProvider>
      <Routes>
        <Route path="/" element={<ListadoEjercicios />} />
      </Routes>
    </EjercicioProvider>
  );
}
