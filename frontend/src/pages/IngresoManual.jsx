import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { set } from 'date-fns';

const IngresoManual = () => {
  const [manualPatente, setManualPatente] = useState('');
  const [manualPatenteNoEncontrada, setManualPatenteNoEncontrada] = useState('');
  const [patenteEncontrada, setPatenteEncontrada] = useState(false);
  const [patenteNoEncontrada, setPatenteNoEncontrada] = useState(false);
  const [mostrarBotonRegistro, setMostrarBotonRegistro] = useState(false);
  const [mostrarBotonRegistroNoPermitido, setMostrarBotonRegistroNoPermitido] = useState(false); // [1]
  const [ingresoRegistrado, setIngresoRegistrado] = useState(false);
  const [response, setResponse] = useState({});
  const [isVisita, setIsVisita] = useState(false); // [2]

    const navigate = useNavigate();


  const buscarPatente = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/auto', {
        patente: manualPatente,
      });
      
      if (response.data) {
        console.log('Patente encontrada:', response.data);
        // console.log('es visita?:', response);
        setResponse(response.data);
        setPatenteEncontrada(true);
        setMostrarBotonRegistro(true);
        setMostrarBotonRegistroNoPermitido(false); // [1]
        setPatenteNoEncontrada(false);
        if(response.data.visita){
          setIsVisita(true);
        }else{
          setIsVisita(false);
        }   
      } else {
        setPatenteEncontrada(false);
        alert('Patente no encontrada');
      }
    } catch (error) {
        setPatenteEncontrada(false);
        setMostrarBotonRegistro(false);
        setMostrarBotonRegistroNoPermitido(true); // [1]    
        setPatenteNoEncontrada(true);
        setManualPatenteNoEncontrada(manualPatente);
      console.log('Error al buscar la patente');
      
    }
  };

  const registrarIngresoPermitido = async () => {
    if (ingresoRegistrado) {
      console.log("El ingreso ya ha sido registrado.");
      return;
    }

    try {
      const responseFromServer = await axios.post(
        "http://localhost:4000/api/ingreso",
        {
          patente: response.patente,
          ispermitido: true
        }
      );
      
      console.log("Respuesta del servidor:", responseFromServer.data);
      setIngresoRegistrado(true);
      console.log("es visita?:", isVisita);
        if(isVisita){
            console.log(response.id);
           const responsedelete =  await axios.post("http://localhost:4000/api/visita", {
                id:  response.id,
                
              });
              alert('Visita ingresada correctamente, redirigiendo a panel de administrador');
        }
        navigate('/admin/panel');
    } catch (error) {
      console.error("Error al registrar el ingreso:", error);
    }
  };

  const registrarIngresoNoPermitido = async () => {
    if (ingresoRegistrado) {
      console.log("El ingreso ya ha sido registrado.");
      return;
    }

    try {
      const responseFromServer = await axios.post(
        "http://localhost:4000/api/ingreso",
        {
          patente: manualPatente,
          ispermitido: false
        }
      );
      console.log("Respuesta del servidor:", responseFromServer.data);
      setIngresoRegistrado(true);
        navigate('/admin/panel');
    } catch (error) {
      console.error("Error al registrar el ingreso:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <div className="flex items-center">
          <input
            className="text-black mr-2"
            type="text"
            value={manualPatente}
            onChange={(e) => setManualPatente(e.target.value)}
            placeholder="Ingrese la patente manualmente"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={buscarPatente}>Buscar Patente</button>
        </div>
        {patenteEncontrada && (
          <table className="mt-4 border-collapse border border-slate-400">
            <thead>
              <tr>
                <th className="border border-slate-300">Campo</th>
                <th className="border border-slate-300">Valor</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(response).map(([key, value]) => (
                <tr key={key}>
                  <td className="border border-slate-300 p-2">{key}</td>
                  <td className="border border-slate-300 p-2">{value.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {patenteNoEncontrada && (
          <p className="mt-4 text-red">INGRESO DENEGADO PARA LA PATENTE: {manualPatenteNoEncontrada}</p>
        )}
        {mostrarBotonRegistro && (
          <button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={registrarIngresoPermitido}>Registrar Ingreso</button>
        )}
        {mostrarBotonRegistroNoPermitido && ( // [1]
          <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={registrarIngresoNoPermitido}>Registrar Ingreso No Permitido</button>
        )}
      </div>
    </div>
  );
};

export default IngresoManual;