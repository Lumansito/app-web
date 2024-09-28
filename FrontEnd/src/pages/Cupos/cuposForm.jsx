import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useCupos } from "../../context/Cupo/CupoProvider.jsx";

const CuposForm = () => {
  const [values, setValues] = useState({
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

  const { createCupo, loadCupo } = useCupos();

  const isNewRoute = location.pathname.includes("/new");
  const diaPreseleccionado = params.diaSemana;

  const getDayNumber = (dayName) => {
    const dayMapping = {
      domingo: 0,
      lunes: 1,
      martes: 2,
      miércoles: 3,
      jueves: 4,
      viernes: 5,
      sábado: 6,
    };
    return dayMapping[dayName.toLowerCase()] || null; // Convierte a minúsculas para evitar errores
  };

  useEffect(() => {
    const loadData = async () => {
      if (!isNewRoute) {
        const cupoData = await loadCupo(params.idEsquema);
        if (cupoData) {
          setValues({
            horario: cupoData.horario || "",
            dniInstructor: cupoData.dniInstructor || "",
            estado: cupoData.estado || "",
            cupo: cupoData.cupo || 0,
          });
        }
      }
    };

    loadData();
  }, [isNewRoute, params.idEsquema, loadCupo]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!values.horario || !values.dniInstructor || !values.cupo) {
      setModalMessage("Por favor, completa todos los campos.");
      setIsSuccess(false);
      setShowModal(true);
      return;
    }

    const cupoData = {
      ...values,
      estado: isNewRoute ? "active" : values.estado,
      diaSemana: getDayNumber(diaPreseleccionado), // Convertir el día a número antes de enviarlo
    };

    const ok = await createCupo(cupoData);
    console.log(cupoData);
    setModalMessage(
      ok ? "Cupo creado correctamente" : "Error al crear el cupo"
    );
    setIsSuccess(ok);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (isSuccess) {
      navigate("/cupos/lista");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white text-black p-4">
      {/* Botón de Volver encima del formulario */}
      <div className="mb-4 text-center">
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition-colors"
        >
          ← Volver
        </button>
      </div>

      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isNewRoute ? "Nuevo Cupo" : "Editar Cupo"}
        </h1>
        <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="horario"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Horario
                </label>
                <input
                  type="time"
                  id="horario"
                  name="horario"
                  value={values.horario}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="cupo"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Cupo
                </label>
                <input
                  type="number"
                  id="cupo"
                  name="cupo"
                  value={values.cupo}
                  onChange={handleInputChange}
                  placeholder="Ingrese el número de cupos"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="dniInstructor"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  DNI del Instructor
                </label>
                <input
                  type="text"
                  id="dniInstructor"
                  name="dniInstructor"
                  value={values.dniInstructor}
                  onChange={handleInputChange}
                  placeholder="Ingrese el DNI del instructor"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
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
                  onClick={handleCloseModal}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-${
                    isSuccess ? "green" : "red"
                  }-600 text-base font-medium text-white`}
                >
                  {isSuccess ? "Aceptar" : "Cerrar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CuposForm;
