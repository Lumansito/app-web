import {ContextoUsuario} from "./ContextoUsuario.jsx";
import {iniciarSesionAPI} from '../../api/usuarios.api.js';
import {useContext, useEffect, useState} from 'react';
import {jwtDecode} from "jwt-decode"

export const useUsuario = () => {
    const context = useContext(ContextoUsuario);
    if (!context) {
        throw new Error(
            "useEjercicios debe estar dentro del proveedor UsuariosProvider"
        );
    }
    return context;
};

const ProveedorUsuario = ({children}) => {
    //proveedor para acceder a los datos de los empleados desde cualquier componente

    const [rol, setRol] = useState([]);
    const [dni, setDni] = useState();


    useEffect(() => {
        comprobarToken();
    }, []);

    async function iniciarSesion(usuario) {
        const response = await iniciarSesionAPI(usuario);
        const token = response.data.token;
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        setRol(decoded.rol);
        setDni(decoded.dni);
    }


    function comprobarToken() {

        if (localStorage.getItem('token')) {
            try {
                const decoded = jwtDecode(localStorage.getItem('token'));
                if (decoded.exp < Date.now() / 1000) {
                    console.error('Token expired');
                    localStorage.removeItem('token');
                } else {
                    setRol(decoded.rol);
                    setDni(decoded.dni);
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                localStorage.removeItem('token');
            }
        } else {
            setRol([]);
            setDni();
        }
    }

    async function cerrarSesion() {
        localStorage.removeItem('token');
        setRol([]);
        setDni();
    }


    return (
        <ContextoUsuario.Provider
            value={{rol, setRol, iniciarSesion, comprobarToken, dni, cerrarSesion}}>
            {children}
        </ContextoUsuario.Provider>
    );
};

export default ProveedorUsuario;