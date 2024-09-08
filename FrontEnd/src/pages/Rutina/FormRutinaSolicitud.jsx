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
  const { solicitud, loadSolicitud, lineas, setLineas, indice, setIndice } = useRutinas();
    
  const navigate = useNavigate();
  const params = useParams();

  const idSolicitud = params.idSolicitud;

  useEffect(() => {
    if (idSolicitud) {
      loadSolicitud(idSolicitud);
      // Asegurarse de que idSolicitud exista antes de intentar cargar la solicitud
    }
  }, []);

  const handleClickButton = () => {
    console.log(lineas);
  };
  const handleAñadir = () => {
    setLineas((prevLineas) => [
      ...prevLineas, // Mantener las líneas anteriores
      { codEjercicio: "", series: "0", rep: "0", id:indice }, // Agregar una nueva línea
    ]);
    setIndice(indice + 1);
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
  const getLineaPos = (id) => lineas.findIndex((linea) => linea.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setLineas((lineas) => {
      const originalPos = getLineaPos(active.id);
      const newPos = getLineaPos(over.id);

      return arrayMove(lineas, originalPos, newPos);
    });
  };

  if (!solicitud) {
    return <div>Cargando solicitud...</div>; // Mostrar un indicador de carga mientras se obtiene la solicitud
  }
  return (
    <div>
      <h1>Solicitud de Rutina</h1>
      <Solicitud solicitud={solicitud} modo="descripcion" />
      <Link to="/rutinas/solicitudes">Volver</Link>

      <h2>Lineas de Rutina</h2>
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <ConjuntoLineas lineas={lineas} />
      </DndContext>

      <button onClick={handleAñadir}>Añadir otra linea</button>
      <button onClick={handleClickButton}>ENsVIAR</button>
    </div>
  );
};
