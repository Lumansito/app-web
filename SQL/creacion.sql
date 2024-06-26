CREATE TABLE USUARIOS (
    dni INT NOT NULL,
    tipoUsuario VARCHAR(255) NOT NULL ,
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
    descripción VARCHAR(255),
    cuposDia INT
);

CREATE TABLE CLIENTES (
    dniCliente INT NOT NULL,
    estado VARCHAR(255) DEFAULT 'Activo',
    codMembresia INT,
    PRIMARY KEY (dniCliente),
    FOREIGN KEY (dniCliente) REFERENCES USUARIOS(dni),
    FOREIGN KEY (codMembresia) REFERENCES MEMBRESiAS(codMembresia)
);



CREATE TABLE PAGOS (
    dniCliente INT,
    fecha DATE,
    descripcion VARCHAR(255),
    monto DECIMAL(10, 2),
    método VARCHAR(255),
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

CREATE TABLE CLASES (
    fecha DATE,
    horaInicio TIME,
    dniInstructor INT,
    tipoUsuario VARCHAR(255),
    PRIMARY KEY (fecha, horaInicio),
    FOREIGN KEY (dniInstructor, tipoUsuario) REFERENCES USUARIOS(dni, tipoUsuario)
);

CREATE TABLE CUPO_OTORGADO (
    fecha DATE,
    horaInicio TIME,
    dniCliente INT,
    estado VARCHAR(255),
    horaIngreso TIME,
    horaReserva TIME,
    horaCancelacion TIME,
    PRIMARY KEY (fecha, horaInicio, dniCliente),
    FOREIGN KEY (fecha, horaInicio) REFERENCES CLASES(fecha, horaInicio),
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
    dia VARCHAR(255),
    orden INT,
    repeticiones INT,
    series INT,
    codEjercicio INT,
    PRIMARY KEY (dniCliente, fechaPeticion, dia),
    FOREIGN KEY (dniCliente, fechaPeticion ) REFERENCES RUTINAS(dniCliente, fechaPeticion),
    FOREIGN KEY (codEjercicio) REFERENCES EJERCICIOS(codEjercicio)
);

CREATE TABLE RUTINAS_PRE_ESTABLECIDAS (
    sexo VARCHAR(255),
    nroDias VARCHAR(255),
    PRIMARY KEY (sexo, nroDias)
);

CREATE TABLE LINEAS_RUTINA_PRE_ESTABLECIDA (
    sexo VARCHAR(255),
    nroDias VARCHAR(255),
    dia VARCHAR(255),
    orden INT,
    repeticiones INT,
    series INT,
    codEjercicio INT,
    PRIMARY KEY (sexo, nroDias, orden),
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
