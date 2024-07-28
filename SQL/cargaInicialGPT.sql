-- Cargar datos iniciales en la tabla USUARIOS
INSERT INTO USUARIOS (dni, tipoUsuario, nombre, apellido, contrasenia, fechaNac, sexo, telefono, mail, fechaInscripcion) VALUES
(12345678, 'Instructor', 'John', 'Doe', 'password123', '1980-05-15', 'M', '123-456-7890', 'john.doe@example.com', '2020-01-01'),
(87654321, 'Cliente', 'Jane', 'Smith', 'password456', '1990-08-25', 'F', '987-654-3210', 'jane.smith@example.com', '2021-06-01');

-- Cargar datos iniciales en la tabla MEMBRESIAS
INSERT INTO MEMBRESIAS (codMembresia, nombre, costo, descripción, cuposDia) VALUES
(1, 'Basic', 29.99, 'Basic Membership', 10),
(2, 'Premium', 49.99, 'Premium Membership', 20);

-- Cargar datos iniciales en la tabla CLIENTES
INSERT INTO CLIENTES (dniCliente, tipoUsuario, estado, codMembresia) VALUES
(87654321, 'Cliente', 'Activo', 1);

-- Cargar datos iniciales en la tabla PAGOS
INSERT INTO PAGOS (dniCliente, fecha, descripcion, monto, método) VALUES
(87654321, '2023-07-01', 'Monthly Fee', 29.99, 'Credit Card');

-- Cargar datos iniciales en la tabla EJERCICIOS
INSERT INTO EJERCICIOS (nombre) VALUES
('Push-up'),
('Squat'),
('Pull-up');

-- Cargar datos iniciales en la tabla SEGUIMIENTOS_GYM
INSERT INTO SEGUIMIENTOS_GYM (dniCliente, fechaSeguimiento) VALUES
(87654321, '2023-07-15');

-- Cargar datos iniciales en la tabla LINEAS_SEGUIMIENTO
INSERT INTO LINEAS_SEGUIMIENTO (dniCliente, fechaSeguimiento, codEjercicio, repeticiones, peso) VALUES
(87654321, '2023-07-15', 1, 10, 0.0),
(87654321, '2023-07-15', 2, 15, 0.0);

-- Cargar datos iniciales en la tabla CUPO_OTORGADO
INSERT INTO CUPO_OTORGADO (fecha, horaInicio, dniCliente, dniInstructor, tipoUsuario, estado, horaIngreso, horaReserva, horaCancelacion) VALUES
('2023-07-20', '08:00:00', 87654321, 12345678, 'Instructor', 'Reservado', '08:05:00', '2023-07-19 10:00:00', NULL);

-- Cargar datos iniciales en la tabla RUTINAS
INSERT INTO RUTINAS (dniCliente, fechaPeticion, fechaCarga, peticion, dniInstructor, tipoUsuario) VALUES
(87654321, '2023-07-18', '2023-07-19', 'Necesito una rutina de fuerza.', 12345678, 'Instructor');

-- Cargar datos iniciales en la tabla LINEAS_RUTINA
INSERT INTO LINEAS_RUTINA (dniCliente, fechaPeticion, dia, orden, repeticiones, series, codEjercicio) VALUES
(87654321, '2023-07-18', 'Lunes', 1, 10, 3, 1),
(87654321, '2023-07-18', 'Lunes', 2, 15, 3, 2);

-- Cargar datos iniciales en la tabla RUTINAS_PRE_ESTABLECIDAS
INSERT INTO RUTINAS_PRE_ESTABLECIDAS (sexo, nroDias) VALUES
('M', '3'),
('F', '5');

-- Cargar datos iniciales en la tabla LINEAS_RUTINA_PRE_ESTABLECIDA
INSERT INTO LINEAS_RUTINA_PRE_ESTABLECIDA (sexo, nroDias, dia, orden, repeticiones, series, codEjercicio) VALUES
('M', '3', 1, 1, 12, 3, 1),
('F', '5', 1, 1, 15, 3, 2);

-- Cargar datos iniciales en la tabla ESQUEMACUPOS
INSERT INTO ESQUEMACUPOS (diaSemana, horario, estado, cupo, dniInstructor, tipoUsuario) VALUES
('Lunes', '08:00:00', 'Disponible', 5, 12345678, 'Instructor'),
('Martes', '09:00:00', 'Disponible', 5, 12345678, 'Instructor');
