import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useSeguimiento } from "../../context/Seguimiento/SeguimientoProvider";

export const FormSeguimiento = () => {
  const [values, setValues] = useState({
    peso: "",
    repeticiones: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [clienteInfo, setClienteInfo] = useState("");
  const [ejercicioInfo, setEjercicioInfo] = useState("");

  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const {
    loadSeguimiento,
    seguimiento,
    updateSeguimientoId,
    newSeguimiento,
    loadCliente,
    cliente,
    loadEjercicio,
    ejercicio,
  } = useSeguimiento();

  const isEditRoute = location.pathname.includes("/edit");
  const isNewRoute = location.pathname.includes("/new");

  useEffect(() => {
    if (isEditRoute) {
      loadSeguimiento(params.idSeguimiento);  
      setClienteInfo("Cargando...");
      setEjercicioInfo("Cargando...");
    } else if (isNewRoute) {
      loadCliente(params.dni);
      loadEjercicio(params.codEjercicio);
    }
  }, []);

  useEffect(() => {
    if (cliente) {
      setClienteInfo(
        `${cliente.nombre} ${cliente.apellido} (DNI: ${cliente.dni})`
      );
    }
  }, [cliente]);

  useEffect(() => {
    if (ejercicio) {
      setEjercicioInfo(`${ejercicio.nombre} (Código: ${ejercicio.codEjercicio})`);

    }
  }, [ejercicio]);


  useEffect(() => {
    if (isEditRoute && seguimiento) {
      setValues({
        peso: seguimiento.peso || "",
        repeticiones: seguimiento.repeticiones || "",
      });
    }
  }, [seguimiento]);

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
      ok = await updateSeguimientoId(params.idSeguimiento, values);
      setModalMessage(
        ok
          ? "Seguimiento actualizado correctamente"
          : "Error al actualizar el seguimiento"
      );
    } else {
      ok = await newSeguimiento(values, params.dni, params.codEjercicio);
      setModalMessage(
        ok
          ? "Seguimiento creado correctamente"
          : "Error al crear el seguimiento"
      );
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
      navigate("/seguimiento/lista");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <div className="max-w-md mx-auto">
        <button
          onClick={handleGoBack}
          className="mb-4 px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition-colors"
        >
          ← Volver
        </button>
        <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">
              {isNewRoute ? "Nuevo" : "Editar"} Seguimiento
            </h1>
            <div className="mb-4 p-4 bg-gray-100 rounded-md">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Cliente:</strong> {clienteInfo}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Ejercicio:</strong> {ejercicioInfo}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="peso"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Peso
                </label>
                <input
                  type="text"
                  id="peso"
                  name="peso"
                  value={values.peso}
                  onChange={handleInputChange}
                  placeholder="Ingrese el peso"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="repeticiones"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Repeticiones
                </label>
                <input
                  type="text"
                  id="repeticiones"
                  name="repeticiones"
                  value={values.repeticiones}
                  onChange={handleInputChange}
                  placeholder="Ingrese las repeticiones"
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
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        >
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