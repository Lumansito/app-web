import { ClasesContext } from "./ClasesContext.jsx";
import { useUsuario } from "../Usuario/UsuarioProvider.jsx";
import React, { useContext, useState } from "react";
import {
  getClasesToday,
  getCuposOcupados,
  getClase,
  getCupoClase,
  postClase,
} from "../../api/clases.api";

export const useClases = () => {
  const context = useContext(ClasesContext);
  if (!context) {
    throw new Error("useClases debe estar dentro del proveedor ClasesProvider");
  }
  return context;
};

const ClasesProvider = ({ children }) => {
  const { dni, comprobarToken } = useUsuario();

  const [clases, setClases] = useState([]);
  const [clase, setClase] = useState(null);

  async function getCuposForClases(arrayClases) {
    let clasesConCupos = [];
    if (!arrayClases || arrayClases.length === 0) {
      return clasesConCupos;
    }
    try {
      const response = await getCuposOcupados();
      const cuposOcupados = response.data;

      clasesConCupos = arrayClases.map((clase) => {
        const cupoEncontrado = cuposOcupados.find(
          (cupo) => cupo.horaInicio === clase.horario
        );

        return {
          ...clase,
          cuposOcupados: cupoEncontrado ? cupoEncontrado.reservas : 0,
        };
      });
    } catch (error) {
      console.error("Error obteniendo los cupos:", error);
      clasesConCupos = arrayClases.map((clase) => ({
        ...clase,
        cuposOcupados: 0,
      }));
    }
    return clasesConCupos;
  }

  const loadClases = async () => {
    try {
      const response = await getClasesToday();
      const clasesAr = response.data;
      const clasesConCupos = await getCuposForClases(clasesAr);

      setClases(clasesConCupos);
    } catch (error) {
      console.error("Error al cargar las clases:", error);
    }
  };

  const loadClase = async (idClase) => {
    try {
      const { data: claseCarga } = await getClase(idClase);
      const { data: cupo } = await getCupoClase(idClase);

      setClase({ ...claseCarga, cuposOcupados: cupo || 0 });
    } catch (error) {
      console.error("Error al cargar la clase:", error);
    }
  };

  const reservarClase = async (dniInstructor, horaInicio) => {
    try {
      comprobarToken();
      const clase = {
        dniCliente: dni,
        dniInstructor,
        horaInicio,
      };

      const response = await postClase(clase);

      if (response.status === 200) {
        return { success: response };
      } else {
        return { error: response };
      }
    } catch (error) {
      console.error("Error al reservar la clase:", error);
      return "Error al reservar la clase";
    }
    
  };

  return (
    <ClasesContext.Provider
      value={{ clases, loadClases, loadClase, clase, reservarClase }}
    >
      {children}
    </ClasesContext.Provider>
  );
};

export default ClasesProvider;
