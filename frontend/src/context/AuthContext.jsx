import { createContext, useState, useContext } from "react";
import axios from "axios";
export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new error("useAuth tiene que estar dentro de un Provider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthAdmin, setIsAuthAdmin] = useState(false);
  const [isAuthCasa, setIsAuthCasa] = useState(false);
  const [isAuthConserje, setIsAuthConserje] = useState(false);
  const [errors, setErrors] = useState(null);

  //registrarresidente
  const registrarResidente = async (data) => {
    const res = await axios.post(
      "http://localhost:4000/api/register/casa",
      data,
      { withCredentials: true }
    );

    console.log(res);
  };
  //Ingresar Residente
  const ingresarResidente = async (data) => {
    const res = await axios.post("http://localhost:4000/api/login/casa", data, {
      withCredentials: true,
    });
    console.log(res);
    setUser(res.data);
    setIsAuthCasa(true);
  };

  //Ingresar Admin
  const ingresarAdmin = async (data) => {
    const res = await axios.post(
      "http://localhost:4000/api/login/admin",
      data,
      {
        withCredentials: true,
      }
    );
    console.log(res);
    setUser(res.data);
    setIsAuthAdmin(true);
  };

  //Ingresar Conserje
  const ingresarConserje = async (data) => {
    const res = await axios.post(
      "http://localhost:4000/api/login/conserje",
      data,
      {
        withCredentials: true,
      }
    );
    console.log(res);
    setUser(res.data);
    setIsAuthConserje(true);
  };

  //Ingresar Auto
  const registrarAuto = async (data) => {
    const res = await axios.post("http://localhost:4000/api/autos", data, {
      withCredentials: true,
    });

    console.log(res);
  };

  //Registrar Conserje
  const registrarConserje = async (data) => {
    const res = await axios.post(
      "http://localhost:4000/api/register/conserje",
      data,
      {
        withCredentials: true,
      }
    );

    console.log(res);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthAdmin,
        isAuthCasa,
        isAuthConserje,
        errors,
        registrarResidente,
        ingresarResidente,
        ingresarAdmin,
        ingresarConserje,
        registrarAuto,
        registrarConserje,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
