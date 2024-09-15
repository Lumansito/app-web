import { useEffect } from "react";
import { LineaRutinaForm } from "./LineaRutinaForm";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export function ConjuntoLineas({ dia,lineas, onClick }) {
 
  return (
    <div
      className="ConjuntoLineas flex flex-col gap-4 max-w-xs max-h-96 overflow-y-auto overflow-x-clip"
      onClick={onClick}
      
    >
      <SortableContext items={lineas} strategy={verticalListSortingStrategy}>
        
        {lineas.map((linea) => (
          <div key={linea.id}>
            <LineaRutinaForm id={linea.id} linea={linea} dia={dia}/>            
          </div>
        ))}
      </SortableContext>
    </div>
  );
}
