import { LineaRutinaForm } from "./LineaRutinaForm";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export function ConjuntoLineas({ lineas, onClick }) {
  return (
    <div
      className="ConjuntoLineas flex flex-col gap-4 "
      onClick={onClick}
      
    >
      <SortableContext items={lineas} strategy={verticalListSortingStrategy}>
        
        {lineas.map((linea) => (
          <div key={linea.id}>
            <LineaRutinaForm id={linea.id} linea={linea} />            
          </div>
        ))}
      </SortableContext>
    </div>
  );
}
