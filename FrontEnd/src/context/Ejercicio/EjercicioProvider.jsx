import { ExerciseContext } from "./EjercicioContext";
import {getEjercicios} from '../../api/ejercicios.api.js';
import React, { useContext, useState } from 'react';





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
        setEjercicios(response.data);
    }
  
    const deleteEjercicio = async (id) => {
      try {
        if (!window.confirm("¿Estás seguro de eliminar el ejercicio?")) {
          return;
        }
        /*
        await deletePersonaRequest(dni, rol);
        setPersonas(personas.filter((Persona) => Persona.dni !== dni && Persona.rol !== rol));
        */
      } catch (error) {
        alert("Error al eliminar Ejercicio");
        console.log(error);
      }
    };
  
    const createEjercicio = async(values) =>{
      try {
        /*
        const response = await createPersonaRequest(values);
        console.log(response);
        */
        
      } catch (error) {
        console.log(error);
      }
    }
  
    
    const getEjercicio = async (id) => {
      try {
        /* const response = await getPersonaByIdRequest(dni, rol);
        return response.data;*/
        
      } catch (error) {
        console.log(error);
      }
    };
  
    const updateEjercicio = async (id) => {
      try {
        /*
        await updatePersonaRequest(id, Persona);
        */
      } catch (error) {
        console.log(error);
      }
    };
    
    return (
      <ExerciseContext.Provider
        value={{ ejercicios, loadEjercicios}}>
        {children}
      </ExerciseContext.Provider>
    );
  };
  
export default EjercicioProvider;