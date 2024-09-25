import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useCupos } from "../../context/Cupo/CupoProvider.jsx";

const CuposForm = () => {
  const [values, setValues] = useState({
    horario: "",
    estado: "",
    cupo: 3,
    dniInstructor: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const { editCupo, loadCupo } = useCupos();

  useEffect(() => {
    const loadData = async () => {
      const cupoData = await loadCupo(params.idEsquema);
      if (cupoData) {
        setValues({
          horario: cupoData.horario || "",
          dniInstructor: cupoData.dniInstructor || "",
          estado: cupoData.estado || "",
          cupo: cupoData.cupo || 0,
        });
      }
    };

    loadData();
  }, [params.idEsquema, loadCupo]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validación de campos
    if (!values.horario || !values.dniInstructor || !values.cupo) {
      setModalMessage("Por favor, completa todos los campos.");
      setIsSuccess(false);
      setShowModal(true);
      return;
    }

    const cupoData = {
      ...values,
      diaSemana: params.diaSemana,
    };

    const ok = await editCupo(params.idEsquema, cupoData);
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
    <div className="min-h-screen bg-white text-black p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Editar Cupo</h1>
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
