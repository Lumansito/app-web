import {Routes, Route} from 'react-router-dom';
import {ListaEjercicios} from '../pages/Ejercicios/listaEjercicios.jsx';
import ProveedorEjercicio from '../context/Ejercicio/proveedorEjercicio.jsx';
import {useUsuario} from '../context/Usuario/ProveedorUsuario.jsx'
import {Validacion} from 'Validacion.jsx';


export function RutasEjercicios() {

    const {rol, comprobarToken} = useUsuario();
    comprobarToken();
    return (
        <ProveedorEjercicio>
            <Validacion rol={rol} esperado={1}>
            <Routes>
                <Route path="/" element={<ListaEjercicios/>}/>
            </Routes>
            </Validacion>
        </ProveedorEjercicio>
    );
}
