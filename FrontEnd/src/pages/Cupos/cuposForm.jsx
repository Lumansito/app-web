import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useCupos } from "../../context/Cupo/CupoProvider.jsx";

const CuposForm = () => {
  const [values, setValues] = useState({
    horario: "",
    dniInstructor: "",
    diaSemana: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const { createCupo, loadCupo } = useCupos();

  const isNewRoute = location.pathname.includes("/new");

  useEffect(() => {
    const loadData = async () => {
      if (!isNewRoute) {
        const cupoData = await loadCupo(params.idEsquema);
        if (cupoData) {
          setValues({
            horario: cupoData.horario || "",
            dniInstructor: cupoData.dniInstructor || "",
            diaSemana: cupoData.diaSemana || "",
          });
        }
      }
    };

    loadData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar si todos los campos están completos
    if (!values.horario || !values.dniInstructor || !values.diaSemana) {
      setModalMessage("Por favor, completa todos los campos.");
      setIsSuccess(false);
      setShowModal(true);
      return;
    }

    const ok = await createCupo(values);
    setModalMessage(
      ok ? "Cupo creado correctamente" : "Error al crear el cupo"
    );
    setIsSuccess(ok);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (isSuccess) {
      navigate("/cupos/lista"); // Cambia esto a la ruta que quieras después de crear el cupo
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-4">
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
                  placeholder="Ingrese el horario"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="diaSemana"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Día de la Semana
                </label>
                <select
                  id="diaSemana"
                  name="diaSemana"
                  value={values.diaSemana}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Seleccione un día</option>
                  <option value="1">Lunes</option>
                  <option value="2">Martes</option>
                  <option value="3">Miércoles</option>
                  <option value="4">Jueves</option>
                  <option value="5">Viernes</option>
                  <option value="6">Sábado</option>
                </select>
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

export default CuposForm;
