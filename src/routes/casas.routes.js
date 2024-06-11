import Router from "express-promise-router";
import {
  deleteCasa,
  getAllCasas,
  getCasa,
  updateCasa,
} from "../controllers/casas.controller.js";
import { isAuthAdmin } from "../middlewares/authAdmin.middleware.js";
const router = Router();

router.get("/casas", isAuthAdmin, getAllCasas); //ver todas las casas, ADMIN

router.get("/casas/:numero", isAuthAdmin, getCasa); //ver una casa, ADMIN

router.put("/casas/:numero", isAuthAdmin, updateCasa); //actualizar casa, ADMIN

router.delete("/casas/:id", isAuthAdmin, deleteCasa); // borrar casa, ADMIN

export default router;
