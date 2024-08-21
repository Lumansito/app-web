import React, { useState } from 'react';
import { LogIn } from './LogIn';

export function Home() {
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);
 
    const handleLogin = (role) => {
        setUserRole(role);
    };

    return (
        <div>
            <h1>Inicie sesión!</h1>
            {!userRole ? (
                <LogIn onLogin={handleLogin} />
            ) : (
                <div>
                    <h2>Bienvenido, {userRole}!</h2>
                    {/* Aquí podrías renderizar diferentes componentes basados en el rol */}
                    {userRole === 'instructor' && <p>Componente para instructores</p>}
                    {userRole === 'user' }
                </div>
            )}
        </div>
    );
}