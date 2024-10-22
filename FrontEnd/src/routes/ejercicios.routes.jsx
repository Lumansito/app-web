import { Routes, Route } from 'react-router-dom';
import { ListadoEjercicios } from '../pages/listadoEjercicios';
import { ListEjercicios } from '../pages/Ejercicios/ListEjercicios';
import  ProveedorEjercicio  from '../context/Ejercicio/proveedorEjercicio.jsx';


export function EjerciciosRoutes() {
  return (
    <ProveedorEjercicio>
      <Routes>
        <Route path="/" element={<ListEjercicios />} />
      </Routes>
    </ProveedorEjercicio>
  );
}
