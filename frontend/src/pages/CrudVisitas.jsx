import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button, Card, Input, Label } from "../components/ui";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CrudVisitas = () => {
  const [visitas, setVisitas] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { registrarVisita } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [currentVisita, setCurrentVisita] = useState(null);

  const fetchVisitas = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/visitas", {
        withCredentials: true,
      });
      setVisitas(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching visitas:", error);
      setVisitas([]);
    }
  };

  useEffect(() => {
    fetchVisitas();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (editing) {
      try {
        await axios.put(
          "http://localhost:4000/api/visitas",
          { ...data, id: currentVisita.id },
          { withCredentials: true }
        );
        fetchVisitas();
        setEditing(false);
        reset();
      } catch (error) {
        console.error("Error updating visita:", error);
      }
    } else {
      try {
        await registrarVisita(data);
        fetchVisitas();
        reset();
      } catch (error) {
        console.error("Error creating visita:", error);
      }
    }
  });

  const editVisita = (visita) => {
    setEditing(true);
    setCurrentVisita(visita);
    reset(visita);
  };

  const cancelEdit = () => {
    setEditing(false);
    reset();
  };

  const deleteVisita = async (id) => {
    try {
      await axios.delete("http://localhost:4000/api/visitas", {
        data: { id },
        withCredentials: true,
      });
      fetchVisitas();
    } catch (error) {
      console.error("Error deleting visita:", error);
    }
  };

  // Obtener la fecha actual en el formato yyyy-MM-dd
  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const MM = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${MM}-${dd}`;
  };

  return (
    <div className="p-4 px-60">
      <Card>
        <h3 className="text-2xl font-bold">
          {editing ? "Editar Visita" : "Registrar Visita"}
        </h3>
        <form onSubmit={onSubmit}>
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            placeholder="Ingrese nombre"
            {...register("nombre", { required: true })}
          />
          {errors.nombre && (
            <p className="text-red-500">El nombre es obligatorio</p>
          )}
          <Label htmlFor="apellido">Apellido</Label>
          <Input
            placeholder="Ingrese apellido"
            {...register("apellido", { required: true })}
          />
          {errors.apellido && (
            <p className="text-red-500">El apellido es obligatorio</p>
          )}
          <Label htmlFor="fecha_ingreso">Fecha de Ingreso</Label>
          <Input
            type="date"
            placeholder="Ingrese fecha de ingreso"
            min={getCurrentDate()} // Establecer la fecha mínima
            {...register("fecha_ingreso", { required: true })}
          />
          {errors.fecha_ingreso && (
            <p className="text-red-500">La fecha de ingreso es obligatoria</p>
          )}
          <Label htmlFor="rut">RUT</Label>
          <Input
            placeholder="Ingrese RUT"
            {...register("rut", { required: true })}
          />
          {errors.rut && <p className="text-red-500">El RUT es obligatorio</p>}
          <Label htmlFor="patente">Patente</Label>
          <Input
            placeholder="Ingrese patente"
            {...register("patente", { required: true })}
          />
          {errors.patente && (
            <p className="text-red-500">La patente es obligatoria</p>
          )}
          <Label htmlFor="comentario">Comentario</Label>
          <Input
            placeholder="Ingrese comentario"
            {...register("comentario", { required: true })}
          />
          {errors.comentario && (
            <p className="text-red-500">El comentario es obligatorio</p>
          )}
          <Button type="submit">{editing ? "Actualizar" : "Registrar"}</Button>
          {editing && <Button onClick={cancelEdit}>Cancelar</Button>}
        </form>
      </Card>
      <h3 className="text-2xl font-bold mt-4">Visitas Registradas</h3>
      {visitas.length === 0 ? (
        <p>No hay visitas registradas.</p>
      ) : (
        <table className="min-w-full bg-black text-white">
          <thead>
            <tr>
              <th className="py-2">ID</th>
              <th className="py-2">Nombre</th>
              <th className="py-2">Apellido</th>
              <th className="py-2">Fecha de Ingreso</th>
              <th className="py-2">RUT</th>
              <th className="py-2">Patente</th>
              <th className="py-2">Comentario</th>
              <th className="py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visitas.map((visita) => (
              <tr key={visita.id}>
                <td className="border px-4 py-2">{visita.id}</td>
                <td className="border px-4 py-2">{visita.nombre}</td>
                <td className="border px-4 py-2">{visita.apellido}</td>
                <td className="border px-4 py-2">{visita.fecha_ingreso}</td>
                <td className="border px-4 py-2">{visita.rut}</td>
                <td className="border px-4 py-2">{visita.patente}</td>
                <td className="border px-4 py-2">{visita.comentario}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => editVisita(visita)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-1"
                    onClick={() => deleteVisita(visita.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CrudVisitas;
