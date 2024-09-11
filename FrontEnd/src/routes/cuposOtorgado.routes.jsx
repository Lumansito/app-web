import React from "react";
import { Route, Routes } from "react-router-dom";
import CuposListPage from "../pages/Cupos/cuposList"; 
import CupoDetailPage from "../pages/Cupos/cupoDetails"; 

export function CuposRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CuposListPage />} />
      <Route path="/:id" element={<CupoDetailPage />} />
    </Routes>
  );
}

