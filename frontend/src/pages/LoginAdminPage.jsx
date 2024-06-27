import React from "react";
import { Button, Card, Input, Label, BackButton } from "../components/ui";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function LoginAdminPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { ingresarAdmin } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    await ingresarAdmin(data);
    navigate("/admin/panel");
  });

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card className="w-full max-w-md p-6">
        <h3 className="text-2xl font-bold mb-6">Login Admin</h3>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="Ingrese email"
              {...register("email", {
                required: true,
              })}
              className="mt-1 w-full text-black"
            />
            {errors.email && (
              <p className="text-red-500">El email es obligatorio</p>
            )}
          </div>
          <div>
            <Label htmlFor="contrasena">Contraseña</Label>
            <Input
              type="password"
              placeholder="Ingrese contraseña"
              {...register("contrasena", {
                required: true,
              })}
              className="mt-1 w-full text-black"
            />
            {errors.contrasena && (
              <p className="text-red-500">La contraseña es obligatoria</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Iniciar Sesión
          </Button>
        </form>
        <BackButton />
      </Card>
    </div>
  );
}

export default LoginAdminPage;
