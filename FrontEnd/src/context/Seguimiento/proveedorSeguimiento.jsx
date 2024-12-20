import { ContextoSeguimiento } from "./contextoSeguimiento.jsx";
import React, { useContext, useState } from "react";

import { usuariosConMembresiaAPI } from "../../api/usuarios.api.js";
import {
  obtenerSeguimientosXdni_codEjercicioAPI,
  obtenerSeguimientosXdniAPI,
  actualizarSeguimientoXidAPI,
  crearSeguimientoAPI,
  eliminarSeguimientoAPI,
} from "../../api/seguimientos.api.js";
import {
  obtenerEjerciciosAPI,
  obtenerEjerciciosXcodigoEjAPI,
} from "../../api/ejercicios.api.js";
import { obtenerClienteXdniAPI } from "../../api/usuarios.api.js";

export const useSeguimiento = () => {
  const context = useContext(ContextoSeguimiento);
  if (!context) {
    throw new Error(
      "useSeguimiento debe estar dentro del proveedor ProveedorSeguimiento"
    );
  }
  return context;
};

const ProveedorSeguimiento = ({ children }) => {
  const [seguimientos, asignarSeguimientos] = useState([]);
  const [clientes, asignarClientes] = useState([]);
  const [cliente, asignarCliente] = useState({});
  const [ejercicio, asignarEjercicio] = useState({});
  const [ejercicios, asignarEjercicios] = useState([]);
  const [seguimiento, asignarSeguimiento] = useState({});

  const cargarSeguimientoClientes = async () => {
    try {
      const { data } = await usuariosConMembresiaAPI(3);
      asignarClientes(data);
      return { correcto: true };
    } catch (error) {
      return { error };
    }
  };

  const cargarEjercicios = async () => {
    try {
      const { data } = await obtenerEjerciciosAPI();
      asignarEjercicios(data);
      return { correcto: true };
    } catch (error) {
      return { error };
    }
  };

  const cargarSeguimientosXdni_codEjercicio = async (dni, codEjercicio) => {
    try {
      const { data, status } = await obtenerSeguimientosXdni_codEjercicioAPI(
        dni,
        codEjercicio
      );
      asignarSeguimientos(status === 200 ? data : []);
      return { correcto: true };
    } catch (error) {
      return { error };
    }
  };

  const cargarClienteXdni = async (dni) => {
    try {
      const { data } = await obtenerClienteXdniAPI(dni);
      asignarCliente(data);
      return { correcto: true };
    } catch (error) {
      return { error };
    }
  };

  const cargarEjercicio = async (codEjercicio) => {
    try {
      const { data } = await obtenerEjerciciosXcodigoEjAPI(codEjercicio);
      asignarEjercicio(data);
      return { correcto: true };
    } catch (error) {
      return { error };
    }
  };

  const cargarSeguimiento = async (idSeguimiento) => {
    try {
      const { data } = await obtenerSeguimientosXdniAPI(idSeguimiento);
      asignarSeguimiento(data);
      await cargarClienteXdni(data.dniCliente);
      await cargarEjercicio(data.codEjercicio);
      return { correcto: true };
    } catch (error) {
      return { error };
    }
  };

  const actualizarSeguimientoXid = async (id, param) => {
    try {
      const { data } = await actualizarSeguimientoXidAPI(id, param);
      return data.message === "Seguimiento actualizado"
        ? { correcto: true }
        : { error: data.message };
    } catch (error) {
      return { error };
    }
  };

  const nuevoSeguimiento = async (param, dni, codEjercicio) => {
    try {
      const seguimiento = {
        dniCliente: dni,
        codEjercicio: codEjercicio,
        peso: param.peso,
        repeticiones: param.repeticiones,
      };
      const { data } = await crearSeguimientoAPI(seguimiento);
      return data.message === "Seguimiento creado"
        ? { correcto: true }
        : { error: data.message };
    } catch (error) {
      return { error };
    }
  };

  const borrarSeguimiento = async (idSeguimiento) => {
    try {
      const { data } = await eliminarSeguimientoAPI(idSeguimiento);
      await cargarSeguimientosXdni_codEjercicio(
        cliente.dni,
        ejercicio.codEjercicio
      );
      return data.message === "Seguimiento eliminado"
        ? { correcto: true }
        : { error: data.message };
    } catch (error) {
      return { error };
    }
  };

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
        cargarEjercicio,
      }}
    >
      {children}
    </ContextoSeguimiento.Provider>
  );
};

export default ProveedorSeguimiento;
