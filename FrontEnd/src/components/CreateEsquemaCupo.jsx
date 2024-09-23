import { useState } from "react";
import { useCupos } from "../../context/Cupo/CupoProvider";
import { useNavigate } from "react-router-dom";

const CreateEsquemaCupo = () => {
  const { createCupo } = useCupos();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    diaSemana: "",
    horario: "",
    estado: "",
    cupo: 0,
    dniInstructor: 0,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createCupo(formData);
      navigate("/cupos"); // Redirigir a la lista de cupos
    } catch (error) {
      setError("Error al crear el cupo");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Cupo</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        name="diaSemana"
        onChange={handleChange}
        placeholder="Día de la semana"
        required
      />
      <input type="time" name="horario" onChange={handleChange} required />
      <input
        type="text"
        name="estado"
        onChange={handleChange}
        placeholder="Estado"
        required
      />
      <input
        type="number"
        name="cupo"
        onChange={handleChange}
        placeholder="Cupo"
        required
      />
      <input
        type="number"
        name="dniInstructor"
        onChange={handleChange}
        placeholder="DNI Instructor"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Creando..." : "Crear Cupo"}
      </button>
    </form>
  );
};

export default CreateEsquemaCupo;
