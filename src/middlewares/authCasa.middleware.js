import jwt from "jsonwebtoken";

export const isAuthCasa = (req, res, next) => {
  const token = req.cookies.token;
  const rol = req.cookies.rol;

  if (!rol) {
    console.log("no tienes rol");
    return res.status(400).json({
      message: "no tienes rol, inicia sesion",
    });
  }
  console.log(`tu rol es ${rol}`);

  if (!token || (rol !== "casa" && rol !== "admin")) {
    return res.status(400).json({
      message: "no estas autorizado",
    });
  }
  jwt.verify(token, "xyz123", (err, decoded) => {
    if (err) {
      return res.status(400).json({
        message: "no estas autorizado",
      });
    }
    req.userId = decoded.id;
    req.userRole = rol;

    next();
  });
};
