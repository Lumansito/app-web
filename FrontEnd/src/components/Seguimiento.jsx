import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useSeguimiento } from "../context/Seguimiento/proveedorSeguimiento.jsx"
import toast from "react-hot-toast"
import { TachoBasura } from '../assets/Iconos/TachoBasura.jsx'
import { Editar } from '../assets/Iconos/Editar.jsx'

export function Seguimiento({ seguimiento }) {

  const fechaOriginal = new Date(seguimiento.fechaSeguimiento)
  const fecha = fechaOriginal.toISOString().split("T")[0]
  const { borrarSeguimiento } = useSeguimiento()

  const handleDelete = () => {
    toast((t) => (
      <div className="flex flex-col items-start">
        <p>¿Estás seguro de que quieres eliminar este seguimiento?</p>
        <div className="flex space-x-2 mt-2">
          <button
            onClick={() => {
              borrarSeguimiento(seguimiento.idSeguimiento)
              toast.dismiss(t.id);
              toast.success('Ejercicio eliminado con éxito');
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Eliminar
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    ));
  }


  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-lg font-semibold text-gray-800">Fecha: {fecha}</p>
            <p className="text-gray-600">Repeticiones: {seguimiento.repeticiones}</p>
            <p className="text-gray-600">Peso: {seguimiento.peso} kg</p>
          </div>
          <div className="flex flex-col space-y-2">
            <Link 
              to={`/seguimiento/edit/${seguimiento.idSeguimiento}`}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center transition-colors duration-200"
            >
              <Editar className="h-4 w-4 mr-2" />
              Editar
            </Link>
            <button 
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center transition-colors duration-200"
            >
              <TachoBasura className="h-4 w-4 mr-2" />
              Eliminar
            </button>
          </div>
        </div>
      </div>

      
    </>
  )
}