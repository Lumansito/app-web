import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSeguimiento } from "../../context/Seguimiento/proveedorSeguimiento.jsx";
import { useUsuario } from "../../context/Usuario/proveedorUsuario.jsx";
import { Cliente } from "../../components/Cliente";
import { Ejercicio } from "../../components/Ejercicio";
import { Seguimiento } from "../../components/Seguimiento";

export const ListadoClientesSeguimiento = () => {
  const { dni, codEjercicio } = useParams();
  const navigate = useNavigate();

  const { comprobarToken } = useUsuario();
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
      setSeguimientos([]);
    }
  }, [dni]);

  useEffect(() => {
    if (dni && codEjercicio) {
      loadEjercicio(codEjercicio);
      loadSeguimientos(dni, codEjercicio);
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

  const handleGoBack = () => {
    if (dni && codEjercicio) {
      navigate(`/seguimiento/lista/${dni}`, { replace: true });
    } else if (dni && !codEjercicio) {
      navigate("/seguimiento/lista", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const renderSeguimientos = () => {
    if (dni && codEjercicio) {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Seguimientos del cliente {cliente.nombre} con DNI: {cliente.dni} y
            ejercicio: {ejercicio.nombre}
          </h2>
          {seguimientos.length === 0 ? (
            <p className="text-gray-600">No hay seguimientos para este cliente y ejercicio</p>
          ) : (
            <ul className="space-y-2">
              {seguimientos.map((seguimiento) => (
                <li key={seguimiento.idSeguimiento} className="bg-gray-100 p-3 rounded-lg">
                  <Seguimiento seguimiento={seguimiento} />
                </li>
              ))}
            </ul>
          )}
          <Link
            to={`/seguimiento/new/${dni}/${codEjercicio}`}
            className="block w-full py-2 px-4 bg-gray-200 text-black text-center rounded hover:bg-gray-300 transition-colors"
          >
            Crear un seguimiento nuevo
          </Link>
        </div>
      );
    } else if (dni) {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Seleccione el ejercicio</h2>
          <ul className="space-y-2">
            {ejercicios.map((ejercicio) => (
              <li key={ejercicio.codEjercicio} className="bg-gray-100 p-3 rounded-lg">
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
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Selecciona un cliente para ver sus seguimientos</h2>
          <ul className="space-y-2">
            {clientes.map((cliente) => (
              <li key={cliente.dni} className="bg-gray-100 p-3 rounded-lg">
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
    <div className="min-h-screen bg-white text-black p-4 relative">
      <button
        onClick={handleGoHome}
        className="absolute top-4 left-4 px-4 py-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 transition-colors"
        aria-label="Ir al inicio"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </button>
      <div className="max-w-md mx-auto mt-12">
        <button
          onClick={handleGoBack}
          className="mb-4 px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition-colors"
        >
          ← Volver
        </button>
        <h1 className="text-2xl font-bold text-center mb-6">
          Listado de Clientes con membresía apta para seguimientos
        </h1>
        <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
          <div className="p-4">{renderSeguimientos()}</div>
        </div>
      </div>
    </div>
  );
};