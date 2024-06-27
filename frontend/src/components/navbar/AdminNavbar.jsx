import { useAuth } from "../../context/AuthContext"; // Asegúrate de que la ruta sea correcta
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";

function AdminNavbar() {
  const { isAuthAdmin, isAuthConserje, isAuthCasa, logout } = useAuth();

  const adminLinks = [
    { name: "Panel", href: "http://localhost:5173/admin/panel" },
    {
      name: "Administrar Residentes",
      href: "http://localhost:5173/admin/panel/crud/residentes",
    },
    {
      name: "Administrar Autos",
      href: "http://localhost:5173/admin/panel/crud/autos",
    },
    {
      name: "Administrar Conserjes",
      href: "http://localhost:5173/admin/panel/crud/conserjes",
    },
    {
      name: "Administrar Admins",
      href: "http://localhost:5173/admin/panel/crud/admins",
    },
    {
      name: "Ver Ingresos",
      href: "http://localhost:5173/admin/panel/consultaingresos",
    },
    {
      name: "Verificar Patente",
      href: "http://localhost:5173/admin/panel/verificarpatente",
    },
    {
      name: "Ver Visitas",
      href: "http://localhost:5173/admin/panel/visitas",
    },
  ];

  const conserjeLinks = [
    { name: "Panel Conserje", href: "/conserje/panel" },
    { name: "Verificar Patente", href: "/conserje/verificarpatente" },
    {
      name: "Ver Ingresos",
      href: "http://localhost:5173/conserje/panel/consultaingresos",
    },
    // { name: "Consulta Patente", href: "/conserje/consultapatente" },
    // { name: "Consulta Visita", href: "/conserje/consultavisitas" },
  ];

  const residenteLinks = [
    // { name: "Agregar Visitas", href: "/residente/agregarvisitas" },
    { name: "Mis Visitas", href: "/residente/panel" },
  ];

  function getLinks() {
    if (isAuthAdmin) return adminLinks;
    if (isAuthConserje) return conserjeLinks;
    if (isAuthCasa) return residenteLinks;
    return []; // Retorna una lista vacía si no se cumple ninguna condición
  }

  return (
    <>
      <Disclosure
        as="nav"
        className="bg-gray-800"
        style={{ zIndex: 20, position: "relative" }}
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {getLinks().map((link) => (
                        <>
                          <a
                            key={link.name}
                            href={link.href}
                            className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            {link.name}
                          </a>
                        </>
                      ))}
                      {(isAuthAdmin || isAuthCasa || isAuthConserje) && (
                        <button
                          className="ml-4 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          onClick={() => {
                            logout();
                          }}
                        >
                          Cerrar sesion
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  <DisclosureButton className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
              </div>
            </div>
            <DisclosurePanel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {getLinks().map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </>
  );
}

export default AdminNavbar;