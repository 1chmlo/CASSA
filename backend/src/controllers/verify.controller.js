import fs from "fs";
import path from "path";
import { exec } from "child_process";
import multer from "multer";
import { pool } from "../db.js";
import { io } from "../app.js";
// Define el middleware de multer
const upload = multer({ dest: "uploads/" });

export { upload };

export function verifyImage(req, res, next) {
  // Verifica que se haya enviado una imagen en la solicitud
  if (!req.file) {
    return res.status(400).json({ error: "No se proporcionó una imagen" });
  }

  const imagePath = req.file.path;
  const imageName = req.file.originalname;

  // Ruta del archivo con extensión jpg
  const imagePathJpg = path.join(
    path.dirname(imagePath),
    path.basename(imagePath, path.extname(imagePath)) + ".jpg"
  );
  const rutaimagen = imagePathJpg.split("\\").pop();

  // Renombrar el archivo a .jpg
  fs.renameSync(imagePath, imagePathJpg);

  // Ejecuta el script de Python con la imagen como argumento
  exec(
    `python ./src/verifypatente.py ${imagePathJpg}`,
    async (error, stdout, stderr) => {
      // Elimina la imagen temporalmente guardada
      // fs.unlink(imagePathJpg, (err) => {
      //   if (err) {
      //     console.error("Error al eliminar el archivo temporal:", err);
      //   }
      // });

      if (error) {
        console.error("Error al ejecutar el script de Python:", error);
        return res.status(500).json({
          error: "Error al ejecutar el script de Python",
          details: error.message,
        });
      }

      try {
        // Parsea la salida del script de Python como un objeto JSON
        const result = JSON.parse(stdout);
        const patente = result.patente;

        // Realiza la consulta a la base de datos para verificar si la patente existe
        const dbResult = await pool.query(
          "SELECT * FROM autos WHERE patente = $1",
          [patente]
        );

        if (dbResult.rowCount === 0) {
          const dbResult2 = await pool.query(
            "SELECT * FROM visita WHERE patente = $1",
            [patente]
          );
          if (dbResult2.rowCount === 0) {
            io.emit("imageVerified", {
              patente: patente,
              image: rutaimagen,
              ingreso: false,
            });
            return res.status(404).json({
              message: `Auto con patente ${patente} no encontrado`,
            });
          }
          io.emit("imageVerified", {
            ...dbResult2.rows[0],
            image: rutaimagen,
            ingreso: true,
          });
          return res.json({ ...dbResult2.rows[0], image: rutaimagen });
          // io.emit("imageVerified", {
          //   patente: patente,
          //   image: rutaimagen,
          //   ingreso: false,
          // });
          // return res.status(404).json({
          //   message: `Auto con patente ${patente} no encontrado`,
          // });
        }
        io.emit("imageVerified", {
          ...dbResult.rows[0],
          image: rutaimagen,
          ingreso: true,
        });
        return res.json({ ...dbResult.rows[0], image: rutaimagen });
      } catch (err) {
        console.error("Error al procesar la solicitud:", err);
        return res.status(500).json({
          error: "Error al procesar la solicitud",
          details: err.message,
        });
      }
    }
  );
}
