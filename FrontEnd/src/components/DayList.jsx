import React from "react";

function DayList({ day, cupos, navigate }) {
  const handleAddCupo = () => {
    navigate(`/cupos/new?dia=${day}`);
  };

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Cupos para {day}</h1>
      <div className="max-w-sm mx-auto bg-gray-100 rounded-lg shadow-md overflow-hidden">
        <ul className="p-4 space-y-4">
          {cupos.map((cupo) => (
            <li
              key={cupo.idEsquema}
              className="flex justify-between items-center bg-gray-200 p-2 rounded-lg shadow"
            >
              <div>
                <span className="font-semibold">{cupo.horaInicio}</span> -{" "}
                <span>{cupo.profesor}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/cupos/${cupo.idEsquema}/delete`)}
                  className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition-colors text-sm"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleAddCupo}
            className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
          >
            Agregar nuevo cupo
          </button>
        </div>
      </div>
    </div>
  );
}

export default DayList;
