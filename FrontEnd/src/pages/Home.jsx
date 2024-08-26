import React, { useEffect, useState } from 'react';
import { LogIn } from './LogIn';
import { useUsuario } from '../context/Usuario/UsuarioProvider';
import { jwtDecode } from "jwt-decode"




export function Home() {

    const {setRol, rol} = useUsuario();
    useEffect(() => {
        if (localStorage.getItem('token')){
        setRol(jwtDecode(localStorage.getItem('token')).rol)
        }
    }, []);

    useEffect(() => {
        console.log(rol)
    }, [rol]);

    return (
        <div>
            {rol.length ==0 ? (
                <LogIn />
            ) : (
                <div>
                    <h2>Bienvenido, {rol}!</h2>
                    {/* Aquí podrías renderizar diferentes componentes basados en el rol */}
                    {rol.map((rol) => (
                        <div key={rol}>
                            <h3>{rol}</h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}