import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const diasSemana = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

const LineChartPermitido = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/ingresospermitidos")
      .then((response) => {
        setData(response.data);
        console.log("Data fetched:", response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const obtenerDatosSemanaActual = () => {
    const fechaActual = new Date();
    const diaActual = fechaActual.getDay(); // Obtener el día de la semana actual (0 para Domingo, 1 para Lunes, ...)

    // Calcular los días de la semana actual
    const diasSemanaActual = diasSemana.map((dia, index) => {
      const diferenciaDias = diaActual - index;
      const fechaDia = new Date();
      fechaDia.setDate(fechaActual.getDate() - diferenciaDias);
      return fechaDia.toISOString().split("T")[0];
    });

    // Filtrar los datos por la semana actual
    const datosSemanaActual = data.filter((d) =>
      diasSemanaActual.includes(d.fecha_ingreso.split("T")[0])
    );

    return datosSemanaActual;
  };

  const procesarDatos = () => {
    const ingresosPorDia = diasSemana.map((dia) => {
      const ingresosDia = obtenerDatosSemanaActual().filter(
        (d) => new Date(d.fecha_ingreso).getDay() === diasSemana.indexOf(dia)
      );
      return ingresosDia.reduce((acc, curr) => acc + 1, 0); // Contar los ingresos por día
    });
    return ingresosPorDia;
  };

  const ingresos = procesarDatos();

  const midata = {
    labels: diasSemana,
    datasets: [
      {
        label: "Ingresos Permitidos",
        data: ingresos,
        tension: 0.5,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        pointRadius: 5,
        pointBorderColor: "rgba(75, 192, 192)",
        pointBackgroundColor: "rgba(75, 192, 192)",
      },
    ],
  };

  const misoptions = {
    scales: {
      y: {
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        ticks: { color: "rgb(75, 192, 192)" },
      },
    },
  };

  return (
    <div>
      <h1>Gráfico de Ingresos Semanales</h1>
      <Line data={midata} options={misoptions} />
    </div>
  );
};

export default LineChartPermitido;
