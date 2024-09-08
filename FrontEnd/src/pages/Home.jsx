import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogIn } from './LogIn';
import { useUsuario } from '../context/Usuario/UsuarioProvider';





export function Home() {

    const {rol, comprobarToken, dni} = useUsuario();
    useEffect(() => {
        comprobarToken();
    }, []);

    return (
        <div>
            <h1>Gym</h1>
            
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
                            
                            <Link to="/rutinas/solicitudes">Solicitudes de Rutina</Link>
                            <br />
                            <Link to="/seguimiento/lista">Marcas Clientes</Link>
                        </div>
                    } 
                    {rol.includes(3) && <h3>Admin</h3>}                   
                    <Link>Perfil</Link>
                </div>
            )}
        </div>
    );
}