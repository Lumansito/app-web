import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSeguimiento } from "../../context/Seguimiento/proveedorSeguimiento.jsx";
import { useUsuario } from "../../context/Usuario/ProveedorUsuario.jsx";
import { Cliente } from "../../components/Cliente";
import { Ejercicio } from "../../components/Ejercicio";
import { Seguimiento } from "../../components/Seguimiento";
import toast from "react-hot-toast";
import { Casa } from "../../assets/Iconos/Casa.jsx";

export const ListadoClientesSeguimiento = () => {
  const { dni, codEjercicio } = useParams();
  const navigate = useNavigate();

  const { comprobarToken } = useUsuario();
  const {
    clientes,
    cargarSeguimientoClientes,
    ejercicios,
    cargarEjercicios,
    seguimientos,
    cargarSeguimientosXdni_codEjercicio,
    cliente,
    cargarClienteXdni,
    ejercicio,
    cargarEjercicio,
    asignarCliente,
    asignarEjercicio,
    asignarSeguimientos,
  } = useSeguimiento();
  const [toastMessage, setToastMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    cargarSeguimientoClientes();
    cargarEjercicios();
    if (dni) cargarClienteXdni(dni);
    if (codEjercicio) cargarEjercicio(codEjercicio);
  }, []);
  useEffect(() => {
    comprobarToken();
    if (dni) {
      cargarClienteXdni(dni);
      asignarSeguimientos([]);
    }
  }, [dni]);

  useEffect(() => {
    if (dni && codEjercicio) {
      cargarEjercicio(codEjercicio);
      cargarSeguimientosXdni_codEjercicio(dni, codEjercicio);
    }
  }, [codEjercicio]);

  const handleClienteClick = (cliente) => {
    navigate(`/seguimiento/lista/${cliente.dni}`, { replace: false });
    asignarCliente(cliente);
  };

  const handleEjercicioClick = (ejercicio) => {
    navigate(`/seguimiento/lista/${dni}/${ejercicio.codEjercicio}`, {
      replace: false,
    });
    asignarEjercicio(ejercicio);
    asignarSeguimientos([]);
    cargarSeguimientosXdni_codEjercicio(cliente.dni, ejercicio.codEjercicio);
  };

  const handleGoBack = () => {
    if (dni && codEjercicio)
      navigate(`/seguimiento/lista/${dni}`, { replace: true });
    else if (dni && !codEjercicio)
      navigate("/seguimiento/lista", { replace: true });
    else navigate("/", { replace: true });
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const renderSeguimientos = () => {
    if (dni && codEjercicio) {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Seguimientos del cliente {cliente.nombre} (DNI: {cliente.dni}) y
            ejercicio: {ejercicio.nombre}
          </h2>
          {seguimientos.length === 0 ? (
            <p className="text-gray-600">
              No hay seguimientos para este cliente y ejercicio
            </p>
          ) : (
            <ul className="space-y-2">
              {seguimientos.map((seguimiento) => (
                <li
                  key={seguimiento.idSeguimiento}
                  className="bg-gray-100 p-3 rounded-lg"
                >
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
              <li
                key={ejercicio.codEjercicio}
                className="bg-gray-100 p-3 rounded-lg"
              >
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
          <h2 className="text-xl font-semibold">
            Seleccione un cliente para ver sus seguimientos
          </h2>
          {clientes.length > 0 ? (
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
          ) : (
            <p className="text-gray-500">No hay clientes disponibles.</p>
          )}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-4 relative">
      {toastMessage && (
        <toast
          message={toastMessage}
          success={isSuccess}
          onClose={() => setToastMessage("")}
        />
      )}
      <button
        onClick={handleGoHome}
        className="absolute top-4 left-4 px-4 py-2 bg-gray-200 rounded-full"
      >
        <Casa className="h-5 w-5" />
      </button>
      <div className="max-w-md mx-auto mt-12">
        <button
          onClick={handleGoBack}
          className="mb-4 px-4 py-2 bg-gray-200 rounded"
        >
          Volver
        </button>
        <h1 className="text-2xl font-bold text-center mb-6">
          Listado de Clientes
        </h1>
        <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden p-4">
          {renderSeguimientos()}
        </div>
      </div>
    </div>
  );
};
