import {Route, Routes} from "react-router-dom";
import ProveedorAsistencia from "../context/Asitencia/proveedorAsistencia.jsx";

import {Asistencia} from "../pages/Asistencia.jsx";

export function RutasAsistencia() {
    return (
        <ProveedorAsistencia>
            <Routes>
                <Route path="/" element={<Asistencia/>}/>
            </Routes>
        </ProveedorAsistencia>
    );
}
