CREATE TABLE MEMBRESIAS (
    codMembresia INT PRIMARY KEY,
    nombre VARCHAR(255),
    costo DECIMAL(10, 2),
    descripcion VARCHAR(255),  -- Cambié "descripción" a "descripcion" por consistencia
    cuposDia INT
);

CREATE TABLE USUARIOS (
    dni INT NOT NULL,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    contrasenia VARCHAR(255) NOT NULL,
    fechaNac DATE,
    sexo VARCHAR(255),
    telefono VARCHAR(255),
    mail VARCHAR(255),
    codMembresia INT,
    fechaInscripcion DATE,
    PRIMARY KEY (dni),
    FOREIGN KEY (codMembresia) REFERENCES MEMBRESIAS(codMembresia)
);

CREATE TABLE ROLES(
    idRol INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255)
);

CREATE TABLE USUARIOS_ROLES(
    dni INT,
    idRol INT,
    PRIMARY KEY (dni, idRol),
    FOREIGN KEY (dni) REFERENCES USUARIOS(dni) ON DELETE CASCADE, 
    FOREIGN KEY (idRol) REFERENCES ROLES(idRol)
);



CREATE TABLE PAGOS (
    dniCliente INT,
    fecha DATE,
    descripcion VARCHAR(255),
    monto DECIMAL(10, 2),
    metodo VARCHAR(255),  -- Cambié "método" a "metodo" por consistencia
    PRIMARY KEY (dniCliente, fecha),
    FOREIGN KEY (dniCliente) REFERENCES USUARIOS(dni)
);

CREATE TABLE EJERCICIOS (
    codEjercicio INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255)
);

CREATE TABLE SEGUIMIENTOS_GYM (
    dniCliente INT,
    fechaSeguimiento DATE,
    idSeguimiento INT AUTO_INCREMENT PRIMARY KEY,
    codEjercicio INT,
    repeticiones INT,
    peso DECIMAL(10, 2),
    FOREIGN KEY (dniCliente) REFERENCES USUARIOS(dni),
    FOREIGN KEY (codEjercicio) REFERENCES EJERCICIOS(codEjercicio)
);



CREATE TABLE CUPO_OTORGADO (
    idCupo INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE,
    horaInicio TIME,
    dniCliente INT,
    dniInstructor INT,
    estado VARCHAR(255),
    horaIngreso TIME,
    horaReserva  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    horaCancelacion TIME,
    FOREIGN KEY (dniInstructor) REFERENCES USUARIOS(dni),
    FOREIGN KEY (dniCliente) REFERENCES USUARIOS(dni)
);


CREATE TABLE RUTINAS (
    idRutina INT AUTO_INCREMENT PRIMARY KEY,
    dniCliente INT,
    fechaPeticion DATE,
    fechaCarga DATE,
    peticion TEXT,
    dniInstructor INT,
    tipoUsuario VARCHAR(255),
    UNIQUE (dniCliente, fechaPeticion),
    FOREIGN KEY (dniInstructor) REFERENCES USUARIOS(dni),
    FOREIGN KEY (dniCliente) REFERENCES USUARIOS(dni)
);

CREATE TABLE LINEAS_RUTINA (
    idRutina INT,
    dia INT,
    orden INT,
    repeticiones INT,
    series INT,
    codEjercicio INT,
    PRIMARY KEY (idRutina,dia, orden),
    FOREIGN KEY (idRutina) REFERENCES RUTINAS(idRutina),
    FOREIGN KEY (codEjercicio) REFERENCES EJERCICIOS(codEjercicio)
);

CREATE TABLE RUTINAS_PRE_ESTABLECIDAS (
    idRutinaPre INT AUTO_INCREMENT PRIMARY KEY,
    sexo VARCHAR(255),
    nroDias INT,
    UNIQUE (sexo, nroDias)
);

CREATE TABLE LINEAS_RUTINA_PRE_ESTABLECIDA (
    idRutinaPre INT,
    dia INT,
    orden INT,
    repeticiones INT,
    series INT,
    codEjercicio INT,
    PRIMARY KEY (idRutinaPre, dia ,orden),
    FOREIGN KEY (idRutinaPre) REFERENCES RUTINAS_PRE_ESTABLECIDAS(idRutinaPre),
    FOREIGN KEY (codEjercicio) REFERENCES EJERCICIOS(codEjercicio)
);

CREATE TABLE ESQUEMACUPOS (
    diaSemana VARCHAR(255),
    horario TIME,
    estado VARCHAR(255),
    cupo INT,
    dniInstructor INT,
    PRIMARY KEY (diaSemana, horario),
    FOREIGN KEY (dniInstructor) REFERENCES USUARIOS(dni)
);

