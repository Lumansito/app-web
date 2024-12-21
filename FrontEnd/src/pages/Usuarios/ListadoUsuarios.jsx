import { useEffect, useState } from "react";
import { useUsuarios } from "../../context/Usuarios/proveedorUsuarios.jsx";
import { useNavigate } from "react-router-dom";
import { Usuario } from "../../components/Usuario.jsx";
import { Casa } from "../../assets/Iconos/Casa.jsx";
import { FormularioUsuario } from "../../components/FormularioUsuario.jsx";
import toast from "react-hot-toast";
import { ms } from "date-fns/locale";

export function ListadoUsuarios() {
  const { 
    cargarUsuarios,
    usuarios,
    crearUsuario,
    eliminarUsuario,
    actualizarUsuario 
  } = useUsuarios();

  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    fechaNac: "",
    mail: "",
    dni: "",
    contrasenia: "",
    confirmarContrasenia: "",
    sexo: "",
    telefono: "",
    roles: []
  });
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    cargarUsuarios();
  }, []);

  useEffect(() => {
    setUsuariosFiltrados(usuarios);
  }, [usuarios]);

  useEffect(() => {
    const filtrados = usuarios.filter((user) => 
      user.dni.toString().includes(filter) || 
      user.nombre.toLowerCase().includes(filter.toLowerCase()) ||
      user.apellido.toLowerCase().includes(filter.toLowerCase())
    );
    setUsuariosFiltrados(filtrados);
  }, [filter, usuarios]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      roles: checked
        ? [...prevState.roles, parseInt(value)]
        : prevState.roles.filter(role => role !== parseInt(value))
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.contrasenia !== formData.confirmarContrasenia) {
      setError("Las contraseñas no coinciden");
      return;
    }
  
    try {
      
      let respuesta;
      if (editingUser) {
        respuesta = await actualizarUsuario(formData.dni, formData);
      } else {
        respuesta = await crearUsuario(formData);
      }
      
      if (respuesta.correcto) {
        toast.success("Usuario guardado correctamente");
  
      } else {
        toast.error("Ocurrió un error al guardar el usuario");
      }
  
     
      setIsModalOpen(false);
      setEditingUser(null);
      setFormData({
        nombre: "",
        apellido: "",
        fechaNac: "",
        mail: "",
        dni: "",
        contrasenia: "",
        confirmarContrasenia: "",
        sexo: "",
        telefono: "",
        roles: []
      });
    } catch (error) {
      
      toast.error("Se produjo un error inesperado");
      
    }
  };

  const editUser = (user) => {
    setEditingUser(user);
    setFormData({
      ...user,
      roles: user.roles.map(role => parseInt(role))
    });
    setIsModalOpen(true);
  };

  const deleteUser = (dni) => {
    eliminarUsuario(dni);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="in-h-screen bg-white text-black p-4 relative">
      <button
        onClick={handleGoHome}
        className="absolute top-4 left-4 p-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 transition-colors"
        aria-label="Ir al inicio"
      >
        <Casa className="h-5 w-5" />
      </button>
      <div className="max-w-md mx-auto mt-12">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleGoBack}
            className="px-3 py-1 bg-gray-200 text-black text-sm rounded hover:bg-gray-300 transition-colors"
          >
            Volver
          </button>
          <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
        </div>
      
      <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
        <input
          type="text"
          placeholder="Filtrar por DNI, Nombre o Apellido"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded mb-2 sm:mb-0"
        />
        <button 
          onClick={() => {
            setEditingUser(null);
            setFormData({
              nombre: "",
              apellido: "",
              fechaNac: "",
              mail: "",
              dni: "",
              contrasenia: "",
              confirmarContrasenia: "",
              sexo: "",
              telefono: "",
              roles: []
            });
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Añadir Usuario
        </button>
        
        <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
          {usuariosFiltrados && usuariosFiltrados.length > 0 ? (
            usuariosFiltrados.map((user) => (
              <Usuario key={user.dni} usuario={user} editar={editUser} eliminar={deleteUser} />
            ))
          ) : (
            <p>No hay usuarios disponibles</p>
          )}
        </div>
      </div>
      {isModalOpen && (
      <FormularioUsuario
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        formData={formData}
        onInputChange={handleInputChange}
        onRoleChange={handleRoleChange}
      />
    )}
    </div>
    </div>
  );
}