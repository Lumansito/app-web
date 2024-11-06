import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useCupos } from "../../context/Cupo/proveedorCupo.jsx";
import { useUsuario } from "../../context/Usuario/proveedorUsuario.jsx";

const FormularioCupos = () => {
  const [values, setValues] = useState({
    horario: "",
    estado: "active", // Estado por defecto para un nuevo cupo
    cupo: "",
    dniInstructor: "",
    diaSemana: "",
  });

  const { obtenerProfesionales, profesionales } = useUsuario(); 

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const location = useLocation();
  const { idEsquema, diaSemana } = useParams();
  const navigate = useNavigate();

  const { crearCupo, actualizarCupo, cargarCupoXid } = useCupos();

  const isNewRoute = location.pathname.includes("/new");
  const diaPreseleccionado = diaSemana;

  const dayMapping = {
    domingo: 0,
    lunes: 1,
    martes: 2,
    miercoles: 3,
    jueves: 4,
    viernes: 5,
    sabado: 6,
    0: "Domingo",
    1: "Lunes",
    2: "Martes",
    3: "Miercoles",
    4: "Jueves",
    5: "Viernes",
    6: "Sabado",
  };

  const getDayNumber = (dayName) => {
    if (!dayName) {
      console.error("El nombre del día es undefined o null");
      return null;
    }

    return dayMapping[dayName.toLowerCase()] || null; // Convierte a minúsculas para evitar errores
  };

  useEffect(() => {
    const cargarData = async () => {
      if (!isNewRoute) {
        const cupoData = await cargarCupoXid(idEsquema);
        if (cupoData) {
          setValues({
            horario: cupoData.horario || "",
            dniInstructor: cupoData.dniInstructor || "",
            estado: cupoData.estado || "active",
            cupo: cupoData.cupo || 0,
            diaSemana: cupoData.diaSemana,
          });
        }
      }
      await obtenerProfesionales();
    };
    cargarData();
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
      estado: isNewRoute ? "active" : values.estado,
      diaSemana: isNewRoute ? getDayNumber(diaPreseleccionado) : diaSemana,
    };

    let ok = true;

    if (isNewRoute) {
      ok = await crearCupo(cupoData);
    } else {
      ok = await actualizarCupo(idEsquema, cupoData);
    }

    setModalMessage(
      ok
        ? isNewRoute
          ? "Cupo creado correctamente"
          : "Cupo actualizado correctamente"
        : "Error al procesar el cupo"
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
    <div className="min-h-screen bg-white text-black p-4 relative">
      <button
        onClick={handleGoBack}
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
                <label htmlFor="dniInstructor">DNI del Instructor</label>
                <select
                  id="dniInstructor"
                  name="dniInstructor"
                  value={values.dniInstructor}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccionar profesional</option>
                  {Array.isArray(profesionales) && profesionales?.map((prof) => (
                    <option key={prof.dni} value={prof.dni}>
                      {prof.dni} - {prof.nombre} {prof.apellido}
                    </option>
                  ))}
                </select>
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
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
                    isSuccess ? "bg-green-600" : "bg-red-600"
                  } text-base font-medium text-white hover:bg-${
                    isSuccess ? "green-700" : "red-700"
                  } sm:text-sm`}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormularioCupos;
