import {Route, Routes} from "react-router-dom";
import ProveedorAsistencia from "../context/Asitencia/proveedorAsistencia.jsx";

import {Asistencia} from "../pages/asistencia.jsx";

export function rutasAsistencia() {
    return (
        <ProveedorAsistencia>
            <Routes>
                <Route path="/" element={<asistencia/>}/>

            </Routes>
        </ProveedorAsistencia>
    );
}
