import { SeguimientoContext } from "./SeguimientoContext.jsx";
import React, { useContext, useState } from 'react';

import { usuariosConMembresia } from "../../api/usuarios.api.js";
import {getSeguimientos} from "../../api/seguimientos.api.js";
import {getEjercicios, getEjercicio} from "../../api/ejercicios.api.js";
import {getCliente} from "../../api/usuarios.api.js";

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
    const [cliente, setCliente] = useState({});
    const [ejercicio, setEjercicio] = useState({});

    const [ejercicios, setEjercicios] = useState([]);
    


    async function loadClientesSeguimiento() {
        const response = await usuariosConMembresia(3); //suponemos que el cod de membresia 3 es el que habilita tener seguimientos
        setClientes(response.data);
    }

    async function loadEjercicios() {
        const response = await getEjercicios();
        
        setEjercicios(response.data);
    }

    async function loadSeguimientos(dni, codEjercicio) {
        const response = await getSeguimientos(dni,codEjercicio);
        if(response){
            setSeguimientos(response.data);
        }else{
            setSeguimientos([]);
        }
    }

    async function loadCliente(dni) {
        const response = await getCliente(dni);
        setCliente(response.data);
    }

    async function loadEjercicio(codEjercicio) {
        const response = await getEjercicio(codEjercicio);
        setEjercicio(response.data);
    }



    return (
        <SeguimientoContext.Provider
            value={{loadClientesSeguimiento, clientes, loadSeguimientos, seguimientos,setSeguimientos, loadEjercicios, ejercicios,setEjercicio,setCliente, cliente, loadCliente, ejercicio, loadEjercicio}}
        >
            {children}
        </SeguimientoContext.Provider>
    );
};

export default SeguimientoProvider;
