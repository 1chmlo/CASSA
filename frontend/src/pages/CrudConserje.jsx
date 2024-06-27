import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button, Card, Input, Label } from "../components/ui";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/navbar/AdminNavbar";

const CrudConserjes = () => {
  const [conserjes, setConserjes] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { registrarConserje } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [currentConserje, setCurrentConserje] = useState(null);

  const fetchConserjes = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/conserje", {
        withCredentials: true,
      });
      setConserjes(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching conserjes:", error);
      setConserjes([]);
    }
  };

  useEffect(() => {
    fetchConserjes();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (editing) {
      try {
        await axios.put(
          "http://localhost:4000/api/conserje",
          { ...data, id: currentConserje.id },
          { withCredentials: true }
        );
        fetchConserjes();
        setEditing(false);
        reset();
      } catch (error) {
        console.error("Error updating conserje:", error);
      }
    } else {
      try {
        await registrarConserje(data);
        fetchConserjes();
        reset();
      } catch (error) {
        console.error("Error creating conserje:", error);
      }
    }
  });

  const editConserje = (conserje) => {
    setEditing(true);
    setCurrentConserje(conserje);
    reset(conserje);
  };

  const cancelEdit = () => {
    setEditing(false);
    reset();
  };

  const deleteConserje = async (id) => {
    try {
      await axios.delete("http://localhost:4000/api/conserje", {
        data: { id },
        withCredentials: true,
      });
      fetchConserjes();
    } catch (error) {
      console.error("Error deleting conserje:", error);
    }
  };

  return (
    <>
      <div className="p-4 px-60">
        <Card>
          <h3 className="text-2xl font-bold">
            {editing ? "Editar Conserje" : "Registro Conserje"}
          </h3>
          <form onSubmit={onSubmit}>
            <Label htmlFor="email">Email Conserje</Label>
            <Input
              placeholder="Ingrese email conserje"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500">El email es obligatorio</p>
            )}
            <Label htmlFor="contrasena">Contraseña Conserje</Label>
            <Input
              type="password"
              placeholder="Ingrese contraseña"
              {...register("contrasena", { required: true })}
            />
            {errors.contrasena && (
              <p className="text-red-500">La contraseña es obligatoria</p>
            )}
            <Label htmlFor="rut">RUT Conserje</Label>
            <Input
              placeholder="Ingrese RUT"
              {...register("rut", { required: true })}
            />
            {errors.rut && (
              <p className="text-red-500">El RUT es obligatorio</p>
            )}
            <Label htmlFor="nombres">Nombres Conserje</Label>
            <Input
              placeholder="Ingrese nombres"
              {...register("nombres", { required: true })}
            />
            {errors.nombres && (
              <p className="text-red-500">Los nombres son obligatorios</p>
            )}
            <Label htmlFor="apellidos">Apellidos Conserje</Label>
            <Input
              placeholder="Ingrese apellidos"
              {...register("apellidos", { required: true })}
            />
            {errors.apellidos && (
              <p className="text-red-500">Los apellidos son obligatorios</p>
            )}
            <div className="mt-4">
              <Button type="submit">
                {editing ? "Guardar" : "Registrar Conserje"}
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
        <div className="mt-4 overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="px-2 py-1 border">ID</th>
                <th className="px-2 py-1 border">RUT</th>
                <th className="px-2 py-1 border">Nombres</th>
                <th className="px-2 py-1 border">Apellidos</th>
                <th className="px-2 py-1 border">Email</th>
                <th className="px-2 py-1 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {conserjes.map((conserje) => (
                <tr key={conserje.id}>
                  <td className="border px-2 py-1">{conserje.id}</td>
                  <td className="border px-2 py-1">{conserje.rut}</td>
                  <td className="border px-2 py-1">{conserje.nombres}</td>
                  <td className="border px-2 py-1">{conserje.apellidos}</td>
                  <td className="border px-2 py-1">{conserje.email}</td>
                  <td className="border px-2 py-1">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => editConserje(conserje)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-1"
                      onClick={() => deleteConserje(conserje.id)}
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

export default CrudConserjes;
