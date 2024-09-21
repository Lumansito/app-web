import React from "react";

export function Clase({ clase , onClick}) {

  const availablePercentage = (clase.cuposOcupados / clase.cupo) * 100;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4" onClick={onClick}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">Clase</h3>
        <span className="text-sm font-medium text-gray-600">
          {clase.horario}
        </span>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Instructor:</span> {clase.dniInstructor}
        </p>
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Total: {clase.cupo}</span>
            <span>Cupos disponibles: {clase.cupo - clase.cuposOcupados}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${availablePercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
