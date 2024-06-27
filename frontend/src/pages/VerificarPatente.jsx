import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const VerificarPatente = () => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("imageVerified", (res) => {
      setResponse(res);
    });

    // Limpiar el evento al desmontar el componente
    return () => {
      socket.off("imageVerified");
    };
  }, []);

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
    <div className="h-screen flex items-center justify-center">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-96 w-full object-cover md:w-96"
              src={`http://localhost:4000/uploads/${response.image}`}
              alt="Imagen verificada"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-6xl text-white font-semibold">
              Patente: {response.patente}
            </div>
            <p className="mt-2 text-2xl text-gray-500">
              {response.marca} {response.modelo}
            </p>
            {response.id && (
              <p className="mt-2 text-2xl text-gray-500">ID: {response.id}</p>
            )}
            {response.numero_casa && (
              <p className="mt-2 text-2xl text-gray-500">
                Número de casa: {response.numero_casa}
              </p>
            )}
            <p
              className={`mt-2 text-4xl font-bold ${
                response.ingreso ? "text-green-500" : "text-red-500"
              }`}
            >
              {response.ingreso ? "ACCESO PERMITIDO" : "ACCESO DENEGADO"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificarPatente;
