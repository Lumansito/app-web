import React, { useState } from 'react';
import { useUsuario } from '../context/Usuario/UsuarioProvider';




export function LogIn() {
    const { login } = useUsuario();


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
   

    const handleLogin = async () => {

        let usuario = {
            dni: username,
            contrasenia: password
        }
        await login(usuario);
        
        
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