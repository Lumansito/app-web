import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { useRutinas } from "../../context/Rutinas/RutinasProvider";

import { Solicitud } from "../../components/Solicitud";
import { ConjuntoLineas } from "../../components/ConjuntoLineas";

// drag and drop
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    closestCorners,
  } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export const FormRutinaSolicitud = () => {
  const { solicitud, loadSolicitud, diasRutina, setDiasRutina, indice, setIndice, uploadRutina} = useRutinas();
  const [currentPage, setCurrentPage] = useState(0); // Página actual (el día de la rutina que se muestra)

  const navigate = useNavigate();
  const params = useParams();
  const idSolicitud = params.idSolicitud;

  useEffect(() => {
    if (idSolicitud) {
      loadSolicitud(idSolicitud);
    }
  }, [idSolicitud, loadSolicitud]);

  const handleClickButton = () => {
    let ok = uploadRutina(); // Imprimir toda la estructura de diasRutina
    if(ok){
      alert("Rutina subida correctamente");
      setDiasRutina({ dia: 1, lineas: [] });
      navigate("/rutinas/solicitudes");
    }
    else{
      alert("Error al subir la rutina");
    }
  };

  // Añadir una línea al día actual
  const handleAñadirLinea = () => {
    setDiasRutina((prevDiasRutina) => {
      return prevDiasRutina.map((diaRutina, index) => {
        if (index === currentPage) {
          return {
            ...diaRutina,
            lineas: [
              ...diaRutina.lineas,
              { codEjercicio: "", series: "0", rep: "0", id: indice, dia: diaRutina.dia }, // Nueva línea vacía
            ],
          };
        }
        return diaRutina;
      });
    });
    setIndice(indice + 1);
  };

  // Añadir un nuevo día vacío
  const handleAñadirDia = () => {
    setDiasRutina((prevDiasRutina) => [
      ...prevDiasRutina,
      { dia: prevDiasRutina.length + 1, lineas: [] } // Nuevo día con líneas vacías
    ]);
    setCurrentPage(diasRutina.length); // Mostrar el nuevo día
  };

  const handleEliminarDia = () => {
    if (diasRutina.length === 1) {
      return; // No se puede eliminar el último día
    }
    if (currentPage === diasRutina.length - 1) {
      setCurrentPage(currentPage - 1); // Mostrar el día anterior
      setDiasRutina(diasRutina.slice(0, -1)); // Eliminar el último día
    }
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getLineaPos = (lineas, id) => lineas.findIndex((linea) => linea.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setDiasRutina((diasRutina) => {
      return diasRutina.map((diaRutina, index) => {
        if (index === currentPage) {
          const newLineas = arrayMove(
            diaRutina.lineas,
            getLineaPos(diaRutina.lineas, active.id),
            getLineaPos(diaRutina.lineas, over.id)
          );
          return { ...diaRutina, lineas: newLineas };
        }
        return diaRutina;
      });
    });
  };

  // Cambiar de página
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < diasRutina.length) {
      setCurrentPage(newPage);
    }
  };

  if (!solicitud) {
    return <div>Cargando solicitud...</div>; // Mostrar un indicador de carga mientras se obtiene la solicitud
  }

  const diaActual = diasRutina[currentPage]; // Obtener el día que se está mostrando en la página actual

  
  return (
    <div className="flex flex-col items-center  ">
      <h1 className="text-2xl mb-4">Solicitud de Rutina</h1>
      <Solicitud solicitud={solicitud} modo="descripcion" />

      <h2 className="text-2xlg mb-2 text-gray-500 ">Día {diaActual.dia} de la Rutina</h2>
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <ConjuntoLineas lineas={diaActual.lineas} dia={diaActual.dia} />
      </DndContext>

      <button 
        onClick={handleAñadirLinea} 
        className="bg-blue-400 rounded-2xl p-1 text-sm mt-4 w-40 mx-auto">
        Añadir otra línea
      </button>

      {/* Paginación de días */}
      <div className="flex space-x-4 mt-4">
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          className="bg-gris-acero rounded-2xl p-1 text-sm w-40" 
          disabled={currentPage === 0}>
          Día Anterior
        </button>
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          className="bg-gris-acero rounded-2xl p-1 text-sm w-40" 
          disabled={currentPage === diasRutina.length - 1}>
          Día Siguiente
        </button>
      </div>

      <button 
        onClick={handleAñadirDia} 
        className="bg-green-600 rounded-2xl p-1 text-sm mt-4 w-40 mx-auto">
        Añadir Nuevo Día
      </button>
      <button
        onClick={handleEliminarDia}
        className="bg-rojo-intenso rounded-2xl p-1 text-sm mt-4 w-40 mx-auto">
        Eliminar Día
      </button>

      <br />
      <button 
        onClick={handleClickButton} 
        className="bg-green-600 rounded-2xl p-1 text-xl w-40 ">
        Upload Rutina
      </button>
      <br />
      <Link 
        to="/rutinas/solicitudes" 
        className="bg-rojo-intenso rounded-2xl p-1 text-xl w-40 mt-auto ">
        Volver
      </Link>
    </div>
  );
};