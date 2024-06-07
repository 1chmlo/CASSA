-- Crear la base de datos
CREATE DATABASE CASSA;

-- Conectarse a la base de datos
\c CASSA

-- Crear la tabla CASA
CREATE TABLE IF NOT EXISTS CASAS (
    id SERIAL PRIMARY KEY,
    numero INT NOT NULL UNIQUE,
    calle VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    contrasena VARCHAR(100)
);

-- Crear la tabla AUTO
CREATE TABLE IF NOT EXISTS AUTOS (
    id SERIAL PRIMARY KEY,
    patente VARCHAR(6) NOT NULL UNIQUE,
    marca VARCHAR(100),
    modelo VARCHAR(100),
    numero_casa INT,
    FOREIGN KEY (numero_casa) REFERENCES CASAS(numero)
);

-- Crear la tabla RESIDENTE
CREATE TABLE IF NOT EXISTS RESIDENTE (
    rut VARCHAR(12) NOT NULL PRIMARY KEY,
    nombres VARCHAR(100),
    apellidos VARCHAR(100),
    numero_casa INT,
    FOREIGN KEY (numero_casa) REFERENCES CASA(numero)
);

-- Crear la tabla CONSERJE
CREATE TABLE IF NOT EXISTS CONSERJE (
    rut VARCHAR(12) NOT NULL PRIMARY KEY,
    nombres VARCHAR(100),
    apellidos VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    contrasena VARCHAR(100)
);

-- Crear la tabla CONSERJE
CREATE TABLE IF NOT EXISTS CONSERJE (
    id SERIAL PRIMARY KEY,
    rut VARCHAR(12) NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    contrasena VARCHAR(100) NOT NULL
);

-- Crear la tabla ADMIN
CREATE TABLE IF NOT EXISTS ADMIN (
    id SERIAL PRIMARY KEY,
    rut VARCHAR(12) NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    contrasena VARCHAR(100) NOT NULL
);

-- Crear la tabla VISITANTE
CREATE TABLE IF NOT EXISTS VISITANTE (
    id SERIAL PRIMARY KEY,
    rut VARCHAR(12) NOT NULL UNIQUE,
    nombres VARCHAR(100),
    apellidos VARCHAR(100),
    patente VARCHAR(6),
    casa_id
    FOREIGN KEY (casa_id) REFERENCES CASAS(id)
);

-- Crear la tabla VISITA
CREATE TABLE IF NOT EXISTS VISITA (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    apellido VARCHAR(20) NOT NULL,
    fecha_ingreso DATE NOT NULL,
    rut VARCHAR(12), -- opcional
    patente VARCHAR(6), -- opcional
    comentario VARCHAR(200), -- opcional
    casa_id INT NOT NULL,
    FOREIGN KEY (casa_id) REFERENCES CASAS(id),
    CONSTRAINT unique_visita UNIQUE (nombre, apellido, fecha_ingreso, casa_id)
);


-- Crear la tabla VISITA UNICA/RAPIDA
CREATE TABLE IF NOT EXISTS VISITA_RAPIDA (
    id SERIAL PRIMARY KEY,
    rut_visitante VARCHAR(12),
    numero_casa_destino INT,
    fecha_ingreso DATE,
    comentario VARCHAR(200),
    FOREIGN KEY (numero_casa_destino) REFERENCES CASA(numero)
);