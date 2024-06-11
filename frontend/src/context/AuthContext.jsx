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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
