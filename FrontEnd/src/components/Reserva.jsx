export function Reserva({ clase, onClick }) {

  const formatHora = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  };

  
  return (
    <div className="bg-orange-100 shadow-md rounded-lg p-4 mb-4 hover:shadow-lg cursor-pointer " >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">Reserva Actual</h3>
        <span className="text-sm font-medium text-gray-600">{clase.horaInicio}</span>
      </div>
      <div className="space-y-2 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Instructor:</span> {clase.dniInstructor}
        </p>
        <p className="text-sm text-gray-800">
          Hora de la reserva {formatHora(clase.horaReserva)}
        </p>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none"
        onClick={onClick}
      >
        Cancelar Reserva
      </button>

    </div>
  );
}
