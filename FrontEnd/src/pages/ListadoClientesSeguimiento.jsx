import { useEffect } from "react";
import { useSeguimiento } from "../context/Seguimiento/SeguimientoProvider";
import { Cliente } from "../components/Cliente";
import { useParams, useNavigate } from "react-router-dom";
import { Ejercicio } from "../components/Ejercicio";

export const ListadoClientesSeguimiento = () => {
  const { dni, codEjercicio } = useParams();
  const navigate = useNavigate();

  const {
    clientes,
    loadClientesSeguimiento,
    ejercicios,
    loadEjercicios,
    seguimientos,
    loadSeguimientos,
    cliente,
    loadCliente,
    ejercicio,
    loadEjercicio,
    setCliente,
    setEjercicio,
  } = useSeguimiento();
  useEffect(() => {
    loadClientesSeguimiento();
    loadEjercicios();
    if(dni){
    loadCliente(dni);
    }
    if(codEjercicio){
    loadEjercicio(codEjercicio);
    }
  }, []);

  const handleClienteClick = (cliente) => {
    navigate(`/seguimiento/${cliente.dni}`, { replace: false });
    setCliente(cliente);
  };
  const handleEjercicioClick = (ejercicio) => {
    navigate(`/seguimiento/${dni}/${ejercicio.codEjercicio}`, {
      replace: false,
    });
    setEjercicio(ejercicio);
  };

  const renderSeguimientos = () => {
    if (dni && codEjercicio) {
      return (
        <div>
          <h2>
            Seguimientos del cliente {cliente.nombre} con DNI: {cliente.dni} y ejercicio: {ejercicio.nombre}
          </h2>
          <ul>
            {seguimientos.map((seguimiento) => (
              <li key={seguimiento.id}>
                {/* Aquí deberías definir cómo quieres renderizar cada seguimiento */}
                {seguimiento.details}
              </li>
            ))}
          </ul>
        </div>
      );
    } else if (dni) {
      return (
        <div>
          <h2>Seleccione el ejercicio</h2>
          <ul>
            {ejercicios.map((ejercicio) => (
              <li key={ejercicio.codEjercicio}>
                <Ejercicio
                  ejercicio={ejercicio}
                  onClick={() => handleEjercicioClick(ejercicio)}
                />
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <h2>Selecciona un cliente para ver sus seguimientos</h2>
          <h2>Clientes</h2>
          <ul>
            {clientes.map((cliente) => (
              <li key={cliente.dni}>
                <Cliente
                  cliente={cliente}
                  onClick={() => handleClienteClick(cliente)}
                />
              </li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return (
    <div>
      <h1>Listado de Clientes con membresía apta para seguimientos</h1>
      {renderSeguimientos()}
    </div>
  );
};
