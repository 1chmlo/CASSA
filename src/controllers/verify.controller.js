import fs from "fs";
import path from "path";
import { exec } from "child_process";
import multer from "multer";

// Define el middleware de multer
const upload = multer({ dest: "uploads/" });

export { upload };

export function verifyImage(req, res, next) {
  // Verifica que se haya enviado una imagen en la solicitud
  if (!req.file) {
    return res.status(400).json({ error: "No se proporcionó una imagen" });
  }

  const imagePath = req.file.path;

  // Ruta del archivo con extensión jpg
  const imagePathJpg = path.join(
    path.dirname(imagePath),
    path.basename(imagePath, path.extname(imagePath)) + ".jpg"
  );

  // Renombrar el archivo a .jpg
  fs.renameSync(imagePath, imagePathJpg);

  // Ejecuta el script de Python con la imagen como argumento
  exec(
    `python ./src/verifypatente.py ${imagePathJpg}`,
    (error, stdout, stderr) => {
      // Elimina la imagen temporalmente guardada
      fs.unlink(imagePathJpg, (err) => {
        if (err) {
          console.error("Error al eliminar el archivo temporal:", err);
        }
      });

      if (error) {
        console.error("Error al ejecutar el script de Python:", error);
        return res.status(500).json({
          error: "Error al ejecutar el script de Python",
          details: error.message,
        });
      }

      // Parsea la salida del script de Python como un objeto JSON
      const result = stdout;

      // Devuelve el resultado como respuesta
      res.send(result);
    }
  );
}
