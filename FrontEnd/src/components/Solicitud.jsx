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
          <svg className="w-5 h-5 text-gray-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
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
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <time dateTime={fecha}>{fecha}</time>
        </div>
      </div>
    </div>
  )
}