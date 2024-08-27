import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogIn } from './LogIn';
import { useUsuario } from '../context/Usuario/UsuarioProvider';
import { jwtDecode } from "jwt-decode"




export function Home() {

    const {rol, comprobarToken, dni} = useUsuario();
    useEffect(() => {
        comprobarToken();
    }, []);

    return (
        <div>
            {rol.length ==0 ? (
                <LogIn />
            ) : (
                <div>
                    <h2>Bienvenido, usuario con dni: {dni}!</h2>
                    <h2>Estos son los roles que tienes</h2>
                    {rol.includes(1) && <h3>Cliente</h3>}
                    {rol.includes(2) && 
                        <div>
                            <h3>Profesional</h3>
                            <Link>Entrenamientos De Clientes</Link>
                        </div>
                    } 
                    {rol.includes(3) && <h3>Admin</h3>}                   
                    <Link>Perfil</Link>
                </div>
            )}
        </div>
    );
}