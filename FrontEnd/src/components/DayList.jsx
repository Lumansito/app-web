import React from "react";

function DayList({ day, cupos, navigate }) {
  const handleAddCupo = () => {
    navigate("/cupos/new?dia=${day}");
  }
  return (
    <div className="bg-gris-acero self-center">
      <h2 className="text-gray-600">cupos para {day}</h2>
      <ul className="bg-gris-acero self-center">
        {cupos.map((cupo) => (
          <li
            key={cupo.id}
            className="flex justify-between items-center bg-gray-100 p-2 rounded-lg shadow-md"
          >
            <div>
              <span>{cupo.horaInicio}</span> - <span>{cupo.profesor}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/cupos/${cupo.id}/delete)")}
                className="bg-red-400 rounded-2xl p-1 text-sm"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={handleAddCupo}
        className="bg-green-400 rounded-2xl p-1 text-sm mt-4 w-40 mx-auto"
      >
        Agregar nuevo cupo
      </button>
    </div>
  );
}
export default DayList;