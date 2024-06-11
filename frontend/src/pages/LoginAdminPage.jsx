import React from "react";
import { Button, Card, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import axios from "axios";

function LoginAdminPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const res = await axios.post(
      "http://localhost:4000/api/login/admin",
      data,
      {
        withCredentials: true,
      }
    );
    console.log(res);
  });

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
        <h3 className="text-2xl font-bold">Login Admin</h3>

        <form onSubmit={onSubmit}>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="Ingrese email"
            {...register("email", {
              required: true,
            })}
          />
          {errors.email && (
            <p className="text-red-500">El email es obligatorio</p>
          )}
          <Label htmlFor="contrasena">Contraseña</Label>
          <Input
            type="password"
            placeholder="Ingrese contraseña"
            {...register("contrasena", {
              required: true,
            })}
          />
          {errors.contrasena && (
            <p className="text-red-500">La contraseña es obligatoria</p>
          )}
          <Button>Iniciar Sesión</Button>
        </form>
      </Card>
    </div>
  );
}

export default LoginAdminPage;
