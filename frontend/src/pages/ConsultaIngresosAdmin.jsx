import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

function ConsultaIngresosAdmin() {
  const [ingresosPermitidos, setIngresosPermitidos] = useState([]);
  const [ingresosNoPermitidos, setIngresosNoPermitidos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/ingresospermitidos", {
        withCredentials: true,
      })
      .then((response) => {
        const ingresos = response.data.map((ingreso) => ({
          ...ingreso,
          fecha_ingreso: dayjs(ingreso.fecha_ingreso).format("YYYY-MM-DD"),
        }));
        setIngresosPermitidos(ingresos);
      })
      .catch((error) => {
        console.error("Error fetching allowed entries: ", error);
      });

    axios
      .get("http://localhost:4000/api/ingresosnopermitidos", {
        withCredentials: true,
      })
      .then((response) => {
        const ingresos = response.data.map((ingreso) => ({
          ...ingreso,
          fecha_ingreso: dayjs(ingreso.fecha_ingreso).format("YYYY-MM-DD"),
        }));
        setIngresosNoPermitidos(ingresos);
      })
      .catch((error) => {
        console.error("Error fetching disallowed entries: ", error);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-white text-xl mb-4">Consulta Ingresos</h1>

      <h2 className="text-white text-lg mb-2">Ingresos Permitidos</h2>
      <table className="min-w-full divide-y divide-gray-200 bg-zinc-900 text-white mb-6">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-700">ID</th>
            <th className="px-4 py-2 border border-gray-700">Fecha Ingreso</th>
            <th className="px-4 py-2 border border-gray-700">Patente</th>
            <th className="px-4 py-2 border border-gray-700">Permitido</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {ingresosPermitidos.map((ingreso) => (
            <tr key={ingreso.id}>
              <td className="px-4 py-2 border border-gray-700">{ingreso.id}</td>
              <td className="px-4 py-2 border border-gray-700">
                {ingreso.fecha_ingreso}
              </td>
              <td className="px-4 py-2 border border-gray-700">
                {ingreso.patente}
              </td>
              <td className="px-4 py-2 border border-gray-700">
                {ingreso.ispermitido ? "Sí" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-white text-lg mb-2">Ingresos No Permitidos</h2>
      <table className="min-w-full divide-y divide-gray-200 bg-zinc-900 text-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-700">ID</th>
            <th className="px-4 py-2 border border-gray-700">Fecha Ingreso</th>
            <th className="px-4 py-2 border border-gray-700">Patente</th>
            <th className="px-4 py-2 border border-gray-700">Permitido</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {ingresosNoPermitidos.map((ingreso) => (
            <tr key={ingreso.id}>
              <td className="px-4 py-2 border border-gray-700">{ingreso.id}</td>
              <td className="px-4 py-2 border border-gray-700">
                {ingreso.fecha_ingreso}
              </td>
              <td className="px-4 py-2 border border-gray-700">
                {ingreso.patente}
              </td>
              <td className="px-4 py-2 border border-gray-700">
                {ingreso.ispermitido ? "Sí" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConsultaIngresosAdmin;
