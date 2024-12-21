import { Usuario } from "../assets/Iconos/Usuario"
import { Calendario } from "../assets/Iconos/Calendario"

export function Solicitud({ solicitud, modo, onClick }) {
  const fechaOriginal = new Date(solicitud.fechaPeticion)
  const fecha = fechaOriginal.toISOString().split("T")[0]

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out
        ${modo !== "descripcion" ? "hover:shadow-lg cursor-pointer transform hover:-translate-y-1" : ""}
      `}
      onClick={modo !== "descripcion" ? onClick : undefined}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Usuario className="w-8 h-8 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            {solicitud.nombre} {solicitud.apellido}
          </h3>
        </div>
        
        {modo === "descripcion" && (
          <div className="mb-4">
            <p className="text-gray-600 text-sm">
              <span className="font-medium">Descripción:</span> {solicitud.peticion}
            </p>
          </div>
        )}
        
        <div className="flex items-center text-sm text-gray-500">
          <Calendario className="w-4 h-4 mr-2" />
          <time dateTime={fecha}>{fecha}</time>
        </div>
      </div>
    </div>
  )
}