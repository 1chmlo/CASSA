import jwt from "jsonwebtoken";

export const isAuthConserje = (req, res, next) => {
  const token = req.cookies.token;
  const rol = req.cookies.rol;
  if (!token || (rol !== "conserje" && rol !== "admin")) {
    return res.status(400).json({
      message: "no estas autorizado",
    });
  }
  jwt.verify(token, "xyz123", (err, decoded) => {
    if (err)
      return res.status(400).json({
        mesage: "no estas autorizado",
      });
    req.userId = decoded.id;
    req.userRole = rol;
    next();
  });
};
