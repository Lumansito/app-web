import { Routes, Route } from 'react-router-dom';

import  ClasesProvider  from '../context/Clases/ClasesProvider';

import { ListClases } from '../pages/Clases/ListClases';


export function ClasesRoutes() {
  return (
    <ClasesProvider>
      <Routes>
        <Route path="/" element={<ListClases/>} />
      </Routes>
    </ClasesProvider>
  );
}
