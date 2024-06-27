// Modal.js
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { WebSocketContext } from "../context/WebSocketContext";

const VerificarPatente2 = () => {
  const response = useContext(WebSocketContext); // Variable de contexto correcta
  const [manualPatente, setManualPatente] = useState("");
  const [showManualInput, setShowManualInput] = useState(false);
  const [ingresoRegistrado, setIngresoRegistrado] = useState(false); // Estado para verificar si ya se registró el ingreso

  // Efecto para reiniciar ingresoRegistrado cuando cambia response
  useEffect(() => {
    setIngresoRegistrado(false);
  }, [response]);

  const handleNoClick = () => {
    setShowManualInput(true);
  };

  const handleManualPatenteChange = (event) => {
    setManualPatente(event.target.value);
  };

  const handleYesClick = async () => {
    if (ingresoRegistrado) {
      console.log("El ingreso ya ha sido registrado."); // Evita múltiples registros
      return;
    }

    try {
      const responseFromServer = await axios.post(
        "http://localhost:4000/api/ingreso",
        {
          patente: response.patente, // Usando response correctamente
          ispermitido: response.ingreso,
        }
      );
      console.log("Respuesta del servidor:", responseFromServer.data);
      setIngresoRegistrado(true); // Marcar el ingreso como registrado
    } catch (error) {
      console.error("Error al registrar el ingreso:", error);
      // Manejar errores aquí
    }
  };

  const handleSubmit = async () => {
    try {
      const responseFromServer = await axios.post(
        "http://localhost:4000/api/auto",
        {
          patente: manualPatente,
          withCredentials: true,
        }
      );
      console.log("Respuesta del servidor:", responseFromServer.data);
    } catch (error) {
      console.error("Error al enviar la patente manualmente:", error);
      // Manejar errores aquí
    }
  };

  if (!response) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h3 className="text-4xl font-bold mb-6">Esperando imagen...</h3>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 h-3/4 bg-zinc-900 border rounded-lg shadow dark:bg-gray-900 flex flex-col md:flex-row p-5">
          <img
            className="w-full md:w-1/2 h-64 md:h-full rounded-l-lg object-contain"
            src={`http://localhost:4000/uploads/${response.image}`}
            alt="Imagen verificada"
          />
          <div className="p-5 w-full md:w-1/2 text-white flex flex-col justify-between">
            <div>
              <h5 className="mb-2 text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">
                Patente: {response.patente}
              </h5>
              <p className="mb-3 text-base">
                {response.marca} {response.modelo}
              </p>
              {response.id && (
                <p className="mb-3 text-base">ID: {response.id}</p>
              )}
              {response.numero_casa && (
                <p className="mb-3 text-base">
                  Número de casa: {response.numero_casa}
                </p>
              )}
              {response.nombre && (
                <p className="mb-3 text-base">
                  Nombre Visita: {response.nombre}
                </p>
              )}
              {response.apellido && (
                <p className="mb-3 text-base">
                  Apellido Visita: {response.apellido}
                </p>
              )}
              {response.comentario && (
                <p className="mb-3 text-base">
                  Comentario: {response.comentario}
                </p>
              )}
              <p
                className={`mb-3 text-xl md:text-xl lg:text-xl font-bold ${
                  response.ingreso ? "text-green-500" : "text-red-500"
                }`}
              >
                {response.ingreso ? "ACCESO PERMITIDO" : "ACCESO DENEGADO"}
              </p>
              <p className="text-xl md:text-2xl lg:text-3xl font-bold">
                ¿LA PATENTE ES CORRECTA? <br />
                (ESTA ACCIÓN REGISTRARÁ EL ACCESO)
              </p>
            </div>
            <div>
              <button
                className="w-1/4 mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleYesClick} // Maneja el clic en el botón "Sí"
              >
                Sí
              </button>
              <button
                className="w-1/4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleNoClick}
              >
                No
              </button>
              {showManualInput && (
                <div className="mt-4">
                  <input
                    type="text"
                    value={manualPatente}
                    onChange={handleManualPatenteChange}
                    placeholder="Ingrese la patente manualmente"
                    className="w-full px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline border border-gray-300"
                  />
                  <button
                    onClick={handleSubmit}
                    className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Enviar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerificarPatente2;
