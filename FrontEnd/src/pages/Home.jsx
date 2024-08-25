import React, { useState } from 'react';
import { LogIn } from './LogIn';

export function Home() {
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);
 
    const handleLogin = (role) => {
        setUserRole(role);
    };

    return (
        <div>
            {!userRole ? (
                <LogIn onLogin={handleLogin} />
            ) : (
                <div>

                    <h2>Bienvenido, {userRole}!</h2>
                    {/* Aquí podrías renderizar diferentes componentes basados en el rol */}
                    {userRole === 'instructor' && <h1>Componente para instructores</h1>}
                    {userRole === 'user' }
                </div>
            )}
        </div>
    );
}