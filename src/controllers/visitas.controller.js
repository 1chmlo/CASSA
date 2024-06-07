import { pool } from "../db.js";

// Obtener las visitas de una casa
export const getAllVisitas = async (req, res) => {
  const casa_id = req.userId;
  const casa_numero = req.userNumero;
  console.log(casa_id);
  const result = await pool.query(
    "SELECT * FROM VISITA where casa_numero = $1",
    [casa_numero]
  );
  if (result.rows.length > 0) {
    res.json(result.rows);
  } else {
    res.send("No se encontraron visitas");
  }
};

// Crear una visita
export const createVisita = async (req, res) => {
  const casa_id = req.userId;
  const casa_numero = req.userNumero;
  const { nombre, apellido, fecha_ingreso, rut, patente, comentario } =
    req.body;

  try {
    const result = await pool.query(
      "INSERT INTO VISITA (nombre, apellido, fecha_ingreso, rut, patente, comentario, casa_id, casa_numero) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        nombre,
        apellido,
        fecha_ingreso,
        rut,
        patente,
        comentario,
        casa_id,
        casa_numero,
      ]
    );
    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      // código de error para UNIQUE violation
      res.status(409).json({
        message:
          "Visita ya registrada para esa combinación de nombre, apellido, fecha y casa",
      });
    } else {
      res.status(500).json({ message: "Error al registrar visita", error });
    }
  }
};

// Buscar una visita por ID
export const getVisita = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query("SELECT * FROM VISITA WHERE id = $1", [id]);
  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "Visita no encontrada",
    });
  }
  return res.json(result.rows[0]);
};

// Actualizar una visita
export const updateVisita = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, fecha_ingreso, rut, patente, comentario, casa_id } =
    req.body;
  try {
    const result = await pool.query(
      "UPDATE VISITA SET nombre = $1, apellido = $2, fecha_ingreso = $3, rut = $4, patente = $5, comentario = $6, casa_id = $7 WHERE id = $8 RETURNING *",
      [nombre, apellido, fecha_ingreso, rut, patente, comentario, casa_id, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Visita no encontrada",
      });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      // código de error para UNIQUE violation
      res.status(409).json({
        message:
          "Visita ya registrada para esa combinación de nombre, apellido, fecha y casa",
      });
    } else {
      res.status(500).json({ message: "Error al actualizar visita", error });
    }
  }
};

// Borrar una visita
export const deleteVisita = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    "DELETE FROM VISITA WHERE id = $1 RETURNING *",
    [id]
  );
  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "Visita no encontrada",
    });
  }
  return res.json(result.rows[0]);
};
