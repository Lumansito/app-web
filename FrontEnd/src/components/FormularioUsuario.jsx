import React from "react";

export function FormularioUsuario({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onInputChange,
  onRoleChange,
  error,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
      <div className="bg-white p-4 rounded shadow-lg w-full max-w-md max-h-full overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {formData.dni ? "Editar Usuario" : "Añadir Usuario"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block mb-1">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
                  onChange={onRoleChange}
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
                  onChange={onRoleChange}
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
                  onChange={onRoleChange}
                  className="mr-2"
                />
                Admin
              </label>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
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
  );
}
