-- Insertar datos en MEMBRESIAS
INSERT INTO MEMBRESIAS (codMembresia, nombre, costo, descripcion, cuposDia) VALUES
(1, 'Básico', 30.00, 'Acceso a gimnasio básico', 20),
(2, 'Avanzado', 50.00, 'Acceso a gimnasio con clases grupales', 15),
(3, 'Premium', 70.00, 'Acceso completo y asesoría personalizada', 10);

-- Insertar datos en ROLES
INSERT INTO ROLES (nombre) VALUES
('Cliente'),
('Profesional'),
('Administrador');

-- Insertar datos en USUARIOS
INSERT INTO USUARIOS (dni, nombre, apellido, contrasenia, fechaNac, sexo, telefono, mail, codMembresia, fechaInscripcion) VALUES
(12345678, 'Juan', 'Pérez', 'contrasenia123', '1990-01-15', 'Masculino', '123456789', 'juan.perez@email.com', 1, '2024-01-01'),
(23456789, 'Ana', 'Gómez', 'contrasenia456', '1985-06-30', 'Femenino', '987654321', 'ana.gomez@email.com', 2, '2024-02-15'),
(34567890, 'Pedro', 'López', 'contrasenia789', '2000-08-25', 'Masculino', '555555555', 'pedro.lopez@email.com', 3, '2024-03-10'),
(45678901, 'Lucía', 'Fernández', 'contrasenia012', '1995-12-05', 'Femenino', '666666666', 'lucia.fernandez@email.com', 1, '2024-01-20'),
(56789012, 'Carlos', 'Martínez', 'contrasenia345', '1992-04-12', 'Masculino', '777777777', 'carlos.martinez@email.com', 2, '2024-02-20');

-- Insertar datos en USUARIOS_ROLES
INSERT INTO USUARIOS_ROLES (dni, idRol) VALUES
(12345678, 1),
(23456789, 1),
(34567890, 2),
(45678901, 1),
(56789012, 1),
(23456789, 3),  -- Ana también es Administradora
(34567890, 3);  -- Pedro también es Administrador

-- Insertar datos en PAGOS
INSERT INTO PAGOS (dniCliente, fecha, descripcion, monto, metodo) VALUES
(12345678, '2024-01-15', 'Pago Membresía Básico', 30.00, 'Tarjeta'),
(23456789, '2024-02-15', 'Pago Membresía Avanzado', 50.00, 'Efectivo'),
(34567890, '2024-03-10', 'Pago Membresía Premium', 70.00, 'Tarjeta');

-- Insertar datos en EJERCICIOS
INSERT INTO EJERCICIOS (nombre) VALUES
('Flexiones'),
('Sentadillas'),
('Abdominales'),
('Prensa'),
('Dominadas'),
('Burpees'),
('Zancadas'),
('Remo'),
('Cardio'),
('Plancha');

-- Insertar datos en SEGUIMIENTOS_GYM
INSERT INTO SEGUIMIENTOS_GYM (dniCliente, fechaSeguimiento, codEjercicio, repeticiones, peso) VALUES
(12345678, '2024-04-10', 1, 15, 0.0),
(12345678, '2024-04-10', 2, 20, 0.0),
(23456789, '2024-04-15', 3, 25, 0.0),
(34567890, '2024-04-20', 4, 10, 50.0),
(45678901, '2024-04-25', 5, 12, 60.0);

-- Insertar datos en CUPO_OTORGADO
INSERT INTO CUPO_OTORGADO (fecha, horaInicio, dniCliente, dniInstructor, estado, horaIngreso, horaCancelacion) VALUES
('2024-05-01', '08:00:00', 12345678, 23456789, 'Confirmado', '07:55:00', NULL),
('2024-05-02', '09:00:00', 23456789, 34567890, 'Cancelado', '08:55:00', '09:15:00'),
('2024-05-03', '10:00:00', 34567890, 45678901, 'Confirmado', '09:55:00', NULL);

-- Insertar datos en RUTINAS
INSERT INTO RUTINAS (dniCliente, fechaPeticion, fechaCarga, peticion, dniInstructor, tipoUsuario) VALUES
(12345678, '2024-05-01', '2024-05-02', 'Rutina básica de fuerza', 23456789, 'Cliente'),
(23456789, '2024-05-03', '2024-05-04', 'Rutina avanzada de resistencia', 34567890, 'Cliente'),
(34567890, '2024-05-05', '2024-05-06', 'Rutina personalizada para musculación', 45678901, 'Cliente');

-- Insertar datos en LINEAS_RUTINA
INSERT INTO LINEAS_RUTINA (idRutina, dia, orden, repeticiones, series, codEjercicio) VALUES
(1, 1, 1, 15, 3, 1),
(1, 1, 2, 20, 3, 2),
(2, 2, 1, 25, 4, 3),
(3, 3, 1, 12, 4, 4);

-- Insertar datos en RUTINAS_PRE_ESTABLECIDAS
INSERT INTO RUTINAS_PRE_ESTABLECIDAS (sexo, nroDias) VALUES
('Masculino', 3),
('Femenino', 3),
('Masculino', 5);

-- Insertar datos en LINEAS_RUTINA_PRE_ESTABLECIDA
INSERT INTO LINEAS_RUTINA_PRE_ESTABLECIDA (idRutinaPre, dia, orden, repeticiones, series, codEjercicio) VALUES
(1, 1, 1, 20, 3, 1),
(1, 2, 1, 15, 4, 2),
(2, 1, 1, 25, 4, 3),
(3, 1, 1, 12, 4, 4);

-- Insertar datos en ESQUEMACUPOS
INSERT INTO ESQUEMACUPOS (diaSemana, horario, estado, cupo, dniInstructor) VALUES
('Lunes', '08:00:00', 'Disponible', 10, 23456789),
('Martes', '09:00:00', 'Ocupado', 5, 34567890),
('Miércoles', '10:00:00', 'Disponible', 8, 45678901),
('Jueves', '11:00:00', 'Disponible', 12, 12345678);
