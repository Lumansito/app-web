CREATE TABLE USUARIOS (
    dni INT NOT NULL,
    tipoUsuario VARCHAR(255) NOT NULL,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    contrasenia VARCHAR(255) NOT NULL,
    fechaNac DATE,
    sexo VARCHAR(255),
    telefono VARCHAR(255),
    mail VARCHAR(255),
    fechaInscripcion DATE,
    PRIMARY KEY (dni, tipoUsuario)
);

CREATE TABLE MEMBRESIAS (
    codMembresia INT PRIMARY KEY,
    nombre VARCHAR(255),
    costo DECIMAL(10, 2),
    descripcion VARCHAR(255),  -- Cambié "descripción" a "descripcion" por consistencia
    cuposDia INT
);

CREATE TABLE CLIENTES (
    dniCliente INT NOT NULL,
    tipoUsuario VARCHAR(255) NOT NULL,
    estado VARCHAR(255) DEFAULT 'Activo',
    codMembresia INT,
    PRIMARY KEY (dniCliente),
    FOREIGN KEY (dniCliente, tipoUsuario) REFERENCES USUARIOS(dni, tipoUsuario),
    FOREIGN KEY (codMembresia) REFERENCES MEMBRESIAS(codMembresia)
);

CREATE TABLE PAGOS (
    dniCliente INT,
    fecha DATE,
    descripcion VARCHAR(255),
    monto DECIMAL(10, 2),
    metodo VARCHAR(255),  -- Cambié "método" a "metodo" por consistencia
    PRIMARY KEY (dniCliente, fecha),
    FOREIGN KEY (dniCliente) REFERENCES CLIENTES(dniCliente)
);

CREATE TABLE EJERCICIOS (
    codEjercicio INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255)
);

CREATE TABLE SEGUIMIENTOS_GYM (
    dniCliente INT,
    fechaSeguimiento DATE,
    PRIMARY KEY (dniCliente, fechaSeguimiento),
    FOREIGN KEY (dniCliente) REFERENCES CLIENTES(dniCliente)
);

CREATE TABLE LINEAS_SEGUIMIENTO (
    dniCliente INT,
    fechaSeguimiento DATE,
    codEjercicio INT,
    repeticiones INT,
    peso DECIMAL(10, 2),
    PRIMARY KEY (dniCliente, fechaSeguimiento, codEjercicio),
    FOREIGN KEY (dniCliente, fechaSeguimiento) REFERENCES SEGUIMIENTOS_GYM(dniCliente, fechaSeguimiento),
    FOREIGN KEY (codEjercicio) REFERENCES EJERCICIOS(codEjercicio)
);

CREATE TABLE CUPO_OTORGADO (
    fecha DATE,
    horaInicio TIME,
    dniCliente INT,
    dniInstructor INT,
    tipoUsuario VARCHAR(255),
    estado VARCHAR(255),
    horaIngreso TIME,
    horaReserva TIME,
    horaCancelacion TIME,
    PRIMARY KEY (fecha, horaInicio, dniCliente),
    FOREIGN KEY (dniInstructor, tipoUsuario) REFERENCES USUARIOS(dni, tipoUsuario),
    FOREIGN KEY (dniCliente) REFERENCES CLIENTES(dniCliente)
);

CREATE TABLE RUTINAS (
    dniCliente INT,
    fechaPeticion DATE,
    fechaCarga DATE,
    peticion TEXT,
    dniInstructor INT,
    tipoUsuario VARCHAR(255),
    PRIMARY KEY (dniCliente, fechaPeticion),
    FOREIGN KEY (dniInstructor, tipoUsuario) REFERENCES USUARIOS(dni, tipoUsuario),
    FOREIGN KEY (dniCliente) REFERENCES CLIENTES(dniCliente)
);

CREATE TABLE LINEAS_RUTINA (
    dniCliente INT,
    fechaPeticion DATE,
    dia INT,
    orden INT,
    repeticiones INT,
    series INT,
    codEjercicio INT,
    PRIMARY KEY (dniCliente, fechaPeticion, dia, orden),
    FOREIGN KEY (dniCliente, fechaPeticion) REFERENCES RUTINAS(dniCliente, fechaPeticion),
    FOREIGN KEY (codEjercicio) REFERENCES EJERCICIOS(codEjercicio)
);

CREATE TABLE RUTINAS_PRE_ESTABLECIDAS (
    sexo VARCHAR(255),
    nroDias INT,
    PRIMARY KEY (sexo, nroDias)
);

CREATE TABLE LINEAS_RUTINA_PRE_ESTABLECIDA (
    sexo VARCHAR(255),
    nroDias INT,
    dia INT,
    orden INT,
    repeticiones INT,
    series INT,
    codEjercicio INT,
    PRIMARY KEY (sexo, nroDias, dia,orden),
    FOREIGN KEY (sexo, nroDias) REFERENCES RUTINAS_PRE_ESTABLECIDAS(sexo, nroDias),
    FOREIGN KEY (codEjercicio) REFERENCES EJERCICIOS(codEjercicio)
);

CREATE TABLE ESQUEMACUPOS (
    diaSemana VARCHAR(255),
    horario TIME,
    estado VARCHAR(255),
    cupo INT,
    dniInstructor INT,
    tipoUsuario VARCHAR(255),
    PRIMARY KEY (diaSemana, horario),
    FOREIGN KEY (dniInstructor, tipoUsuario) REFERENCES USUARIOS(dni, tipoUsuario)
);
