import { useState } from 'react';
import { useUsuario } from '../context/Usuario/ProveedorUsuario.jsx';
import toast from 'react-hot-toast';

export function InicioSesion() {
    const { iniciarSesion } = useUsuario();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        let usuario = {
            dni: username,
            contrasenia: password
        }
        try {
            await iniciarSesion(usuario);
            toast.success("Inicio de sesión exitoso");
          } catch (error) {
            toast.error(error); 
        }
        
    };

    return (
        <div className='flex flex-col h-screen items-center justify-center'>       
            <h1 className='text-2xl mb-4'>Inicie sesión!</h1>
    
            <input className='m-2 p-2 border rounded'
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input className='m-2 p-2 border rounded'
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className='m-2 p-2 bg-blue-500 text-white rounded' onClick={handleLogin}>
                Log In
            </button>
        </div>
    );
}