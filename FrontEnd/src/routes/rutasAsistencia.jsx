import {Route, Routes} from "react-router-dom";
import ProveedorAsistencia from "../context/Asitencia/ProveedorAsistencia.jsx";

import { Asistencia } from "../pages/asistencia";
import {Validacion} from "./Validacion.jsx";


export function RutasAsistencia() {
    return (
        <ProveedorAsistencia>
            <Validacion esperado={"alguno"}>
            <Routes>
                <Route path="/" element={<Asistencia/>}/>
            </Routes>
            </Validacion>
        </ProveedorAsistencia>
    );
}
