import React from "react";
import { Route, Routes } from "react-router-dom";
import CuposHome from "../pages/Cupos/cuposList"; 
import CupoDetail from "../pages/Cupos/cupoDetails"; 

function CuposRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CuposHome />} />
      <Route path="/:id" element={<CupoDetail />} />
    </Routes>
  );
}

export { CuposRoutes };