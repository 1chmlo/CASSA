import { io } from "../app.js";
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
  const { patente } = req.body;

  try {
    // Realiza la consulta a la base de datos para verificar si la patente existe
    const dbResult = await pool.query(
      "SELECT * FROM autos WHERE patente = $1",
      [patente]
    );

    if (dbResult.rowCount === 0) {
      const dbResult2 = await pool.query(
        "SELECT * FROM visita WHERE patente = $1",
        [patente]
      );
      if (dbResult2.rowCount === 0) {
        io.emit("imageVerified", {
          patente: patente,
          ingreso: false,
        });
        return res.status(404).json({
          message: `Auto con patente ${patente} no encontrado`,
        });
      }
      io.emit("imageVerified", {
        ...dbResult2.rows[0],
        ingreso: true,
      });
      return res.json({ ...dbResult2.rows[0] });
    }
    io.emit("imageVerified", {
      ...dbResult.rows[0],
      ingreso: true,
    });
    return res.json({ ...dbResult.rows[0] });
  } catch (err) {
    console.error("Error al procesar la solicitud:", err);
    return res.status(500).json({
      error: "Error al procesar la solicitud",
      details: err.message,
    });
  }
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
  //const { patente } = req.params;
  const { marca, modelo, numero_casa, patente, id } = req.body;
  const result = await pool.query(
    "UPDATE autos SET marca = $1, modelo = $2, numero_casa = $3, patente = $4 WHERE id = $5 RETURNING *",
    [marca, modelo, numero_casa, patente, id]
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
  //const { patente } = req.params;
  const { id } = req.body;
  const result = await pool.query(
    "DELETE FROM autos WHERE id = $1 RETURNING *",
    [id]
  );
  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "auto no encontrado",
    });
  }
  return res.json(result.rows[0]);
};
