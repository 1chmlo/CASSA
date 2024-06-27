import Router from "express-promise-router";
import {
  createAuto,
  deleteAuto,
  getAllAutos,
  getAuto,
  updateAuto,
} from "../controllers/autos.controller.js";
import { isAuthConserje } from "../middlewares/authConserje.middleware.js";
import { isAuthAdmin } from "../middlewares/authAdmin.middleware.js";

const router = Router();

router.get("/autos", isAuthConserje, getAllAutos); //CONSERJE Y ADMIN

router.post("/auto", getAuto); //CONSERJE Y ADMIN

router.post("/autos", isAuthAdmin, createAuto); //ADMIN

router.put("/autos/", isAuthAdmin, updateAuto); //ADMIN

router.delete("/autos/", isAuthAdmin, deleteAuto); //ADMIN

export default router;
