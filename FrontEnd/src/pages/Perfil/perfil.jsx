import { FaUser, FaCalendarAlt, FaLock, FaSignOutAlt } from "react-icons/fa";

export function Perfil({
  firstName,
  lastName,
  membership,
  expirationDate,
  onChangePassword,
  onLogout,
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            Perfil de Usuario
          </h1>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <FaUser className="text-blue-500 text-2xl" />
              <div>
                <h2 className="text-xl font-semibold">{`${firstName} ${lastName}`}</h2>
                <p className="text-gray-600">Nombre y Apellido</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <FaCalendarAlt className="text-blue-500 text-2xl" />
              <div>
                <h2 className="text-xl font-semibold">{membership}</h2>
                <p className="text-gray-600">Membresía</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <FaCalendarAlt className="text-blue-500 text-2xl" />
              <div>
                <h2 className="text-xl font-semibold">{expirationDate}</h2>
                <p className="text-gray-600">Fecha de Vencimiento</p>
              </div>
            </div>

            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button
                onClick={onChangePassword}
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
              >
                <FaLock />
                <span>Cambiar Contraseña</span>
              </button>
              <button
                onClick={onLogout}
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
              >
                <FaSignOutAlt />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
