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
    numero: result.rows[0].numero,
  });

  /*if (req.cookies.token) {
    res.clearCookie("token");
  }
  if (req.cookies.rol) {
    res.clearCookie("rol");
  }*/

  res.cookie("token", token, {
    //HttpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });
  res.cookie("rol", "casa", {
    //HttpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
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
    numero: result.rows[0].numero,
  });

  /*res.cookie("token", token, {
    //HttpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie("rol", "casa", {
    //HttpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });*/
  res.json(result.rows[0]);
};

// Obtener las visitas de una casa
export const CasaProfile = async (req, res) => {
  const casa_id = req.userId;
  const casa_numero = req.userNumero;
  const result = await pool.query("SELECT * FROM casas where id = $1", [
    casa_id,
  ]);
  if (result.rows.length > 0) {
    const { contrasena, ...perfil } = result.rows[0];
    res.json(perfil);
  } else {
    res.send("No se encontró el perfil");
  }
};

// Obtener las visitas de una casa
export const ConserjeProfile = async (req, res) => {
  const conserje_id = req.userId;
  const casa_numero = req.userNumero;
  const result = await pool.query("SELECT * FROM CONSERJE where id = $1", [
    conserje_id,
  ]);
  if (result.rows.length > 0) {
    const { contrasena, ...perfil } = result.rows[0];
    res.json(perfil);
  } else {
    res.send("No se encontró el perfil");
  }
};

// Obtener las visitas de una casa
export const AdminProfile = async (req, res) => {
  const admin_id = req.userId;
  const casa_numero = req.userNumero;
  const result = await pool.query("SELECT * FROM ADMIN where id = $1", [
    admin_id,
  ]);
  if (result.rows.length > 0) {
    const { contrasena, ...perfil } = result.rows[0];
    res.json(perfil);
  } else {
    res.send("No se encontró el perfil");
  }
};

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
  /*if (req.cookies.token) {
    res.clearCookie("token");
  }
  if (req.cookies.rol) {
    res.clearCookie("rol");
  }*/
  res.cookie("token", token, {
    //HttpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });
  res.cookie("rol", "admin", {
    //HttpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });

  return res.json(result.rows[0]);
};

export const getAllAdmin = async (req, res) => {
  const result = await pool.query("select * from admin");
  if (result.rows.length > 0) {
    res.json(result.rows);
  } else {
    res.send("No se encontraron admin");
  }
};

export const updateAdmin = async (req, res) => {
  const { rut, nombres, apellidos, email, contrasena, id } = req.body;
  const result = await pool.query(
    "UPDATE ADMIN SET rut = $1, nombres = $2, apellidos = $3, email = $4, contrasena = $5 WHERE id = $6 RETURNING *",
    [rut, nombres, apellidos, email, contrasena, id]
  );
  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "Admin no encontrado",
    });
  }
  return res.json(result.rows[0]);
};

export const deleteAdmin = async (req, res) => {
  //const { patente } = req.params;
  const { id } = req.body;
  const result = await pool.query(
    "DELETE FROM ADMIN WHERE id = $1 RETURNING *",
    [id]
  );
  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "Admin no encontrado",
    });
  }
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
  /*if (req.cookies.token) {
    res.clearCookie("token");
  }
  if (req.cookies.rol) {
    res.clearCookie("rol");
  }*/
  res.cookie("token", token, {
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });
  res.cookie("rol", "conserje", {
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
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

export const deleteConserje = async (req, res) => {
  //const { patente } = req.params;
  const { id } = req.body;
  const result = await pool.query(
    "DELETE FROM CONSERJE WHERE id = $1 RETURNING *",
    [id]
  );
  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "conserje no encontrado",
    });
  }
  return res.json(result.rows[0]);
};

export const updateConserje = async (req, res) => {
  const { rut, nombres, apellidos, email, contrasena, id } = req.body;
  const result = await pool.query(
    "UPDATE CONSERJE SET rut = $1, nombres = $2, apellidos = $3, email = $4, contrasena = $5 WHERE id = $6 RETURNING *",
    [rut, nombres, apellidos, email, contrasena, id]
  );
  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "Conserje no encontrado",
    });
  }
  return res.json(result.rows[0]);
};

export const getAllConserje = async (req, res) => {
  const result = await pool.query("select * from conserje");
  if (result.rows.length > 0) {
    res.json(result.rows);
  } else {
    res.send("No se encontraron conserjes");
  }
};
