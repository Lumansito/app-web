import { ExerciseContext } from "./contextoEjercicio.jsx";
import {
  obtenerEjerciciosAPI,
  crearEjercicioAPI,
  eliminarEjercicioAPI,
  actualizarEjercicioAPI,
} from "../../api/ejercicios.api.js";

import { useContext, useState } from "react";

export const useEjercicios = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error(
      "useEjercicios debe estar dentro del proveedor EmpleadoProvider"
    );
  }
  return context;
};

const ProveedorEjercicio = ({ children }) => {
  const [ejercicios, setEjercicios] = useState([]);

  const cargarEjercicios = async () => {
    try {
      const { data: ejerciciosData } = await obtenerEjerciciosAPI();
      const data = ejerciciosData
        .map((ejercicio) =>
          ejercicio.estado === "activo" ? { ...ejercicio } : null
        )
        .filter((ejercicio) => ejercicio !== null);
      setEjercicios(data);
      return { correcto: true };
    } catch (error) {
      return { error };
    }
  };

  const eliminarEjercicio = async (codEjercicio) => {
    try {
      await eliminarEjercicioAPI(codEjercicio);
      await cargarEjercicios();
      return { correcto: true };
    } catch (error) {
      return { error };
    }
  };

  const crearEjercicio = async (values) => {
    try {
      await crearEjercicioAPI(values);
      await cargarEjercicios();
      return { correcto: true };
    } catch (error) {
      return { error };
    }
  };

  const actualizarEjercicio = async (codEjercicio, values) => {
    try {
      await actualizarEjercicioAPI(codEjercicio, values);
      await cargarEjercicios();
      return { correcto: true };
    } catch (error) {
      return { error };
    }
  };

  return (
    <ExerciseContext.Provider
      value={{
        ejercicios,
        cargarEjercicios,
        crearEjercicio,
        eliminarEjercicio,
        actualizarEjercicio,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};

export default ProveedorEjercicio;
