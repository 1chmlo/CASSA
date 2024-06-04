import { pool } from "../db.js";

// Buscar todos los autos
export const getAllAutos = async (req, res) => {
  const result = await pool.query("SELECT * FROM autos");
  if (result.rows.length > 0) {
    res.json(result.rows);
  } else {
    res.send("no hay autos");
  }
};

// Buscar un auto por su patente
export const getAuto = async (req, res) => {
  const { patente } = req.params;
  const result = await pool.query("SELECT * FROM autos WHERE patente = $1", [
    patente,
  ]);
  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "auto no encontrado",
    });
  }
  return res.json(result.rows[0]);
};

// Crear un nuevo auto
export const createAuto = async (req, res) => {
  const { patente, marca, modelo, numero_casa } = req.body;
  console.log(req.body.patente);
  // res.send(patente + " " + marca + " " + modelo + " " + numero_casa);
  const result = await pool.query(
    "INSERT INTO autos (patente, marca, modelo, numero_casa) VALUES ($1, $2, $3, $4) RETURNING *",
    [patente, marca, modelo, numero_casa]
  );
  res.json(result.rows[0]);
};

// Actualizar la información de un auto
export const updateAuto = async (req, res) => {
  const { patente } = req.params;
  const { marca, modelo, numero_casa } = req.body;
  const result = await pool.query(
    "UPDATE autos SET marca = $1, modelo = $2, numero_casa = $3 WHERE patente = $4 RETURNING *",
    [marca, modelo, numero_casa, patente]
  );
  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "auto no encontrado",
    });
  }
  return res.json(result.rows[0]);
};

// Borrar un auto
export const deleteAuto = async (req, res) => {
  const { patente } = req.params;
  const result = await pool.query(
    "DELETE FROM autos WHERE patente = $1 RETURNING *",
    [patente]
  );
  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "auto no encontrado",
    });
  }
  return res.json(result.rows[0]);
};
