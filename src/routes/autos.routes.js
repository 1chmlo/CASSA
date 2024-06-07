import Router from "express-promise-router";
import {
  createAuto,
  deleteAuto,
  getAllAutos,
  getAuto,
  updateAuto,
} from "../controllers/autos.controller.js";
import { isAuthConserje } from "../middlewares/authConserje.middleware.js";

const router = Router();

router.get("/autos", isAuthConserje, getAllAutos); //CONSERJE Y ADMIN

router.get("/autos/:patente", isAuthConserje, getAuto); //CONSERJE Y ADMIN

router.post("/autos", isAuthConserje, createAuto); //CONSERJE Y ADMIN

router.put("/autos/:patente", isAuthConserje, updateAuto); //CONSERJE Y ADMIN

router.delete("/autos/:patente", isAuthConserje, deleteAuto); //CONSERJE Y ADMIN

export default router;
