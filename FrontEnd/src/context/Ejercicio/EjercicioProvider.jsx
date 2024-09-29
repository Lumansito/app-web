import { ExerciseContext } from "./EjercicioContext";
import {
  getEjercicios,
  createEjercicioRequest,
  deleteEjercicioRequest,
  updateEjercicioRequest
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

const EjercicioProvider = ({ children }) => {
  //proveedor para acceder a los datos de los empleados desde cualquier componente
  const [ejercicios, setEjercicios] = useState([]);

  async function loadEjercicios() {
    const response = await getEjercicios();
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

  const deleteEjercicio = async (codEjercicio) => {
    try {
      await deleteEjercicioRequest(codEjercicio);
      loadEjercicios();
    } catch (error) {}
  };

  const createEjercicio = async (values) => {
    try {
      await createEjercicioRequest(values);
      loadEjercicios();
    } catch (error) {
      console.log(error);
    }
  };

  const getEjercicio = async (id) => {
    try {
      /* const response = await getPersonaByIdRequest(dni, rol);
        return response.data;*/
    } catch (error) {
      console.log(error);
    }
  };

  const updateEjercicio = async (codEjercicio, values) => {
    try {
      await updateEjercicioRequest(codEjercicio, values);
      loadEjercicios();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ExerciseContext.Provider
      value={{ ejercicios, loadEjercicios, createEjercicio, deleteEjercicio , updateEjercicio}}
    >
      {children}
    </ExerciseContext.Provider>
  );
};

export default EjercicioProvider;
