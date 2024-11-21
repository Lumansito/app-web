import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRutinas } from "../../context/Rutinas/ProveedorRutinas.jsx";
import { Solicitud } from "../../components/Solicitud.jsx";
import { ConjuntoLineas } from "../../components/ConjuntoLineas.jsx";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export const FormularioSolicitudRutina = () => {
  const {
    solicitud,
    cargarSolicitudXid,
    diasRutina,
    asignarDiasRutina,
    indice,
    asignarIndice,
    actualizarRutina,
    comprobarLineasRutina,
  } = useRutinas();
  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();
  const params = useParams();
  const idSolicitud = params.idSolicitud;
  const handleGoBack = () => {
    navigate(-1);
  };
  const handleGoHome = () => {
    navigate("/");
  };
  useEffect(() => {
    if (idSolicitud) {
      cargarSolicitudXid(idSolicitud);
    }
  }, []);

  const handleClickButton = async () => {
    const dia = comprobarLineasRutina();
    if (dia) {
      alert(
        "Por favor, complete todas las líneas de la rutina. Compruebe dia: " +
          dia
      );
      return;
    }
    try {
      const response = await actualizarRutina();
      if (response) {
        alert("Rutina subida correctamente");
        asignarDiasRutina({ dia: 1, lineas: [] });
        navigate("/rutinas/solicitudes");
      } else {
        alert("Error al subir la rutina");
      }
    } catch (error) {
      console.error("Error durante la subida de la rutina:", error);
      alert("Ocurrió un error al subir la rutina");
    }
  };

  const handleAñadirLinea = () => {
    asignarDiasRutina((prevDiasRutina) => {
      return prevDiasRutina.map((diaRutina, index) => {
        if (index === currentPage) {
          return {
            ...diaRutina,
            lineas: [
              ...diaRutina.lineas,
              {
                codEjercicio: "",
                series: "0",
                rep: "0",
                id: indice,
                dia: diaRutina.dia,
              },
            ],
          };
        }
        return diaRutina;
      });
    });
    asignarIndice(indice + 1);
  };

  const handleAñadirDia = () => {
    asignarDiasRutina((prevDiasRutina) => [
      ...prevDiasRutina,
      { dia: prevDiasRutina.length + 1, lineas: [] },
    ]);
    setCurrentPage(diasRutina.length);
  };

  const handleEliminarDia = () => {
    if (diasRutina.length === 1) {
      return;
    }
    if (currentPage === diasRutina.length - 1) {
      setCurrentPage(currentPage - 1);
      asignarDiasRutina(diasRutina.slice(0, -1));
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

  const getLineaPos = (lineas, id) =>
    lineas.findIndex((linea) => linea.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;
    asignarDiasRutina((diasRutina) => {
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

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < diasRutina.length) {
      setCurrentPage(newPage);
    }
  };

  if (!solicitud) {
    return <div className="text-center mt-8">Cargando solicitud...</div>;
  }

  const diaActual = diasRutina[currentPage];

  return (
    <div className="min-h-screen bg-white text-black p-4 relative">
      <button
        onClick={handleGoHome}
        className="absolute top-4 left-4 p-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 transition-colors"
        aria-label="Ir al inicio"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </button>
      <div className="max-w-md mx-auto mt-12">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleGoBack}
            className="px-3 py-1 bg-gray-200 text-black text-sm rounded hover:bg-gray-300 transition-colors"
          >
            ← Volver
          </button>
          <h1 className="text-2xl font-bold">Listado de Clases</h1>
        </div>

        <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-4">
            <Solicitud solicitud={solicitud} modo="descripcion" />
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold text-center mb-4">
            Día {diaActual.dia} de la Rutina
          </h2>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
          >
            <ConjuntoLineas lineas={diaActual.lineas} dia={diaActual.dia} />
          </DndContext>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handleAñadirLinea}
            className="bg-blue-500 hover:bg-blue-700 text-white rounded-md px-4 py-2 transition-colors"
          >
            Añadir otra línea
          </button>
          <button
            onClick={handleAñadirDia}
            className="bg-green-500 hover:bg-green-700 text-white rounded-md px-4 py-2 transition-colors"
          >
            Añadir Nuevo Día
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="bg-gray-200 hover:bg-gray-300 text-black rounded-md px-4 py-2 transition-colors"
            disabled={currentPage === 0}
          >
            Día Anterior
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="bg-gray-200 hover:bg-gray-300 text-black rounded-md px-4 py-2 transition-colors"
            disabled={currentPage === diasRutina.length - 1}
          >
            Día Siguiente
          </button>
          <button
            onClick={handleEliminarDia}
            className="bg-red-500 hover:bg-red-700 text-white rounded-md px-4 py-2 transition-colors"
            disabled={diasRutina.length === 1}
          >
            Eliminar Día
          </button>
          <button
            onClick={handleClickButton}
            className="bg-green-500 hover:bg-green-700 text-white rounded-md px-4 py-2 transition-colors"
          >
            Subir Rutina
          </button>
        </div>
      </div>
    </div>
  );
};
