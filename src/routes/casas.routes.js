import Router from "express-promise-router";
import {
  deleteCasa,
  getAllCasas,
  getCasa,
  updateCasa,
} from "../controllers/casas.controller.js";
import { isAuthAdmin } from "../middlewares/authAdmin.middleware.js";
import { createCasaSchema } from "../schemas/user.schema.js";
import { validateSchema } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/casas", isAuthAdmin, getAllCasas); //ver todas las casas, ADMIN

// router.get("/ingresos", isAuthAdmin, getAllCasas); //ver todas las casas, ADMIN

router.get("/casas/:numero", isAuthAdmin, getCasa); //ver una casa, ADMIN

router.put("/casas", validateSchema(createCasaSchema), updateCasa); //actualizar casa, ADMIN

router.delete("/casas", deleteCasa); // borrar casa, ADMIN

export default router;
