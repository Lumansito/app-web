import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useCupos } from "../../context/Cupo/proveedorCupo.jsx";
import { useUsuario } from "../../context/Usuario/ProveedorUsuario.jsx";
import toast from "react-hot-toast";
import { Casa } from "../../assets/Iconos/Casa.jsx";

import { format, parse, getDay } from "date-fns";
import { es } from "date-fns/locale";

const FormularioCupos = () => {
  const [values, setValues] = useState({
    horario: "",
    estado: "active",
    cupo: "",
    dniInstructor: "",
    diaSemana: "",
  });

  const { obtenerProfesionales, profesionales } = useUsuario();
  const location = useLocation();
  const { idEsquema, diaSemana } = useParams();
  const navigate = useNavigate();
  const { crearCupo, actualizarCupo, cargarCupoXid } = useCupos();

  const isNewRoute = location.pathname.includes("/new");
  const diaPreseleccionado = diaSemana;

  const normalizeText = (text) =>
    text
      .toLowerCase()
      .normalize("NFD") 
      .replace(/[\u0300-\u036f]/g, "");


  const getDayNumber = (dayName) => {
    try {
      
      const normalizado= normalizeText(dayName);
      const parsedDate = parse(normalizado, "EEEE", new Date(), { locale: es }); 
      return getDay(parsedDate);
    } catch (error) {
      return null;
    }
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
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    const cupoData = {
      ...values,
      estado: isNewRoute ? "active" : values.estado,
      diaSemana: isNewRoute ? getDayNumber(diaPreseleccionado) : diaSemana,
    };

    
    let ok = false;
    let respuesta = {};
    let msjE = "";

    if (isNewRoute) {
      respuesta = await crearCupo(cupoData);
    } else {
      respuesta = await actualizarCupo(idEsquema, cupoData);
    }
    
    if(respuesta.correcto){
      ok = true;
    }else{
      msjE = respuesta.error.response.data.message || "Error al procesar el cupo";
      ok = false;
    }


    if (ok) {
      toast.success(
        isNewRoute
          ? "Cupo creado correctamente"
          : "Cupo actualizado correctamente"
      );
      navigate("/cupos/lista");
    } else {
      toast.error(msjE);
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
        <Casa className="h-5 w-5" />
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Seleccionar profesional</option>
                  {Array.isArray(profesionales) &&
                    profesionales?.map((prof) => (
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
              <button
                type="button"
                onClick={handleGoBack}
                className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioCupos;
