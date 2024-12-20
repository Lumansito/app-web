import React from "react";


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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
