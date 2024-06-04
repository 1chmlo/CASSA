import Router from "express-promise-router";

import {
  login,
  register,
  logout,
  profile,
} from "../controllers/auth.controller.js";
const router = Router();

router.post("/login", login);

export default router;
