import React, { useState } from 'react';
import {Rol_logIn, createUser} from '../api/usuarios.api';


export function LogIn({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {

        let usuario = {
            dni: username,
            contrasenia: password
        }
        const response = await Rol_logIn(usuario);
        const rol = response.data.tipoUsuario;
        
        
        // Simular la autenticación y obtener el rol del usuario
        // En una app real, harías una petición al backend aquí

        //const userRole = 'admin'; // Este rol vendría del backend

        // Guardar el rol en localStorage (opcional)
        localStorage.setItem('userRole', rol);

        // Llamar a la función onLogin con el rol
        onLogin(rol);
    };

    return (
        <div>
                     <h1>Inicie sesión!</h1>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Log In</button>
        </div>
    );
}