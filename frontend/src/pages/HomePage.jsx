import React, { useContext } from "react";
import { Button, Card, Input, Label } from "../components/ui";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function HomePage() {
  const data = useAuth();
  console.log(data);
  return (
    <>
      <div class="relative flex gap-10 min-h-screen flex-col justify-center items-center overflow-hidden bg-zinc-900  py-6 sm:py-12">
        <Link to="/login/admin">
          <button class="btn-default overflow-hidden relative w-64 bg-stone-50 text-gray-900 py-4 px-4 rounded-xl font-bold uppercase transition-all duration-100 -- hover:shadow-md border border-stone-100 hover:bg-gradient-to-t hover:from-stone-100 before:to-stone-50 hover:-translate-y-[3px]">
            <span class="relative">Login Admin</span>
          </button>
        </Link>
        <Link to="/login/residente">
          <button class="btn-default overflow-hidden relative w-64 bg-stone-50 text-gray-900 py-4 px-4 rounded-xl font-bold uppercase transition-all duration-100 -- hover:shadow-md border border-stone-100 hover:bg-gradient-to-t hover:from-stone-100 before:to-stone-50 hover:-translate-y-[3px]">
            <span class="relative">Login Residente</span>
          </button>
        </Link>
        <Link to="/login/conserje">
          <button class="btn-default overflow-hidden relative w-64 bg-stone-50 text-gray-900 py-4 px-4 rounded-xl font-bold uppercase transition-all duration-100 -- hover:shadow-md border border-stone-100 hover:bg-gradient-to-t hover:from-stone-100 before:to-stone-50 hover:-translate-y-[3px]">
            <span class="relative">Login Conserje</span>
          </button>
        </Link>
      </div>
    </>
  );
}

export default HomePage;
