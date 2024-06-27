import React from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouteAdmin = ({ isAdmin, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!isAdmin) {
    return <Navigate to="/login/admin" replace />;
  }

  return <Outlet />;
};

export const ProtectedRouteResidente = ({ isResidente, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!isResidente) {
    return <Navigate to="/login/residente" replace />;
  }

  return <Outlet />;
};

export const ProtectedRouteConserje = ({ isConserje, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!isConserje) {
    return <Navigate to="/login/conserje" replace />;
  }

  return <Outlet />;
};
