-- Inserción de datos en la tabla USUARIOS
INSERT INTO USUARIOS (dni, tipoUsuario, nombre, apellido, contrasenia, fechaNac, sexo, telefono, mail, fechaInscripcion) 
VALUES 
(12345678, 'Instructor', 'John', 'Doe', 'password123', '1980-01-01', 'Masculino', '123456789', 'john.doe@example.com', '2023-01-01'),
(87654321, 'Cliente', 'Jane', 'Smith', 'password456', '1990-02-02', 'Femenino', '987654321', 'jane.smith@example.com', '2023-02-01');

-- Inserción de datos en la tabla MEMBRESIAS
INSERT INTO MEMBRESIAS (codMembresia, nombre, costo, descripción, cuposDia) 
VALUES 
(1, 'Basic', 29.99, 'Acceso a todas las áreas del gimnasio', 30),
(2, 'Premium', 49.99, 'Acceso a todas las áreas y clases especiales', 50);

-- Inserción de datos en la tabla CLIENTES
INSERT INTO CLIENTES (dniCliente, estado, codMembresia) 
VALUES 
(87654321, 'Activo', 1);

-- Inserción de datos en la tabla PAGOS
INSERT INTO PAGOS (dniCliente, fecha, descripcion, monto, método) 
VALUES 
(87654321, '2023-03-01', 'Pago mensual', 29.99, 'Tarjeta de crédito');

-- Inserción de datos en la tabla EJERCICIOS
INSERT INTO EJERCICIOS (nombre) 
VALUES 
('Press de banca'),
('Sentadilla'),
('Peso muerto');

-- Inserción de datos en la tabla SEGUIMIENTOS_GYM
INSERT INTO SEGUIMIENTOS_GYM (dniCliente, fechaSeguimiento) 
VALUES 
(87654321, '2023-03-10');

-- Inserción de datos en la tabla LINEAS_SEGUIMIENTO
INSERT INTO LINEAS_SEGUIMIENTO (dniCliente, fechaSeguimiento, codEjercicio, repeticiones, peso) 
VALUES 
(87654321, '2023-03-10', 1, 10, 50.0),
(87654321, '2023-03-10', 2, 12, 70.0);

-- Inserción de datos en la tabla CLASES
INSERT INTO CLASES (fecha, horaInicio, dniInstructor, tipoUsuario) 
VALUES 
('2023-04-01', '10:00:00', 12345678, 'Instructor');

-- Inserción de datos en la tabla CUPO_OTORGADO
INSERT INTO CUPO_OTORGADO (fecha, horaInicio, dniCliente, estado, horaIngreso, horaReserva, horaCancelacion) 
VALUES 
('2023-04-01', '10:00:00', 87654321, 'Reservado', '10:00:00', '09:50:00', NULL);

-- Inserción de datos en la tabla RUTINAS
INSERT INTO RUTINAS (dniCliente, fechaPeticion, fechaCarga, peticion, dniInstructor, tipoUsuario) 
VALUES 
(87654321, '2023-03-15', '2023-03-16', 'Rutina para ganar masa muscular', 12345678, 'Instructor');

-- Inserción de datos en la tabla LINEAS_RUTINA
INSERT INTO LINEAS_RUTINA (dniCliente, fechaPeticion, dia, orden, repeticiones, series, codEjercicio) 
VALUES 
(87654321, '2023-03-15', 'Lunes', 1, 10, 3, 1),
(87654321, '2023-03-15', 'Miércoles', 1, 12, 4, 2);

-- Inserción de datos en la tabla RUTINAS_PRE_ESTABLECIDAS
INSERT INTO RUTINAS_PRE_ESTABLECIDAS (sexo, nroDias) 
VALUES 
('Masculino', '3d'),
('Femenino', '5d');

-- Inserción de datos en la tabla LINEAS_RUTINA_PRE_ESTABLECIDA
INSERT INTO LINEAS_RUTINA_PRE_ESTABLECIDA (sexo, nroDias, dia, orden, repeticiones, series, codEjercicio) 
VALUES 
('Masculino', '3d', 'Primer', 1, 10, 3, 1),
('Masculino', '3d', 'Primer', 2, 10, 3, 1),
('Masculino', '3d', 'Primer', 3, 10, 3, 1),
('Masculino', '3d', 'Primer', 4, 10, 3, 1),

('Femenino', '5d', 'Martes', 2, 15, 4, 2);

-- Inserción de datos en la tabla ESQUEMACUPOS
INSERT INTO ESQUEMACUPOS (diaSemana, horario, estado, cupo, dniInstructor, tipoUsuario) 
VALUES 
('Lunes', '10:00:00', 'Disponible', 20, 12345678, 'Instructor');
