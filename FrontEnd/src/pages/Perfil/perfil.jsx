import { useEffect } from "react";
import { useUsuario } from "../../context/Usuario/ProveedorUsuario.jsx";
import { useNavigate } from "react-router-dom";
import { Casa } from "../../assets/Iconos/Casa.jsx";
import { Usuario } from "../../assets/Iconos/Usuario.jsx";
import { Calendario } from "../../assets/Iconos/Calendario.jsx";
import { CerrarSesion } from "../../assets/Iconos/CerrarSesion.jsx";

export function Perfil() {
  const {
    datosUsuario,
    dni,
    obtenerDatosPersonales,
    rol,
    cerrarSesion,
    comprobarToken,
  } = useUsuario();
  const navigate = useNavigate();

  useEffect(() => {
    comprobarToken();
  }, []);

  useEffect(() => {
    obtenerDatosPersonales();
  }, [dni]);

  const onLogout = () => {
    cerrarSesion();
    navigate("/");
  };
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white text-black p-4 relative">
      
      <button
        onClick={handleGoHome}
        className="absolute top-4 left-4 px-4 py-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 transition-colors"
        aria-label="Ir al inicio"
      >
        <Casa className="h-5 w-5 " />
      </button>
      <div className="max-w-md mx-auto mt-12">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleGoBack}
            className="px-3 py-1 bg-gray-200 text-black text-sm rounded hover:bg-gray-300 transition-colors"
          >
            Volver
          </button>
          <h1 className="text-2xl font-bold">Perfil de Usuario</h1>
        </div>
       
        <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <div className="space-y-6">
             
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                 <Usuario className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{`${datosUsuario.nombre} ${datosUsuario.apellido}`}</h2>
                  <p className="text-sm text-gray-600">Nombre y Apellido</p>
                </div>
              </div>

              
              {rol.includes(1) && (
                <>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Calendario className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Membresía</p>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {datosUsuario.membresia}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Calendario className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        Fecha de Vencimiento
                      </p>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {datosUsuario.fechaPago}
                      </h2>
                    </div>
                  </div>
                </>
              )}

              
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 pt-4">
                <button
                  onClick={onLogout}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 shadow-md"
                >
                  <CerrarSesion className="h-6 w-6" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
