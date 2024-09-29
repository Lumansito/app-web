import { Routes, Route } from 'react-router-dom';
import { ListadoEjercicios } from '../pages/listadoEjercicios';
import { ListEjercicios } from '../pages/Ejercicios/ListEjercicios';
import  EjercicioProvider  from '../context/Ejercicio/EjercicioProvider';


export function EjerciciosRoutes() {
  return (
    <EjercicioProvider>
      <Routes>
        <Route path="/" element={<ListEjercicios />} />
      </Routes>
    </EjercicioProvider>
  );
}
