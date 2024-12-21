import { ContextoCupo } from "./ContextoCupo.jsx";
import {
  obtenerEsquemaCuposAPI,
  obtenerEsquemaCuposXfechaAPI,
  obtenerEsquemaCuposHoyAPI,
  obtenerCuposOcupadosXidEsquemaAPI,
  crearEsquemaCuposAPI,
  actualizarEsquemaCuposAPI,
  eliminarEsquemaCuposAPI,
} from "../../api/esquemasCupos.api.js";
import { useContext, useEffect, useState } from "react";

export const useCupos = () => {
  const context = useContext(ContextoCupo);
  if (!context) {
    throw new Error("useCupos debe estar dentro del proveedor ProveedorCupo");
  }
  return context;
};

const ProveedorCupo = ({ children }) => {
  const [cupos, setCupos] = useState([]);
  const [error, setError] = useState(null);

  const cargarCupos = async () => {
    try {
      const { data: cuposData } = await obtenerEsquemaCuposAPI();
      setCupos(cuposData || []);
      return { correcto: true };
    } catch (error) {
      return { error };
    }
  };

  const cargarCuposHoy = async () => {
    try {
      const { data: cuposHoy } = await obtenerEsquemaCuposHoyAPI();
      setCupos(cuposHoy || []);
      return { correcto: true };
    } catch (error) {
      return { error };
    }
  };

  const cargarCuposXfecha = async (diaSemana) => {
    try {
      const { data: cupoFecha } = await obtenerEsquemaCuposXfechaAPI(diaSemana);
      return cupoFecha || [];
    } catch (error) {
      return { error };
    }
  };

  const cargarCupoXid = async (idEsquema) => {
    try {
      const { data: cupoId } = await obtenerCuposOcupadosXidEsquemaAPI(
        idEsquema
      );
      return cupoId || 0;
    } catch (error) {
      return { error };
    }
  };

  const crearCupo = async (cupo) => {
    try {
      const respuesta = await crearEsquemaCuposAPI(cupo);
      if(respuesta.status !== 200){
        return { error: respuesta };
      }
      const { data: nuevoCupo } = respuesta;
      setCupos((prev) => [...prev, nuevoCupo]);
      return { correcto: true };
    } catch (error) {
      return { error };
    }
  };

  const actualizarCupo = async (idEsquema, cupo) => {
    try {
      const { data: cupoActualizado } = await actualizarEsquemaCuposAPI(
        idEsquema,
        cupo
      );
      setCupos((prev) =>
        prev.map((existingCupo) =>
          existingCupo.idEsquema === idEsquema
            ? { ...existingCupo, ...cupoActualizado }
            : existingCupo
        )
      );
      return { correcto: true };
    } catch (error) {
      return { error };
    }
  };

  const eliminarCupo = async (idEsquema) => {
    try {
      await eliminarEsquemaCuposAPI(idEsquema);
      setCupos((prev) => prev.filter((cupo) => cupo.idEsquema !== idEsquema));
      return { correcto: true };
    } catch (error) {
      return { error };
    }
  };

  useEffect(() => {
    cargarCupos();
  }, []);

  return (
    <ContextoCupo.Provider
      value={{
        cupos,
        setCupos,
        cargarCupos,
        cargarCuposHoy,
        eliminarCupo,
        crearCupo,
        cargarCuposXfecha,
        cargarCupoXid,
        actualizarCupo,
        error,
      }}
    >
      {children}
    </ContextoCupo.Provider>
  );
};

export default ProveedorCupo;
