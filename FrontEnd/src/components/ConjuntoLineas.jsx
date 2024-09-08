import { LineaRutinaForm } from "./LineaRutinaForm";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export function ConjuntoLineas({ lineas, onClick }) {
  return (
    <div
      className="ConjuntoLineas"
      onClick={onClick}
      style={{ border: "1px solid red" }}
    >
      <SortableContext items={lineas} strategy={verticalListSortingStrategy}>
        {console.log("lineas", lineas)}
        {lineas.map((linea) => (
          <LineaRutinaForm key={linea.id} id={linea.id} linea={linea} />
        ))}
      </SortableContext>
    </div>
  );
}
