import { SeguimientoContext } from "./SeguimientoContext.jsx";
import React, { useContext, useState } from 'react';
import { usuariosConMembresia } from "../../api/usuarios.api.js";

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
    const [seguimientos, setSeguimientos] = useState([]);
    const [clientes, setClientes] = useState([]);

    


    async function loadClientesSeguimiento() {
        const response = await usuariosConMembresia(3); //suponemos que el cod de membresia 3 es el que habilita tener seguimientos
        setClientes(response.data);
    }

    return (
        <SeguimientoContext.Provider
            value={{loadClientesSeguimiento, clientes}}
        >
            {children}
        </SeguimientoContext.Provider>
    );
};

export default SeguimientoProvider;
