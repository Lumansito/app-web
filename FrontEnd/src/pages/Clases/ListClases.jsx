import { useEffect } from "react";
import { useClases } from "../../context/Clases/ClasesProvider";
import { Clase } from "../../components/Clase";

export const ListClases = () => {
  const { clases, loadClases } = useClases();

  useEffect(() => {
    loadClases();
  }, []);

  useEffect(() => {
    if (clases) {
      console.log(clases);
    }
  }, [clases]);

  return (
    <>
      <h1>Listado de Clases</h1>;
      {clases.map((clase) => (
        <div key={clase.idEsquema}>
          <Clase clase={clase} />
        </div>
      ))}
    </>
  );
};
