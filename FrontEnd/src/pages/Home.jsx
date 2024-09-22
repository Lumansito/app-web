import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LogIn } from "./LogIn"
import { useUsuario } from "../context/Usuario/UsuarioProvider"

export  function Home() {
  const { rol, comprobarToken, dni, logout } = useUsuario()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    comprobarToken()
  }, [])

  const handleLogout = async () => {
    setLoading(true)
    try {
      await logout()
      alert("Has cerrado sesión exitosamente.")
      navigate("/")
    } catch (error) {
      alert("No se pudo cerrar la sesión. Intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const handleNavigation = (path) => {
    navigate(path)
  }

  if (rol.length === 0) {
    return <LogIn />
  }

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Gym</h1>
      <div className="max-w-sm mx-auto bg-gray-100 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Bienvenido, usuario con DNI: {dni}</h2>
        </div>
        <div className="p-4 space-y-4">
          <p className="text-sm font-medium">Tus roles:</p>
          <div className="space-y-2">
            {rol.includes(1) && (
              <div className="space-y-2">
                <span className="block text-sm bg-gray-200 p-2 rounded">Cliente</span>
                <button
                  className="w-full py-2 px-4 bg-gray-200 text-black rounded hover:bg-gray-300 transition-colors"
                  onClick={() => handleNavigation("/clases")}
                >
                  Realizar Reserva
                </button>
                <button
                  className="w-full py-2 px-4 bg-gray-200 text-black rounded hover:bg-gray-300 transition-colors"
                  onClick={() => handleNavigation("/rutinas")}
                >
                  Mis Rutinas
                </button>
              </div>
            )}
            {rol.includes(2) && (
              <div className="space-y-2">
                <span className="block text-sm bg-gray-200 p-2 rounded">Profesional</span>
                <button
                  className="w-full py-2 px-4 bg-gray-200 text-black rounded hover:bg-gray-300 transition-colors"
                  onClick={() => handleNavigation("/rutinas/solicitudes")}
                >
                  Solicitudes de Rutina
                </button>
                <button
                  className="w-full py-2 px-4 bg-gray-200 text-black rounded hover:bg-gray-300 transition-colors"
                  onClick={() => handleNavigation("/seguimiento/lista")}
                >
                  Marcas Clientes
                </button>
              </div>
            )}
            {rol.includes(3) && (
              <div className="space-y-2">
                <span className="block text-sm bg-gray-200 p-2 rounded">Admin</span>
                <button
                  className="w-full py-2 px-4 bg-gray-200 text-black rounded hover:bg-gray-300 transition-colors"
                  onClick={() => handleNavigation("/cupos/lista")}
                >
                  Crear cupo
                </button>
                <button
                  className="w-full py-2 px-4 bg-gray-200 text-black rounded hover:bg-gray-300 transition-colors"
                  onClick={() => handleNavigation("/confirmar-asistencia")}
                >
                  Confirmar Asistencia
                </button>
              </div>
            )}
          </div>
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm font-medium mb-2">Opciones</p>
            <button
              className="w-full py-2 px-4 bg-gray-200 text-black rounded hover:bg-gray-300 transition-colors mb-2"
              onClick={() => handleNavigation("/perfil")}
            >
              Perfil
            </button>
            <button
              className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              onClick={handleLogout}
              disabled={loading}
            >
              {loading ? "Cerrando sesión..." : "Cerrar sesión"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}