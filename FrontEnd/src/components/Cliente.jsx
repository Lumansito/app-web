import { FlechaDerecha } from "../assets/Iconos/FlechaDerecha"
export function Cliente({ cliente, onClick }) {
  return (
    <div 
      className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200 rounded-lg p-4 cursor-pointer shadow-sm"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-medium text-gray-800">{cliente.nombre} {cliente.apellido}</p>
          {cliente.dni && <p className="text-sm text-gray-600">DNI: {cliente.dni}</p>}
        </div>
        <FlechaDerecha className="h-5 w-5 text-gray-400"/>
      </div>
      {cliente.mail && <p className="mt-2 text-sm text-gray-600">{cliente.mail}</p>}
    </div>
  )
}