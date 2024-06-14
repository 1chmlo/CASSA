import { pool } from "../db.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";

//ESTA PARTE DE LAS RUTAS, SON PARA QUE EL ADMINISTRADOR GESTIONE A LOS USUARIOS (CASAS) QUE PUEDEN REGISTRAR VISITAS
//CADA CASA ES UN USUARIO

//buscar todas las casas
export const getAllCasas = async (req, res, next) => {
  console.log(req.userId);
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

//actualizar calle y numero de una casa
export const updateCasa = async (req, res) => {
  //const { id } = req.params;
  const { email, contrasena, id } = req.body;

  try {
    let hashContrasena = null;
    if (contrasena) {
      hashContrasena = await bcrypt.hash(contrasena, 10);
    }

    const result = await pool.query(
      "update casas set email = $1, contrasena = $2 where id = $3 returning *",
      [email, hashContrasena, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: `casa con id ${id} no encontrada`,
      });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating casa:", error);
    return res.status(500).json({
      message: "Error updating casa",
    });
  }
};

//borrar una casa
export const deleteCasa = async (req, res) => {
  //const { numero } = req.params;
  const { id } = req.body;
  const result = await pool.query(
    "delete from casas where id = $1 returning *",
    [id]
  );
  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "casa no encontrada",
    });
  }
  return res.json(result.rows[0]);
};
