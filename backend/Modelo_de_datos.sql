-- Crear la tabla CASAS
CREATE TABLE IF NOT EXISTS CASAS (
    id SERIAL PRIMARY KEY,
    numero INT NOT NULL UNIQUE,
    calle VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    contrasena VARCHAR(100)
);

-- Crear la tabla AUTOS
CREATE TABLE IF NOT EXISTS AUTOS (
    id SERIAL PRIMARY KEY,
    patente VARCHAR(6) NOT NULL UNIQUE,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    numero_casa INT NOT NULL,
    FOREIGN KEY (numero_casa) REFERENCES CASAS(numero)
);

-- Crear la tabla CONSERJE
CREATE TABLE IF NOT EXISTS CONSERJE (
    id SERIAL PRIMARY KEY,
    rut VARCHAR(12) NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
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
    casa_numero INT NOT NULL,
    FOREIGN KEY (casa_id) REFERENCES CASAS(id),
    FOREIGN KEY (casa_numero) REFERENCES CASAS(numero),
    CONSTRAINT unique_visita UNIQUE (nombre, apellido, fecha_ingreso, casa_id)
);

--Crear la tabla INGRESO
CREATE TABLE IF NOT EXISTS INGRESO (
    id SERIAL PRIMARY KEY,
    fecha_ingreso DATE NOT NULL,
    patente varchar(6) NOT NULL,
    ispermitido BOOLEAN NOT NULL -- true si es permitido, false si no
);  