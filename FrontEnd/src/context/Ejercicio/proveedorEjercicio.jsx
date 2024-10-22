import { ExerciseContext } from "./contextoEjercicio.jsx";
import {
  obtenerEjerciciosAPI,
  crearEjercicioAPI,
  eliminarEjercicioAPI,
  actualizarEjercicioAPI
} from "../../api/ejercicios.api.js";

import React, { useContext, useState } from "react";

export const useEjercicios = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error(
      "useEEjercicios debe estar dentro del proveedor EmpleadoProvider"
    );
  }
  return context;
};

const ProveedorEjercicio = ({ children }) => {
  //proveedor para acceder a los datos de los empleados desde cualquier componente
  const [ejercicios, setEjercicios] = useState([]);

  async function cargarEjercicio() {
    const response = await obtenerEjerciciosAPI();
    let data = response.data;
    data = data
      .map((ejercicio) => {
        if (ejercicio.estado === "activo") {
          return {
            ...ejercicio,
          };
        }
        return null;
      })
      .filter((ejercicio) => ejercicio !== null);

    setEjercicios(data);
  }

  const eliminarEjercicio = async (codEjercicio) => {
    try {
      await eliminarEjercicioAPI(codEjercicio);
      cargarEjercicio();
    } catch (error) {}
  };

  const crearEjercicio = async (values) => {
    try {
      await crearEjercicioAPI(values);
      cargarEjercicio();
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerEjercicioXid = async (id) => {
    try {
      /* const response = await getPersonaByIdRequest(dni, rol);
        return response.data;*/
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarEjercicio = async (codEjercicio, values) => {
    try {
      await actualizarEjercicioAPI(codEjercicio, values);
      cargarEjercicio();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ExerciseContext.Provider
      value={{ ejercicios, cargarEjercicio, crearEjercicio, eliminarEjercicio, actualizarEjercicio}}
    >
      {children}
    </ExerciseContext.Provider>
  );
};

export default ProveedorEjercicio;
