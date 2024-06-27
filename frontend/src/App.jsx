import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";

import PanelAdmin from "./pages/PanelAdmin";

import Misvisitas from "./pages/Misvisitas";
import Agregarvisitas from "./pages/Agregarvisitas";
import RegisterConserjePage from "./pages/RegisterConserjePage";
import RegisterAdminPage from "./pages/RegisterAdminPage";
import RegisterResidentePage from "./pages/RegisterResidentePage";
import LoginAdminPage from "./pages/LoginAdminPage";
import LoginResidentePage from "./pages/LoginResidentePage";
import LoginConserjePage from "./pages/LoginConserjePage";
import HomePage from "./pages/HomePage";
import CrudResidentes from "./pages/CrudResidentes";
import CrudAutos from "./pages/CrudAutos";
import CrudConserjes from "./pages/CrudConserje";
import PanelConserje from "./pages/PanelConserje";
import PanelConserje2 from "./pages/PanelConserje2";
import VerificarPatente from "./pages/VerificarPatente";
import ConsultaPatente from "./pages/ConsultaPatente";
import ConsultaVisita from "./pages/ConsultaVisitas.jsx";
import Modal from "./context/Modal.jsx";
import { WebSocketProvider } from "./context/WebSocketContext";
import AdminNavbar from "./components/navbar/AdminNavbar.jsx";
import AdminVerificarPatente from "./pages/AdminVerificarPatente.jsx";
import { useAuth } from "./context/AuthContext";
import {
  ProtectedRouteAdmin,
  ProtectedRouteConserje,
  ProtectedRouteResidente,
} from "./components/ProtectedRoute.jsx";
import CrudAdmins from "./pages/CrudAdmins.jsx";
import CrudVisitas from "./pages/CrudVisitas.jsx";
import VerificarPatente2 from "./pages/VerificarPatente2.jsx";
import ConsultaVisitas from "./pages/ConsultaVisitas.jsx";
import ConsultaVisitasAdmin from "./pages/ConsultaVisitasAdmin.jsx";
import ConsultaIngresosAdmin from "./pages/ConsultaIngresosAdmin.jsx";
import ConsultaIngresos from "./pages/ConsultaIngresos.jsx";
function App() {
  const { isAuthAdmin, isAuthCasa, isAuthConserje, loading } = useAuth();
  // if (isAuthAdmin) console.log("eres admin", isAuthAdmin);
  // if (isAuthCasa) console.log("eres casa", isAuthCasa);
  // if (isAuthConserje) console.log("eres conserje", isAuthConserje);
  console.log(
    `Admin: ${isAuthAdmin}, Casa: ${isAuthCasa}, Conserje: ${isAuthConserje} en el contexto, se esta cargando?: ${loading}`
  );
  return (
    <WebSocketProvider>
      <>
        <AdminNavbar />
        <Routes>
          {/*RUTAS PUBLICAS*/}
          <Route path="/login/admin" element={<LoginAdminPage />} />
          <Route path="/login/residente" element={<LoginResidentePage />} />
          <Route path="/login/conserje" element={<LoginConserjePage />} />
          <Route path="/" element={<HomePage />} />

          {/*RUTAS CONSERJE*/}
          <Route
            element={
              <ProtectedRouteConserje
                isConserje={isAuthConserje}
                loading={loading}
              />
            }
          >
            <Route path="/conserje/panel" element={<PanelConserje />} />
            <Route
              path="/conserje/verificarpatente"
              // element={<VerificarPatente2 />}
              element={<PanelConserje2 />}
            />
            <Route
              path="/conserje/panel/consultaingresos"
              element={<ConsultaIngresos />}
            />
            {/* <Route
              path="/conserje/consultapatente"
              element={<ConsultaPatente />}
            /> */}
            {/* <Route
              path="/conserje/consultavisitas"
              element={<ConsultaVisitas />}
            /> */}
          </Route>

          {/* RUTAS ADMIN */}
          <Route
            element={
              <ProtectedRouteAdmin isAdmin={isAuthAdmin} loading={loading} />
            }
          >
            <Route path="/register/admin" element={<RegisterAdminPage />} />
            <Route
              path="/register/residente"
              element={<RegisterResidentePage />}
            />
            <Route
              path="/admin/panel/visitas"
              element={<ConsultaVisitasAdmin />}
            />
            <Route
              path="/register/conserje"
              element={<RegisterConserjePage />}
            />
            <Route path="/admin/panel" element={<PanelAdmin />} />
            <Route
              path="/admin/panel/verificarpatente"
              element={<AdminVerificarPatente />}
            />
            <Route
              path="/admin/panel/crud/residentes"
              element={<CrudResidentes />}
            />
            <Route
              path="/admin/panel/consultaingresos"
              element={<ConsultaIngresosAdmin />}
            />
            <Route path="/admin/panel/crud/admins" element={<CrudAdmins />} />
            <Route path="/admin/panel/crud/autos" element={<CrudAutos />} />
            <Route
              path="/admin/panel/crud/conserjes"
              element={<CrudConserjes />}
            />
          </Route>

          {/*RUTAS RESIDENTE*/}
          <Route
            element={
              <ProtectedRouteResidente
                isResidente={isAuthCasa}
                loading={loading}
              />
            }
          >
            {/* <Route
              path="/residente/agregarvisitas"
              element={<Agregarvisitas />}
            /> */}
            <Route path="/residente/panel" element={<CrudVisitas />} />
          </Route>
        </Routes>
      </>
    </WebSocketProvider>
  );
}

export default App;
