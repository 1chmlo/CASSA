import React from "react";
import { Button, Card, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function RegisterResidentePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registrarResidente } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    await registrarResidente(data);
    navigate("/admin/panel");
  });

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
        <h3 className="text-2xl font-bold">Registro Casa</h3>

        <form onSubmit={onSubmit}>
          <Label htmlFor="numero">Numero Casa</Label>
          <Input
            placeholder="ingrese numero casa"
            {...register("numero", {
              required: true,
            })}
          />
          {errors.numero && (
            <p className="text-red-500">El numero es obligatorio</p>
          )}
          <Label htmlFor="calle">Calle Casa</Label>
          <Input
            placeholder="ingrese calle"
            {...register("calle", {
              required: true,
            })}
          />
          {errors.calle && (
            <p className="text-red-500">La calle es obligatoria</p>
          )}
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="ingrese email"
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
            placeholder="ingrese contraseña"
            {...register("contrasena", {
              required: true,
            })}
          />
          {errors.contrasena && (
            <p className="text-red-500">La contraseña es obligatoria</p>
          )}
          <Button>Registrar Casa</Button>
        </form>
      </Card>
    </div>
  );
}

export default RegisterResidentePage;
