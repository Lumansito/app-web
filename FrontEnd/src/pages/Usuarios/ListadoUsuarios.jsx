import { useEffect, useState } from "react";
import { useUsuarios } from "../../context/Usuarios/proveedorUsuarios.jsx";
import { Usuario } from "../../components/Usuario.jsx";

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
  const [error, setError] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.contrasenia !== formData.confirmarContrasenia) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setError("");
    if (editingUser) {
      actualizarUsuario(formData.dni,formData);
    } else {
      crearUsuario(formData);
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
      <div className="flex flex-col sm:flex-row justify-between mb-4">
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
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Añadir Usuario
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {usuariosFiltrados && usuariosFiltrados.length > 0 ? (
          usuariosFiltrados.map((user) => (
            <Usuario key={user.dni} usuario={user} editar={editUser} eliminar={deleteUser} />
          ))
        ) : (
          <p>No hay usuarios disponibles</p>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
          <div className="bg-white p-4 rounded shadow-lg w-full max-w-md max-h-full overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingUser ? "Editar Usuario" : "Añadir Usuario"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block mb-1">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="apellido" className="block mb-1">Apellido:</label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="fechaNac" className="block mb-1">Fecha de Nacimiento:</label>
                <input
                  type="date"
                  id="fechaNac"
                  name="fechaNac"
                  value={formData.fechaNac}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="mail" className="block mb-1">Email:</label>
                <input
                  type="email"
                  id="mail"
                  name="mail"
                  value={formData.mail}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="dni" className="block mb-1">DNI:</label>
                <input
                  type="text"
                  id="dni"
                  name="dni"
                  value={formData.dni}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="contrasenia" className="block mb-1">Contraseña:</label>
                <input
                  type="password"
                  id="contrasenia"
                  name="contrasenia"
                  value={formData.contrasenia}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="confirmarContrasenia" className="block mb-1">Confirmar Contraseña:</label>
                <input
                  type="password"
                  id="confirmarContrasenia"
                  name="confirmarContrasenia"
                  value={formData.confirmarContrasenia}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div>
                <label htmlFor="sexo" className="block mb-1">Sexo:</label>
                <select
                  id="sexo"
                  name="sexo"
                  value={formData.sexo}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="">Seleccione...</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div>
                <label htmlFor="telefono" className="block mb-1">Teléfono:</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Roles:</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="roles"
                      value="1"
                      checked={formData.roles.includes(1)}
                      onChange={handleRoleChange}
                      className="mr-2"
                    />
                    Cliente
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="roles"
                      value="2"
                      checked={formData.roles.includes(2)}
                      onChange={handleRoleChange}
                      className="mr-2"
                    />
                    Profesional
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="roles"
                      value="3"
                      checked={formData.roles.includes(3)}
                      onChange={handleRoleChange}
                      className="mr-2"
                    />
                    Admin
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}