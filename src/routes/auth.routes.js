import Router from "express-promise-router";
import { isAuthCasa } from "../middlewares/authCasa.middleware.js";
import { isAuthConserje } from "../middlewares/authConserje.middleware.js";
import { isAuthAdmin } from "../middlewares/authAdmin.middleware.js";
import {
  logout,
  loginCasa,
  registerAdmin,
  loginAdmin,
  registerCasa,
  registerConserje,
  loginConserje,
  updateConserje,
  deleteConserje,
  getAllConserje,
  CasaProfile,
  ConserjeProfile,
  AdminProfile,
  getAllAdmin,
  updateAdmin,
  deleteAdmin,
} from "../controllers/auth.controller.js";
import { createCasaSchema } from "../schemas/user.schema.js";
import { validateSchema } from "../middlewares/validate.middleware.js";

const router = Router();

router.post("/logout", logout); //PUBLICO

//CASAS
router.post("/login/casa", loginCasa); //PUBLICO

router.post(
  "/register/casa",
  isAuthAdmin,
  validateSchema(createCasaSchema),
  registerCasa
); //ADMIN

router.get("/profile/residente", isAuthCasa, CasaProfile); //CASA
router.get("/profile/conserje", isAuthConserje, ConserjeProfile); //CASA
router.get("/profile/admin", isAuthAdmin, AdminProfile); //CASA

//ADMIN
router.post("/register/admin", registerAdmin); //EN TEORIA NADIE

router.post("/login/admin", loginAdmin); //EN TEORIA NADIE

router.get("/admin", getAllAdmin); //EN TEORIA NADIE

router.put("/admin", updateAdmin); //EN TEORIA NADIE

router.delete("/admin", deleteAdmin); //EN TEORIA NADIE

//CONSERJE
router.post("/login/conserje", loginConserje); //PUBLICO

router.post("/register/conserje", isAuthAdmin, registerConserje); //ADMIN

router.get("/conserje", isAuthAdmin, getAllConserje);

router.put("/conserje", isAuthAdmin, updateConserje); //ADMIN

router.delete("/conserje", isAuthAdmin, deleteConserje); //ADMIN

export default router;
