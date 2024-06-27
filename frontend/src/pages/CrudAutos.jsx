import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button, Card, Input, Label } from "../components/ui";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/navbar/AdminNavbar";

const CrudAutos = () => {
  const [autos, setAutos] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { registrarAuto } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [currentAuto, setCurrentAuto] = useState(null);

  const fetchAutos = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/autos", {
        withCredentials: true,
      });
      setAutos(response.data);
    } catch (error) {
      console.error("Error fetching autos:", error);
    }
  };

  useEffect(() => {
    fetchAutos();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (editing) {
      try {
        await axios.put(
          "http://localhost:4000/api/autos",
          {
            ...data,
            id: currentAuto.id,
          },
          { withCredentials: true }
        );
        fetchAutos();
        setEditing(false);
        reset();
      } catch (error) {
        console.error("Error updating auto:", error);
      }
    } else {
      try {
        await registrarAuto(data);
        fetchAutos();
        reset();
      } catch (error) {
        console.error("Error creating auto:", error);
      }
    }
  });

  const editAuto = (auto) => {
    setEditing(true);
    setCurrentAuto(auto);
    reset(auto);
  };

  const cancelEdit = () => {
    setEditing(false);
    reset();
  };

  const deleteAuto = async (id) => {
    try {
      await axios.delete("http://localhost:4000/api/autos", {
        data: { id },
        withCredentials: true,
      });
      fetchAutos();
    } catch (error) {
      console.error("Error deleting auto:", error);
    }
  };

  return (
    <>
      <div className="p-4 px-60">
        <Card>
          <h3 className="text-2xl font-bold">
            {editing ? "Editar Auto" : "Registrar Auto"}
          </h3>
          <form onSubmit={onSubmit}>
            <Label htmlFor="patente">Patente</Label>
            <Input
              placeholder="Ingrese la patente"
              {...register("patente", { required: true })}
            />
            {errors.patente && (
              <p className="text-red-500">La patente es obligatoria</p>
            )}
            <Label htmlFor="marca">Marca</Label>
            <Input
              placeholder="Ingrese la marca"
              {...register("marca", { required: true })}
            />
            {errors.marca && (
              <p className="text-red-500">La marca es obligatoria</p>
            )}
            <Label htmlFor="modelo">Modelo</Label>
            <Input
              placeholder="Ingrese el modelo"
              {...register("modelo", { required: true })}
            />
            {errors.modelo && (
              <p className="text-red-500">El modelo es obligatorio</p>
            )}
            <Label htmlFor="numero_casa">Número de Casa</Label>
            <Input
              type="number"
              placeholder="Ingrese el número de casa"
              {...register("numero_casa", { required: true })}
            />
            {errors.numero_casa && (
              <p className="text-red-500">El número de casa es obligatorio</p>
            )}
            <div className="mt-4">
              <Button type="submit">
                {editing ? "Guardar" : "Registrar Auto"}
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
                <th className="px-2 py-1 border">Patente</th>
                <th className="px-2 py-1 border">Marca</th>
                <th className="px-2 py-1 border">Modelo</th>
                <th className="px-2 py-1 border">Número de Casa</th>
                <th className="px-2 py-1 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {autos.map((auto) => (
                <tr key={auto.id}>
                  <td className="border px-2 py-1">{auto.id}</td>
                  <td className="border px-2 py-1">{auto.patente}</td>
                  <td className="border px-2 py-1">{auto.marca}</td>
                  <td className="border px-2 py-1">{auto.modelo}</td>
                  <td className="border px-2 py-1">{auto.numero_casa}</td>
                  <td className="border px-2 py-1">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => editAuto(auto)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-1"
                      onClick={() => deleteAuto(auto.id)}
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

export default CrudAutos;
