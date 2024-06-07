import { pool } from "../db.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";
//LOGOUT GENERAL PARA TODOS
export const logout = (req, res) => {
  res.clearCookie("token");
  res.clearCookie("rol");
  res.sendStatus(200);
};

//RUTAS PARA CREAR Y LOGUEAR CASA
export const loginCasa = async (req, res) => {
  const email = req.body.email;
  const contrasena = req.body.contrasena;
  const result = await pool.query("select * from casas where email = $1", [
    email,
  ]);
  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "correo incorrecto",
    });
  }

  const validPassword = await bcrypt.compare(
    contrasena,
    result.rows[0].contrasena
  );
  if (!validPassword) {
    return res.status(400).json({
      message: "contraseña incorrecta",
    });
  }

  const token = await createAccessToken({
    id: result.rows[0].id,
  });

  res.cookie("token", token, {
    HttpOnly: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie("rol", "casa", {
    HttpOnly: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.json(result.rows[0]);
};

export const registerCasa = async (req, res) => {
  const { numero, calle, email, contrasena } = req.body;

  const hashcontrasena = await bcrypt.hash(contrasena, 10);

  const result = await pool.query(
    "insert into casas (numero, calle, email, contrasena) values ($1, $2, $3, $4) RETURNING *",
    [numero, calle, email, hashcontrasena]
  );
  const token = await createAccessToken({
    id: result.rows[0].id,
  });
  res.json(result.rows[0]);
};

export const profile = (req, res) => res.send("perfil");
//FUNCIONES PARA CREAR Y LOGUEAR ADMIN
export const registerAdmin = async (req, res) => {
  const { rut, nombres, apellidos, email, contrasena } = req.body;

  const hashContrasena = await bcrypt.hash(contrasena, 10);

  const result = await pool.query(
    "INSERT INTO admin (rut, nombres, apellidos, email, contrasena) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [rut, nombres, apellidos, email, hashContrasena]
  );

  // Aquí puedes generar un token de acceso si es necesario

  res.json(result.rows[0]);
};

export const loginAdmin = async (req, res) => {
  const email = req.body.email;
  const contrasena = req.body.contrasena;

  const result = await pool.query("SELECT * FROM admin WHERE email = $1", [
    email,
  ]);

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "Correo incorrecto",
    });
  }

  const validPassword = await bcrypt.compare(
    contrasena,
    result.rows[0].contrasena
  );

  if (!validPassword) {
    return res.status(400).json({
      message: "Contraseña incorrecta",
    });
  }

  const token = await createAccessToken({
    id: result.rows[0].id,
  });

  res.cookie("token", token, {
    HttpOnly: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie("rol", "admin", {
    HttpOnly: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.json(result.rows[0]);
};

//FUNCIONES PARA CREAR Y LOGUEAR CONSERJE
export const loginConserje = async (req, res) => {
  const email = req.body.email;
  const contrasena = req.body.contrasena;

  const result = await pool.query("SELECT * FROM conserje WHERE email = $1", [
    email,
  ]);

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "Correo incorrecto",
    });
  }

  const validPassword = await bcrypt.compare(
    contrasena,
    result.rows[0].contrasena
  );

  if (!validPassword) {
    return res.status(400).json({
      message: "Contraseña incorrecta",
    });
  }

  const token = await createAccessToken({
    id: result.rows[0].id,
  });

  res.cookie("token", token, {
    HttpOnly: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie("rol", "conserje", {
    HttpOnly: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.json(result.rows[0]);
};

export const registerConserje = async (req, res) => {
  const { rut, nombres, apellidos, email, contrasena } = req.body;

  const hashContrasena = await bcrypt.hash(contrasena, 10);

  const result = await pool.query(
    "INSERT INTO conserje (rut, nombres, apellidos, email, contrasena) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [rut, nombres, apellidos, email, hashContrasena]
  );

  res.json(result.rows[0]);
};
