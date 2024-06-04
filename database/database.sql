-- Crear la base de datos
CREATE DATABASE CASSA;

-- Conectarse a la base de datos
\c CASSA

-- Crear la tabla CASA
CREATE TABLE IF NOT EXISTS CASA (
    numero INT NOT NULL PRIMARY KEY,
    calle VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    contrasena VARCHAR(100)
);

-- Crear la tabla AUTO
CREATE TABLE IF NOT EXISTS AUTOS (
    patente VARCHAR(6) NOT NULL PRIMARY KEY,
    marca VARCHAR(100),
    modelo VARCHAR(100),
    numero_casa INT,
    FOREIGN KEY (numero_casa) REFERENCES CASA(numero)
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

-- Crear la tabla VISITANTE
CREATE TABLE IF NOT EXISTS VISITANTE (
    rut VARCHAR(12) NOT NULL PRIMARY KEY,
    nombres VARCHAR(100),
    apellidos VARCHAR(100),
    patente VARCHAR(6)
);

-- Crear la tabla VISITA RECURRENTE
CREATE TABLE IF NOT EXISTS VISITA_RECURRENTE (
    id SERIAL PRIMARY KEY,
    rut_visitante VARCHAR(12),
    numero_casa_destino INT,
    fecha_ingreso DATE,
    comentario VARCHAR(200),
    FOREIGN KEY (numero_casa_destino) REFERENCES CASA(numero),
    FOREIGN KEY (rut_visitante) REFERENCES VISITANTE(rut),
    CONSTRAINT fk_visita UNIQUE (rut_visitante, numero_casa_destino)
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