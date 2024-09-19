import { SeguimientoContext } from "./SeguimientoContext.jsx";
import React, { useContext, useState } from 'react';

import { usuariosConMembresia } from "../../api/usuarios.api.js";
import {getSeguimientos, getSeguimientoByid, updateSeguimiento, createSeguimiento, deleteSeguimiento} from "../../api/seguimientos.api.js";
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
    const [seguimiento, setSeguimiento] = useState({});


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

    async function loadSeguimiento(idSeguimiento) {
        const response = await getSeguimientoByid(idSeguimiento);
        setSeguimiento(response.data);
        let dni = response.data.dniCliente;
        let codEjercicio = response.data.codEjercicio;
        let c = await loadCliente(dni);
        let e = await loadEjercicio(codEjercicio);
        setCliente(c);
        setEjercicio(e);
    }

    async function updateSeguimientoId(id, param) {
        const response = await updateSeguimiento(id, param);
        if(response.data.message && response.data.message === "Seguimiento actualizado"){
            return true;
        }
        else{
            return false;
        }
    }
    async function newSeguimiento(param, dni, codEjercicio) {
        const seguimiento={
            dniCliente: dni,
            codEjercicio: codEjercicio,
            peso: param.peso,
            repeticiones: param.repeticiones
        }
        const response = await createSeguimiento(seguimiento);
       
        if(response.data.message && response.data.message === "Seguimiento creado"){
            return true;
        }
        else{
            return false;
        }
    }

    async function borrarSeguimiento(idSeguimiento) {
        
        const response = await deleteSeguimiento(idSeguimiento);
        await loadSeguimientos(cliente.dni, ejercicio.codEjercicio);
        if(response.data.message && response.data.message === "Seguimiento eliminado"){
            return true;
        }
        else{
            return false;
        }
    }

    return (
        <SeguimientoContext.Provider
            value={{borrarSeguimiento,newSeguimiento,updateSeguimientoId,seguimiento,loadSeguimiento,loadClientesSeguimiento, clientes, loadSeguimientos, seguimientos,setSeguimientos, loadEjercicios, ejercicios,setEjercicio,setCliente, cliente, loadCliente, ejercicio, loadEjercicio}}
        >
            {children}
        </SeguimientoContext.Provider>
    );
};

export default SeguimientoProvider;
