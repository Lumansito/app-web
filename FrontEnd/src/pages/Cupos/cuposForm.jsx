import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useCupos } from "../../context/Cupos/CuposProvider";

export const CuposForm = () => {
  const [values, setValues] = useState({
    diaSemana: "",
    horario: "",
    estado: "",
    cupo: "",
    dniInstructor: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const {
    loadCupo,
    cupo,
    updateCupoId,
    newCupo,
  } = useCupos();

  const isEditRoute = location.pathname.includes("/edit");
  const isNewRoute = location.pathname.includes("/new");

  useEffect(() => {
    if (isEditRoute) {
      loadCupo(params.idCupo);
    }
  }, [isEditRoute, loadCupo, params.idCupo]);

  useEffect(() => {
    if (isEditRoute && cupo) {
      setValues({
        diaSemana: cupo.diaSemana || "",
        horario: cupo.horario || "",
        estado: cupo.estado || "",
        cupo: cupo.cupo || "",
        dniInstructor: cupo.dniInstructor || "",
      });
    }
  }, [cupo, isEditRoute]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let ok;
    if (isEditRoute) {
      ok = await updateCupoId(params.idCupo, values);
      setModalMessage(ok ? "Cupo actualizado correctamente" : "Error al actualizar el cupo");
    } else {
      ok = await newCupo(values);
      setModalMessage(ok ? "Cupo creado correctamente" : "Error al crear el cupo");
    }
    setIsSuccess(ok);
    setShowModal(true);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (isSuccess) {
      navigate("/cupos/lista");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <div className="max-w-md mx-auto">
        {/* Contenedor para el botón alineado a la izquierda */}
        <div className="flex justify-start mb-4">
          <button
            onClick={handleGoBack}
            className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition-colors"
          >
            ← Volver
          </button>
        </div>
        <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">
              {isNewRoute ? "Nuevo" : "Editar"} Cupo
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="diaSemana" className="block text-sm font-medium text-gray-700 mb-1">
                  Día de la Semana
                </label>
                <input
                  type="text"
                  id="diaSemana"
                  name="diaSemana"
                  value={values.diaSemana}
                  onChange={handleInputChange}
                  placeholder="Ingrese el día de la semana"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="horario" className="block text-sm font-medium text-gray-700 mb-1">
                  Horario
                </label>
                <input
                  type="text"
                  id="horario"
                  name="horario"
                  value={values.horario}
                  onChange={handleInputChange}
                  placeholder="Ingrese el horario"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <input
                  type="text"
                  id="estado"
                  name="estado"
                  value={values.estado}
                  onChange={handleInputChange}
                  placeholder="Ingrese el estado"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="cupo" className="block text-sm font-medium text-gray-700 mb-1">
                  Cupo
                </label>
                <input
                  type="text"
                  id="cupo"
                  name="cupo"
                  value={values.cupo}
                  onChange={handleInputChange}
                  placeholder="Ingrese el cupo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="dniInstructor" className="block text-sm font-medium text-gray-700 mb-1">
                  DNI Instructor
                </label>
                <input
                  type="text"
                  id="dniInstructor"
                  name="dniInstructor"
                  value={values.dniInstructor}
                  onChange={handleInputChange}
                  placeholder="Ingrese el DNI del instructor"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Guardar
              </button>
            </form>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {isSuccess ? "Éxito" : "Error"}
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">{modalMessage}</p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={handleCloseModal}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

