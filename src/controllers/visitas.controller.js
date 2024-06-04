import { pool } from "../db.js";

export const getAllVisitas = (req, res) => res.send("obteniendo visitas");

export const getVisita = (req, res) => res.send("obteniendo visitas");

export const createVisita = (req, res) => {
  const resultado = req.body.nombre;
  console.log(req.body);
  //db insert

  res.send("creando visita a nombre de " + resultado);
};

export const updateVisita = (req, res) => res.send("obteniendo visitas");

export const deleteVisita = (req, res) => res.send("obteniendo visitas");
