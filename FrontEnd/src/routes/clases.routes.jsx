import { Routes, Route } from 'react-router-dom';

import  ClasesProvider  from '../context/Clases/ClasesProvider';

import { ListClases } from '../pages/Clases/ListClases';
import { ConfirmClases } from '../pages/Clases/ConfirmClases';


export function ClasesRoutes() {
  return (
    <ClasesProvider>
      <Routes>
        <Route path="/" element={<ListClases/>} />
        <Route path="/:idClase" element={<ConfirmClases/>} />
      </Routes>
    </ClasesProvider>
  );
}
