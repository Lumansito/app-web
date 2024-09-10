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
                <div className='flex flex-col gap-8 items-center'>
                    <h2>Bienvenido, usuario con dni: {dni}!</h2>
                    <h2>Estos son los roles que tienes</h2>
                    {rol.includes(1) && <h3>Cliente</h3>}
                    {rol.includes(2) && 
                        <div className='flex flex-col gap-4  items-center' >
                            <h3 className='text-gray-600'>Profesional</h3>
                            
                            <Link to="/rutinas/solicitudes" className='bg-rojo-intenso hover:bg-red-900 w-96 rounded p-1'>Solicitudes de Rutina</Link>
                            <Link to="/seguimiento/lista" className='bg-rojo-intenso hover:bg-red-900 w-96 rounded p-1' >Marcas Clientes</Link>
                        </div>
                    } 
                    {rol.includes(3) &&

                     <h3 className='text-gray-600' >Admin</h3>

                     }         
                    <h1 className='text-gray-600'>Opciones</h1>          
                    <Link className='bg-rojo-intenso hover:bg-red-900 w-96 rounded p-1' >Perfil</Link>
                </div>
            )}
        </div>
    );
}