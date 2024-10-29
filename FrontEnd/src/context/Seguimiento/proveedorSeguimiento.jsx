import {ContextoSeguimiento} from "./contextoSeguimiento.jsx";
import React, {useContext, useState} from 'react';

import {usuariosConMembresiaAPI} from "../../api/usuarios.api.js";
import {
    obtenerSeguimientosXdni_codEjercicioAPI,
    obtenerSeguimientosXdniAPI,
    actualizarSeguimientoXidAPI,
    crearSeguimientoAPI,
    eliminarSeguimientoAPI
} from "../../api/seguimientos.api.js";
import {obtenerEjerciciosAPI, obtenerEjerciciosXcodigoEjAPI} from "../../api/ejercicios.api.js";
import {obtenerClienteXdniAPI} from "../../api/usuarios.api.js";

export const useSeguimiento = () => {
    const context = useContext(ContextoSeguimiento);
    if (!context) {
        throw new Error(
            "useSeguimiento debe estar dentro del proveedor ProveedorSeguimiento"
        );
    }
    return context;
};

const ProveedorSeguimiento = ({children}) => {
    // Función de ejemplo para mostrar un mensaje en la consola
    const [seguimientos, asignarSeguimientos] = useState([]);
    const [clientes, asignarClientes] = useState([]);
    const [cliente, asignarCliente] = useState({});
    const [ejercicio, asignarEjercicio] = useState({});
    const [ejercicios, asignarEjercicios] = useState([]);
    const [seguimiento, asignarSeguimiento] = useState({});


    async function cargarSeguimientoClientes() {
        const response = await usuariosConMembresiaAPI(3); //suponemos que el cod de membresia 3 es el que habilita tener seguimientos
        if(response.data)
            asignarClientes(response.data);
    }

    async function cargarEjercicios() {
        const response = await obtenerEjerciciosAPI();

        asignarEjercicios(response.data);
    }

    async function cargarSeguimientosXdni_codEjercicio(dni, codEjercicio) {
        const response = await obtenerSeguimientosXdni_codEjercicioAPI(dni, codEjercicio);
        if (response) {
            asignarSeguimientos(response.data);
        } else {
            asignarSeguimientos([]);
        }
    }

    async function cargarClienteXdni(dni) {
        const response = await obtenerClienteXdniAPI(dni);
        asignarCliente(response.data);
    }

    async function cargarEjercicio(codEjercicio) {
        const response = await obtenerEjerciciosXcodigoEjAPI(codEjercicio);
        asignarEjercicio(response.data);
    }

    async function cargarSeguimiento(idSeguimiento) {
        const response = await obtenerSeguimientosXdniAPI(idSeguimiento);

        asignarSeguimiento(response.data);

        await cargarClienteXdni(response.data.dniCliente);
        await cargarEjercicio(response.data.codEjercicio);

    }

    async function actualizarSeguimientoXid(id, param) {
        const response = await actualizarSeguimientoXidAPI(id, param);
        if (response.data.message && response.data.message === "Seguimiento actualizado") {
            return true;
        } else {
            return false;
        }
    }

    async function nuevoSeguimiento(param, dni, codEjercicio) {
        const seguimiento = {
            dniCliente: dni,
            codEjercicio: codEjercicio,
            peso: param.peso,
            repeticiones: param.repeticiones
        }
        const response = await crearSeguimientoAPI(seguimiento);

        if (response.data.message && response.data.message === "Seguimiento creado") {
            return true;
        } else {
            return false;
        }
    }

    async function borrarSeguimiento(idSeguimiento) {

        const response = await eliminarSeguimientoAPI(idSeguimiento);
        await cargarSeguimientosXdni_codEjercicio(cliente.dni, ejercicio.codEjercicio);
        if (response.data.message && response.data.message === "Seguimiento eliminado") {
            return true;
        } else {
            return false;
        }
    }

    return (
        <ContextoSeguimiento.Provider
            value={{
                borrarSeguimiento,
                nuevoSeguimiento,
                actualizarSeguimientoXid,
                seguimiento,
                cargarSeguimiento,
                cargarSeguimientoClientes,
                clientes,
                cargarSeguimientosXdni_codEjercicio,
                seguimientos,
                asignarSeguimientos,
                cargarEjercicios,
                ejercicios,
                asignarEjercicio,
                asignarCliente,
                cliente,
                cargarClienteXdni,
                ejercicio,
                cargarEjercicio
            }}
        >
            {children}
        </ContextoSeguimiento.Provider>
    );
};

export default ProveedorSeguimiento;
