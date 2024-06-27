import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

function ConsultaVisitas() {
  const [visitas, setVisitas] = useState([]);
  const [visitasHoy, setVisitasHoy] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/allvisitas", { withCredentials: true })
      .then((response) => {
        const hoy = dayjs().format("YYYY-MM-DD");
        const visitas = response.data.map((visita) => ({
          ...visita,
          fecha_ingreso: dayjs(visita.fecha_ingreso).format("YYYY-MM-DD"),
        }));
        setVisitas(visitas);
        const visitasDeHoy = visitas.filter(
          (visita) => visita.fecha_ingreso === hoy
        );
        setVisitasHoy(visitasDeHoy);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-white text-lg mb-2">Visitas de Hoy</h2>
      <table className="min-w-full divide-y divide-gray-200 bg-zinc-900 text-white mb-6">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-700">ID</th>
            <th className="px-4 py-2 border border-gray-700">Nombre</th>
            <th className="px-4 py-2 border border-gray-700">Apellido</th>
            <th className="px-4 py-2 border border-gray-700">Fecha Ingreso</th>
            <th className="px-4 py-2 border border-gray-700">RUT</th>
            <th className="px-4 py-2 border border-gray-700">Patente</th>
            <th className="px-4 py-2 border border-gray-700">Comentario</th>
            <th className="px-4 py-2 border border-gray-700">Casa ID</th>
            <th className="px-4 py-2 border border-gray-700">Casa Número</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {visitasHoy.map((visita) => (
            <tr key={visita.id}>
              <td className="px-4 py-2 border border-gray-700">{visita.id}</td>
              <td className="px-4 py-2 border border-gray-700">
                {visita.nombre}
              </td>
              <td className="px-4 py-2 border border-gray-700">
                {visita.apellido}
              </td>
              <td className="px-4 py-2 border border-gray-700">
                {visita.fecha_ingreso}
              </td>
              <td className="px-4 py-2 border border-gray-700">{visita.rut}</td>
              <td className="px-4 py-2 border border-gray-700">
                {visita.patente}
              </td>
              <td className="px-4 py-2 border border-gray-700">
                {visita.comentario}
              </td>
              <td className="px-4 py-2 border border-gray-700">
                {visita.casa_id}
              </td>
              <td className="px-4 py-2 border border-gray-700">
                {visita.casa_numero}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-white text-lg mb-2">Todas las Visitas</h2>
      <table className="min-w-full divide-y divide-gray-200 bg-zinc-900 text-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-700">ID</th>
            <th className="px-4 py-2 border border-gray-700">Nombre</th>
            <th className="px-4 py-2 border border-gray-700">Apellido</th>
            <th className="px-4 py-2 border border-gray-700">Fecha Ingreso</th>
            <th className="px-4 py-2 border border-gray-700">RUT</th>
            <th className="px-4 py-2 border border-gray-700">Patente</th>
            <th className="px-4 py-2 border border-gray-700">Comentario</th>
            <th className="px-4 py-2 border border-gray-700">Casa ID</th>
            <th className="px-4 py-2 border border-gray-700">Casa Número</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {visitas.map((visita) => (
            <tr key={visita.id}>
              <td className="px-4 py-2 border border-gray-700">{visita.id}</td>
              <td className="px-4 py-2 border border-gray-700">
                {visita.nombre}
              </td>
              <td className="px-4 py-2 border border-gray-700">
                {visita.apellido}
              </td>
              <td className="px-4 py-2 border border-gray-700">
                {visita.fecha_ingreso}
              </td>
              <td className="px-4 py-2 border border-gray-700">{visita.rut}</td>
              <td className="px-4 py-2 border border-gray-700">
                {visita.patente}
              </td>
              <td className="px-4 py-2 border border-gray-700">
                {visita.comentario}
              </td>
              <td className="px-4 py-2 border border-gray-700">
                {visita.casa_id}
              </td>
              <td className="px-4 py-2 border border-gray-700">
                {visita.casa_numero}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConsultaVisitas;
