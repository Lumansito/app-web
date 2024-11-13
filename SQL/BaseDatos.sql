CREATE DATABASE  IF NOT EXISTS `gym`  ;
USE `gym`;

DROP TABLE IF EXISTS `cupo_otorgado`;
CREATE TABLE `cupo_otorgado` (
  `idCupo` int NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `horaInicio` time DEFAULT NULL,
  `dniCliente` int DEFAULT NULL,
  `dniInstructor` int DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `horaIngreso` time DEFAULT NULL,
  `horaReserva` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `horaCancelacion` time DEFAULT NULL,
  PRIMARY KEY (`idCupo`),
  KEY `dniInstructor` (`dniInstructor`),
  KEY `dniCliente` (`dniCliente`),
  CONSTRAINT `cupo_otorgado_ibfk_1` FOREIGN KEY (`dniInstructor`) REFERENCES `usuarios` (`dni`),
  CONSTRAINT `cupo_otorgado_ibfk_2` FOREIGN KEY (`dniCliente`) REFERENCES `usuarios` (`dni`)
)    


DROP TABLE IF EXISTS `ejercicios`;
CREATE TABLE `ejercicios` (
  `codEjercicio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`codEjercicio`)
)    

DROP TABLE IF EXISTS `esquemacupos`;
CREATE TABLE `esquemacupos` (
  `idEsquema` int NOT NULL AUTO_INCREMENT,
  `diaSemana` varchar(255) DEFAULT NULL,
  `horario` time DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `cupo` int DEFAULT NULL,
  `dniInstructor` int DEFAULT NULL,
  PRIMARY KEY (`idEsquema`),
  UNIQUE KEY `diaSemana` (`diaSemana`,`horario`),
  KEY `dniInstructor` (`dniInstructor`),
  CONSTRAINT `esquemacupos_ibfk_1` FOREIGN KEY (`dniInstructor`) REFERENCES `usuarios` (`dni`)
)    

DROP TABLE IF EXISTS `lineas_rutina`;
CREATE TABLE `lineas_rutina` (
  `idRutina` int NOT NULL,
  `dia` int NOT NULL,
  `orden` int NOT NULL,
  `repeticiones` int DEFAULT NULL,
  `series` int DEFAULT NULL,
  `codEjercicio` int DEFAULT NULL,
  PRIMARY KEY (`idRutina`,`dia`,`orden`),
  KEY `codEjercicio` (`codEjercicio`),
  CONSTRAINT `lineas_rutina_ibfk_1` FOREIGN KEY (`idRutina`) REFERENCES `rutinas` (`idRutina`),
  CONSTRAINT `lineas_rutina_ibfk_2` FOREIGN KEY (`codEjercicio`) REFERENCES `ejercicios` (`codEjercicio`)
)   


DROP TABLE IF EXISTS `lineas_rutina_pre_establecida`;
CREATE TABLE `lineas_rutina_pre_establecida` (
  `idRutinaPre` int NOT NULL,
  `dia` int NOT NULL,
  `orden` int NOT NULL,
  `repeticiones` int DEFAULT NULL,
  `series` int DEFAULT NULL,
  `codEjercicio` int DEFAULT NULL,
  PRIMARY KEY (`idRutinaPre`,`dia`,`orden`),
  KEY `codEjercicio` (`codEjercicio`),
  CONSTRAINT `lineas_rutina_pre_establecida_ibfk_1` FOREIGN KEY (`idRutinaPre`) REFERENCES `rutinas_pre_establecidas` (`idRutinaPre`),
  CONSTRAINT `lineas_rutina_pre_establecida_ibfk_2` FOREIGN KEY (`codEjercicio`) REFERENCES `ejercicios` (`codEjercicio`)
)   

DROP TABLE IF EXISTS `membresias`;
CREATE TABLE `membresias` (
  `codMembresia` int NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `costo` decimal(10,2) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `cuposDia` int DEFAULT NULL,
  PRIMARY KEY (`codMembresia`)
)   

DROP TABLE IF EXISTS `pagos`;
CREATE TABLE `pagos` (
  `dniCliente` int NOT NULL,
  `fecha` date NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `metodo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`dniCliente`,`fecha`),
  CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`dniCliente`) REFERENCES `usuarios` (`dni`)
)   

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `idRol` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idRol`)
)    

DROP TABLE IF EXISTS `rutinas`;
CREATE TABLE `rutinas` (
  `idRutina` int NOT NULL AUTO_INCREMENT,
  `dniCliente` int DEFAULT NULL,
  `fechaPeticion` date DEFAULT NULL,
  `fechaCarga` date DEFAULT NULL,
  `peticion` text,
  `dniInstructor` int DEFAULT NULL,
  PRIMARY KEY (`idRutina`),
  UNIQUE KEY `dniCliente` (`dniCliente`,`fechaPeticion`),
  KEY `dniInstructor` (`dniInstructor`),
  CONSTRAINT `rutinas_ibfk_1` FOREIGN KEY (`dniInstructor`) REFERENCES `usuarios` (`dni`),
  CONSTRAINT `rutinas_ibfk_2` FOREIGN KEY (`dniCliente`) REFERENCES `usuarios` (`dni`)
)   

DROP TABLE IF EXISTS `rutinas_pre_establecidas`;
CREATE TABLE `rutinas_pre_establecidas` (
  `idRutinaPre` int NOT NULL AUTO_INCREMENT,
  `sexo` varchar(255) DEFAULT NULL,
  `nroDias` int DEFAULT NULL,
  PRIMARY KEY (`idRutinaPre`),
  UNIQUE KEY `sexo` (`sexo`,`nroDias`)
)    

DROP TABLE IF EXISTS `seguimientos_gym`;
CREATE TABLE `seguimientos_gym` (
  `dniCliente` int DEFAULT NULL,
  `fechaSeguimiento` date DEFAULT NULL,
  `idSeguimiento` int NOT NULL AUTO_INCREMENT,
  `codEjercicio` int DEFAULT NULL,
  `repeticiones` int DEFAULT NULL,
  `peso` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`idSeguimiento`),
  KEY `dniCliente` (`dniCliente`),
  KEY `codEjercicio` (`codEjercicio`),
  CONSTRAINT `seguimientos_gym_ibfk_1` FOREIGN KEY (`dniCliente`) REFERENCES `usuarios` (`dni`),
  CONSTRAINT `seguimientos_gym_ibfk_2` FOREIGN KEY (`codEjercicio`) REFERENCES `ejercicios` (`codEjercicio`)
)    

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `dni` int NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `contrasenia` varchar(255) NOT NULL,
  `fechaNac` date DEFAULT NULL,
  `sexo` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `codMembresia` int DEFAULT NULL,
  `fechaInscripcion` date DEFAULT NULL,
  `estado` int DEFAULT NULL,
  PRIMARY KEY (`dni`),
  KEY `codMembresia` (`codMembresia`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`codMembresia`) REFERENCES `membresias` (`codMembresia`)
)   

DROP TABLE IF EXISTS `usuarios_roles`;
CREATE TABLE `usuarios_roles` (
  `dni` int NOT NULL,
  `idRol` int NOT NULL,
  PRIMARY KEY (`dni`,`idRol`),
  KEY `idRol` (`idRol`),
  CONSTRAINT `usuarios_roles_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `usuarios` (`dni`) ON DELETE CASCADE,
  CONSTRAINT `usuarios_roles_ibfk_2` FOREIGN KEY (`idRol`) REFERENCES `roles` (`idRol`)
)   


