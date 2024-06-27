import React from "react";
import { useNavigate, Navigate } from "react-router-dom";

export function BackButton({ children }) {
  const navigate = useNavigate();
  return (
    <div className="mt-8 w-full">
      <button
        onClick={() => navigate("/")}
        className="relative inline-flex items-center justify-center gap-x-1.5 rounded-md
            bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-center
            text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-2
            focus-visible:outline-2 focus-visible:outline-indigo-500 
            focus-visible:focusring-offset-2 disabled:opacity-50
            disable:cursor-not-allowed w-full"
      >
        Volver a Inicio
      </button>
    </div>
  );
}

export default BackButton;
