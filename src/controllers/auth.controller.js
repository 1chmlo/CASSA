import { pool } from "../db.js";

export const login = async (req, res) => {
  const email = req.body.email;
  const contrasena = req.body.contrasena;
  const result = await pool.query(
    "select * from casas where email = $1 and contrasena = $2",
    [email, contrasena]
  );
  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "Usuario o contraseña incorrectos",
    });
  }
  return res.json(result.rows[0]);
};

export const register = (req, res) => res.send("registrando");

export const logout = (req, res) => res.send("logout");

export const profile = (req, res) => res.send("perfil");
