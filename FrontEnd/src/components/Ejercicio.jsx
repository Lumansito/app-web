import { FlechaIzquierda } from "../assets/Iconos/FlechaIzquierda";

export function Ejercicio({ ejercicio, onClick }) {
  return (
    <div className="max-w-md mx-auto">
      <div
        className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200 rounded-lg p-4 cursor-pointer shadow-sm"
        onClick={onClick}
      >
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium text-gray-800">
            {ejercicio.nombre}
          </p>
          <FlechaIzquierda className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
