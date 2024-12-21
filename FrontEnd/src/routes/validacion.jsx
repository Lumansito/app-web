import {Link} from "react-router-dom";
import {Cruz} from "../assets/Iconos/Cruz";

export function Validacion({rol, children, esperado}) {
    if (esperado === "alguno") {
        return <>{children}</>}
    if (rol.includes(esperado)) {
        return <>{children}</>;
    } else {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="bg-red-500 px-4 py-2 flex items-center justify-center">
                        <Cruz className="h-6 w-6 text-white" />
                        <h1 className="text-xl font-bold text-white">Acceso Denegado</h1>
                    </div>
                    <div className="px-4 py-4 sm:px-6">
                        <p className="text-gray-700 text-center mb-4">
                            Lo sentimos, no tienes permisos para ver esta página.
                        </p>
                        <Link
                            to="/"
                            className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center justify-center"
                        >
                            <svg
                                className="h-5 w-5 mr-2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                            </svg>
                            Volver al Inicio
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
  