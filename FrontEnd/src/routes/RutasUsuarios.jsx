import {Routes, Route} from 'react-router-dom';

import {ListadoUsuarios} from '../pages/Usuarios/ListadoUsuarios.jsx';

import ProveedorUsuarios from '../context/Usuarios/proveedorUsuarios.jsx';
import { Validacion } from 'Validacion.jsx';
import { useUsuario } from '../context/Usuario/ProveedorUsuario.jsx';


export function RutasUsuarios() {

    const {rol, comprobarToken} = useUsuario();
    comprobarToken();
    return (
        <ProveedorUsuarios>
            <Validacion rol={rol} esperado={3}>
            <Routes>
                <Route path="/" element={<ListadoUsuarios/>}/>
            </Routes>
            </Validacion>
            
        </ProveedorUsuarios>
    );
}
