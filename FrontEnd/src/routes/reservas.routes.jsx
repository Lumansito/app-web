import { Routes, Route } from 'react-router-dom';

import  ReservasProvider  from '../context/Reservas/ReservasProvider';


export function ReservasRoutes() {
  return (
    <ReservasProvider>
      <Routes>
        <Route path="/" element={<h1> a </h1>} />
      </Routes>
    </ReservasProvider>
  );
}
