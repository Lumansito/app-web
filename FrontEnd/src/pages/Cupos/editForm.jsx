import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCupos } from "../../context/Cupo/CupoProvider.jsx";

const EditCupoForm = () => {
  const [values, setValues] = useState({
    horario: "",
    estado: "active",
    cupo: "",
    dniInstructor: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const { updateCupo, loadCupos } = useCupos();

  useEffect(() => {
    const loadData = async () => {
      const cupoData = await loadCupos(params.idEsquema);
      if (cupoData) {
        setValues({
          horario: cupoData.horario || "",
          dniInstructor: cupoData.dniInstructor || "",
          estado: cupoData.estado || "active",
          cupo: cupoData.cupo || 0,
        });
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
    if (!values.horario || !values.dniInstructor || !values.cupo) {
      setModalMessage("Por favor, completa todos los campos.");
      setIsSuccess(false);
      setShowModal(true);
      return;
    }

    const cupoData = {
      ...values,
      estado: values.estado || "active",
    };

    const ok = await updateCupo(params.idEsquema, cupoData);
    console.log(cupoData);
    setModalMessage(
      ok ? "Cupo editado correctamente" : "Error al editar el cupo"
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

  return (
    <div className="min-h-screen bg-white text-black p-4 relative">
      <button
        onClick={() => navigate("/")} // Cambiar a la ruta de inicio
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
            onClick={() => navigate(-1)} // Volver a la página anterior
            className="px-3 py-1 bg-gray-200 text-black text-sm rounded hover:bg-gray-300 transition-colors"
          >
            ← Volver
          </button>
          <h1 className="text-2xl font-bold">Editar Cupo</h1>
        </div>
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
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
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

export default EditCupoForm;
