import { useEffect } from "react";
import { useParams, useNavigate, Link} from "react-router-dom";
import { useSeguimiento } from "../../context/Seguimiento/SeguimientoProvider";
import { useUsuario } from "../../context/Usuario/UsuarioProvider";

import { Cliente } from "../../components/Cliente";
import { Ejercicio } from "../../components/Ejercicio";
import { Seguimiento } from "../../components/Seguimiento";

export const ListadoClientesSeguimiento = () => {
  const { dni, codEjercicio } = useParams();
  const navigate = useNavigate();

  const {comprobarToken} =  useUsuario();
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
    setSeguimientos,
  } = useSeguimiento();

  useEffect(() => {
    loadClientesSeguimiento();
    loadEjercicios();
    if (dni) {
      loadCliente(dni);
    }
    if (codEjercicio) {
      loadEjercicio(codEjercicio);
    }
  }, []);

  useEffect(() => {
    comprobarToken();
    if (dni) {
      loadCliente(dni);
      setSeguimientos([]); // Limpiar seguimientos al cambiar de cliente
    }
  }, [dni]);



  useEffect(() => {
    if (dni && codEjercicio) {
      loadEjercicio(codEjercicio);
      loadSeguimientos(dni, codEjercicio); // Cargar seguimientos cuando cliente y ejercicio estén disponibles
    }
  }, [codEjercicio]);

  const handleClienteClick = (cliente) => {
    navigate(`/seguimiento/lista/${cliente.dni}`, { replace: false });
    setCliente(cliente);
  };
  const handleEjercicioClick = (ejercicio) => {
    navigate(`/seguimiento/lista/${dni}/${ejercicio.codEjercicio}`, {
      replace: false,
    });
    setEjercicio(ejercicio);
    setSeguimientos([]);
    loadSeguimientos(cliente.dni, ejercicio.codEjercicio);
  };

  const renderSeguimientos = () => {
    if (dni && codEjercicio) {
      return (
        <div>
          <h2>
            Seguimientos del cliente {cliente.nombre} con DNI: {cliente.dni} y
            ejercicio: {ejercicio.nombre}
          </h2>
          {seguimientos.length === 0 ? (
            <p>No hay seguimientos para este cliente y ejercicio</p>
          ) : (
            <ul>
              {seguimientos.map((seguimiento) => (
                <li key={seguimiento.idSeguimiento}>
                  <Seguimiento seguimiento={seguimiento} />
                </li>
              ))}
            </ul>
          )}
          <Link to ={`/seguimiento/new/${dni}/${codEjercicio}`} >Crear un seg nuevo</Link>
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
