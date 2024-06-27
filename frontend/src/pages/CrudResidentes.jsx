import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button, Card, Input, Label } from "../components/ui";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/navbar/AdminNavbar";

const CrudResidentes = () => {
  const [residentes, setResidentes] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { registrarResidente } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [currentResidente, setCurrentResidente] = useState(null);

  const fetchResidentes = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/casas", {
        withCredentials: true,
      });
      setResidentes(response.data);
    } catch (error) {
      console.error("Error fetching residentes:", error);
    }
  };

  useEffect(() => {
    fetchResidentes();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (editing) {
      try {
        await axios.put(
          "http://localhost:4000/api/casas",
          {
            ...data,
            id: currentResidente.id,
          },
          { withCredentials: true }
        );
        fetchResidentes();
        setEditing(false);
        reset();
      } catch (error) {
        console.error("Error updating residente:", error);
      }
    } else {
      try {
        await registrarResidente(data);
        fetchResidentes();
        reset();
      } catch (error) {
        console.error("Error creating residente:", error);
      }
    }
  });

  const editResidente = (residente) => {
    setEditing(true);
    setCurrentResidente(residente);
    reset(residente);
  };

  const cancelEdit = () => {
    setEditing(false);
    reset();
  };

  const deleteResidente = async (id) => {
    try {
      await axios.delete("http://localhost:4000/api/casas", {
        data: { id },
        withCredentials: true,
      });
      fetchResidentes();
    } catch (error) {
      console.error("Error deleting residente:", error);
    }
  };

  return (
    <>
      <div className="p-4 px-60">
        <Card>
          <h3 className="text-2xl font-bold">
            {editing ? "Editar Casa" : "Registro Casa"}
          </h3>
          <form onSubmit={onSubmit}>
            <Label htmlFor="email">Email Casa</Label>
            <Input
              placeholder="Ingrese numero casa"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500">El email es obligatorio</p>
            )}
            <Label htmlFor="contrasena">contraseña Casa</Label>
            <Input
              type="password"
              placeholder="Ingrese contrasena"
              {...register("contrasena", { required: true })}
            />
            {errors.contrasena && (
              <p className="text-red-500">La contraseña es obligatoria</p>
            )}
            {!editing && (
              <>
                <Label htmlFor="numero">numero</Label>
                <Input
                  type="numero"
                  placeholder="Ingrese numero"
                  {...register("numero", { required: true })}
                />
                {errors.numero && (
                  <p className="text-red-500">El numero es obligatorio</p>
                )}
                <Label htmlFor="calle">calle</Label>
                <Input
                  type="text"
                  placeholder="Ingrese calle"
                  {...register("calle", { required: true })}
                />
                {errors.calle && (
                  <p className="text-red-500">La calle es obligatoria</p>
                )}
              </>
            )}
            <div className="mt-4">
              <Button type="submit">
                {editing ? "Guardar" : "Registrar Casa"}
              </Button>
              {editing && (
                <Button
                  type="button"
                  onClick={cancelEdit}
                  className="ml-4 bg-gray-500 hover:bg-gray-600"
                >
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </Card>
        <div className="mt-4 overflow-x-auto ">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="px-2 py-1 border">ID</th>
                <th className="px-2 py-1 border">Número</th>
                <th className="px-2 py-1 border">Calle</th>
                <th className="px-2 py-1 border">Email</th>
                <th className="px-2 py-1 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {residentes.map((residente) => (
                <tr key={residente.id}>
                  <td className="border px-2 py-1">{residente.id}</td>
                  <td className="border px-2 py-1">{residente.numero}</td>
                  <td className="border px-2 py-1">{residente.calle}</td>
                  <td className="border px-2 py-1">{residente.email}</td>
                  <td className="border px-2 py-1">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => editResidente(residente)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-1"
                      onClick={() => deleteResidente(residente.id)}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CrudResidentes;
