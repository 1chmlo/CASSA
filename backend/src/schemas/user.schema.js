import { z } from "zod";

export const createCasaSchema = z.object({
  // numero: z
  //   .string({
  //     required_error: "El numero es obligatorio",
  //     invalid_type_error: "El numero debe ser un texto",
  //   })
  //   .min(1)
  //   .max(100),
  // calle: z
  //   .string({
  //     required_error: "La calle es obligatoria",
  //     invalid_type_error: "La calle debe ser un texto",
  //   })
  //   .min(1)
  //   .max(100),
  // email: z
  //   .string({
  //     required_error: "El email es obligatorio",
  //     invalid_type_error: "El email debe ser un texto",
  //   })
  //   .min(1)
  //   .max(100),
  // contrasena: z
  //   .string({
  //     required_error: "La contraseña es obligatoria",
  //     invalid_type_error: "La contraseña debe ser un texto",
  //   })
  //   .min(5)
  //   .max(100),
});
