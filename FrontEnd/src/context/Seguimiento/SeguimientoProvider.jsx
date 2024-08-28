import { SeguimientoContext } from "./SeguimientoContext.jsx";
import React, { useContext } from 'react';

export const useSeguimiento = () => {
    const context = useContext(SeguimientoContext);
    if (!context) {
        throw new Error(
            "useSeguimiento debe estar dentro del proveedor SeguimientoProvider"
        );
    }
    return context;
};

const SeguimientoProvider = ({ children }) => {
    // Función de ejemplo para mostrar un mensaje en la consola
    const holamundo = () => {
        console.log("Hola Mundo");
    };

    return (
        <SeguimientoContext.Provider
            value={{ holamundo }}
        >
            {children}
        </SeguimientoContext.Provider>
    );
};

export default SeguimientoProvider;
