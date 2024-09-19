import { Route, Routes } from "react-router-dom";
import CuposListPage from "../pages/Cupos/cuposList";
import CupoDetailPage from "../pages/Cupos/cupoDetails";
import CupoProvider from "../context/Cupo/CupoProvider";

export function CuposRoutes() {
  return (
    <CupoProvider>
      <Routes>
        <Route path="/lista" element={<CuposListPage />} />
        <Route path="/:id" element={<CupoDetailPage />} />
      </Routes>
    </CupoProvider>
  );
}