import Router from "express-promise-router";
import { isAuthCasa } from "../middlewares/authCasa.middleware.js";
import {
  logout,
  profile,
  loginCasa,
  registerAdmin,
  loginAdmin,
  registerCasa,
  registerConserje,
  loginConserje,
  updateConserje,
  deleteConserje,
  getAllConserje,
} from "../controllers/auth.controller.js";
import { isAuthAdmin } from "../middlewares/authAdmin.middleware.js";
const router = Router();

router.post("/logout", logout); //PUBLICO

//CASAS
router.post("/login/casa", loginCasa); //PUBLICO

router.post("/register/casa", isAuthAdmin, registerCasa); //ADMIN

router.get("/profile", isAuthCasa, profile); //CASA

//ADMIN
router.post("/register/admin", registerAdmin); //EN TEORIA NADIE

router.post("/login/admin", loginAdmin); //EN TEORIA NADIE

//CONSERJE
router.post("/login/conserje", loginConserje); //PUBLICO

router.post("/register/conserje", isAuthAdmin, registerConserje); //ADMIN

router.get("/conserje", isAuthAdmin, getAllConserje);

router.put("/conserje", isAuthAdmin, updateConserje); //ADMIN

router.delete("/conserje", isAuthAdmin, deleteConserje); //ADMIN

export default router;
