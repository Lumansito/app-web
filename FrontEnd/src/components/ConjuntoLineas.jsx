import { FormularioLineaRutina } from "./FormularioLineaRutina.jsx"
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"

export  function ConjuntoLineas({ dia, lineas, onClick }) {
  return (
    <div
      className="bg-white text-black p-4 rounded-lg shadow-md overflow-hidden"
      onClick={onClick}
    >
      <h2 className="text-lg font-semibold mb-4 border-b border-gray-200 pb-2">Día {dia}</h2>
      <div className="max-h-96 overflow-y-auto overflow-x-hidden pr-2">
        <SortableContext items={lineas} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {lineas.map((linea) => (
              <div key={linea.id} className="bg-gray-100 p-4 rounded-md">
                <FormularioLineaRutina id={linea.id} linea={linea} dia={dia} />
              </div>
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  )
}