import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { set } from "react-hook-form";
export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new error("useAuth tiene que estar dentro de un Provider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [residente, setResidente] = useState(null);
  const [conserje, setConserje] = useState(null);
  const [isAuthAdmin, setIsAuthAdmin] = useState(false);
  const [isAuthCasa, setIsAuthCasa] = useState(false);
  const [isAuthConserje, setIsAuthConserje] = useState(false);
  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState(null);

  const registrarVisita = async (data) => {
    const res = await axios.post("http://localhost:4000/api/visitas", data, {
      withCredentials: true,
    });

    console.log(res);
  };

  //registrarresidente
  const registrarResidente = async (data) => {
    const res = await axios.post(
      "http://localhost:4000/api/register/casa",
      data,
      { withCredentials: true }
    );

    console.log(res);
  };

  const registrarAdmin = async (data) => {
    const res = await axios.post(
      "http://localhost:4000/api/register/admin",
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
    setResidente(res.data);
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
    setAdmin(res.data);
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
    setConserje(res.data);
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
  const logout = async () => {
    const res = await axios.post("http://localhost:4000/api/logout", {
      withCredentials: true,
    });
    console.log(res);
    setAdmin(null);
    setResidente(null);
    setConserje(null);
    setIsAuthAdmin(false);
    setIsAuthCasa(false);
    setIsAuthConserje(false);
    Cookie.remove("rol");
    Cookie.remove("token");
  };
  useEffect(() => {
    const rol = Cookie.get("rol");
    const token = Cookie.get("token");
    if (rol && token) {
      switch (rol) {
        case "admin":
          axios
            .get("http://localhost:4000/api/profile/admin", {
              withCredentials: true,
            })
            .then((res) => {
              setAdmin(res.data);
              setIsAuthAdmin(true);
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => setLoading(false));
          break;
        case "casa":
          axios
            .get("http://localhost:4000/api/profile/residente", {
              withCredentials: true,
            })
            .then((res) => {
              setResidente(res.data);
              setIsAuthCasa(true);
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => setLoading(false));
          break;
        case "conserje":
          axios
            .get("http://localhost:4000/api/profile/conserje", {
              withCredentials: true,
            })
            .then((res) => {
              setConserje(res.data);
              setIsAuthConserje(true);
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => setLoading(false));
          break;
        default:
          console.log("No hay un rol definido");
          setLoading(false);
          break;
      }
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        admin,
        residente,
        conserje,
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
        logout,
        loading,
        registrarVisita,
        registrarAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
