import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useSeguimiento } from "../../context/Seguimiento/proveedorSeguimiento.jsx";
import toast from "react-hot-toast";

export const FormularioSeguimiento = () => {
  const [values, setValues] = useState({
    peso: "",
    repeticiones: "",
  });

  const [clienteInfo, setClienteInfo] = useState("");
  const [ejercicioInfo, setEjercicioInfo] = useState("");

  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const {
    cargarSeguimiento,
    seguimiento,
    actualizarSeguimientoXid,
    nuevoSeguimiento,
    cargarClienteXdni,
    cliente,
    cargarEjercicio,
    ejercicio,
  } = useSeguimiento();

  const isEditRoute = location.pathname.includes("/edit");
  const isNewRoute = location.pathname.includes("/new");

  useEffect(() => {
    if (isEditRoute) {
      cargarSeguimiento(params.idSeguimiento);
      setClienteInfo("Cargando...");
      setEjercicioInfo("Cargando...");
    } else if (isNewRoute) {
      cargarClienteXdni(params.dni);
      cargarEjercicio(params.codEjercicio);
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
      setEjercicioInfo(
        `${ejercicio.nombre} (Código: ${ejercicio.codEjercicio})`
      );
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
      ok = await actualizarSeguimientoXid(params.idSeguimiento, values);
      toast[ok ? "success" : "error"](
        ok
          ? "Seguimiento actualizado correctamente"
          : "Error al actualizar el seguimiento"
      );
    } else {
      ok = await nuevoSeguimiento(values, params.dni, params.codEjercicio);
      toast[ok ? "success" : "error"](
        ok
          ? "Seguimiento creado correctamente"
          : "Error al crear el seguimiento"
      );
    }

    if (ok) navigate("/seguimiento/lista");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

 

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <div className="max-w-md mx-auto">
        <button
          onClick={handleGoBack}
          className="mb-4 px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition-colors"
        >
          Volver
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
    </div>
  );
};
