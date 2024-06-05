import { pool } from "../db.js";

//ESTA PARTE DE LAS RUTAS, SON PARA QUE EL ADMINISTRADOR GESTIONE A LOS USUARIOS (CASAS) QUE PUEDEN REGISTRAR VISITAS
//CADA CASA ES UN USUARIO

//buscar todas las casas
export const getAllCasas = async (req, res, next) => {
  const result = await pool.query("select * from casas");
  if (result.rows.length > 0) {
    res.json(result.rows);
  } else {
    res.send("No se encontraron casas");
  }
};

//buscar una casa
export const getCasa = async (req, res) => {
  const numero = req.params.numero;
  const result = await pool.query("select * from casas where numero = $1", [
    numero,
  ]);
  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "casa no encontrada",
    });
  }
  return res.json(result.rows[0]);
};

//crear una casa
export const createCasa = async (req, res) => {
  const { numero, calle, email, contrasena } = req.body;
  const result = await pool.query(
    "insert into casas (numero, calle, email, contrasena) values ($1, $2, $3, $4) RETURNING *",
    [numero, calle, email, contrasena]
  );

  res.json(result.rows[0]);
};

//actualizar correo y contraseña de una casa
export const updateCasa = async (req, res) => {
  const { numero } = req.params;
  const { email, contrasena } = req.body;
  const result = await pool.query(
    "update casas set email = $1, contrasena = $2 where numero = $3 returning *",
    [email, contrasena, numero]
  );
  console.log(result);
  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "casa no encontrada",
    });
  }
  return res.json(result.rows[0]);
};

//borrar una casa
export const deleteCasa = async (req, res) => {
  const { numero } = req.params;
  const result = await pool.query(
    "delete from casas where numero = $1 returning *",
    [numero]
  );
  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "casa no encontrada",
    });
  }
  return res.json(result.rows[0]);
};
