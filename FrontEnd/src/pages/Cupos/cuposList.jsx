import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CupoContext } from "../../context/Cupo/CupoContext";
import  DayList  from "../../components/DayList";

function CuposListPage() {
  const { loadCupos, cupos} = useContext(CupoContext); // Usamos el contexto
  const [selectedDay, setSelectedDay] = useState("");
  const daysWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const navigate = useNavigate();

  useEffect(() => {
    loadCupos();
  }, []);

  const handleSelect = (day) => {
    setSelectedDay(day);
  };

  return (
    <div className="flex flex-col gap-8 items-center">
      <h1 className="text-2xl mb-4">cupos por dia</h1>
      <ul className="bg-gris-acero self-center">
        {daysWeek.map((day) => (
          <li key={day} onClick={() => handleSelect(day)}>
            {day}
          </li>
        ))}
      </ul>
      {selectedDay && (
        <DayList
          day={selectedDay}
          cupos={cupos.filter((cupo) => cupo.dia === selectedDay)}
          navigate={navigate}
        />
      )}
    </div>
  );
}

export default CuposListPage;
