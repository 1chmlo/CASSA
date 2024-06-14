import React from "react";
import { Button, Card, Input, Label, BackButton } from "../components/ui";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function RegisterAdminPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const res = await axios.post(
      "http://localhost:4000/api/register/admin",
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
        <h3 className="text-2xl font-bold">Registro Admin</h3>

        <form onSubmit={onSubmit}>
          <Label htmlFor="rut">RUT</Label>
          <Input
            placeholder="Ingrese RUT"
            {...register("rut", {
              required: true,
            })}
          />
          {errors.rut && <p className="text-red-500">El RUT es obligatorio</p>}
          <Label htmlFor="nombres">Nombres</Label>
          <Input
            placeholder="Ingrese nombres"
            {...register("nombres", {
              required: true,
            })}
          />
          {errors.nombres && (
            <p className="text-red-500">Los nombres son obligatorios</p>
          )}
          <Label htmlFor="apellidos">Apellidos</Label>
          <Input
            placeholder="Ingrese apellidos"
            {...register("apellidos", {
              required: true,
            })}
          />
          {errors.apellidos && (
            <p className="text-red-500">Los apellidos son obligatorios</p>
          )}
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
          <Button>Registrar Admin</Button>
        </form>
        <BackButton />
      </Card>
    </div>
  );
}

export default RegisterAdminPage;
