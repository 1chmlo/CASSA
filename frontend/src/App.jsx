import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";

import Admin from "./pages/Admin";
import Conserje from "./pages/Conserje";
import Misvisitas from "./pages/Misvisitas";
import Agregarvisitas from "./pages/Agregarvisitas";
import RegisterConserjePage from "./pages/RegisterConserjePage";
import RegisterAdminPage from "./pages/RegisterAdminPage";
import RegisterResidentePage from "./pages/RegisterResidentePage";
import LoginAdminPage from "./pages/LoginAdminPage";
import LoginResidentePage from "./pages/LoginResidentePage";
import LoginConserjePage from "./pages/LoginConserjePage";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <>
      {/*<Navbar />*/}
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/*LOGINS*/}
        <Route path="/login/admin" element={<LoginAdminPage />} />
        <Route path="/login/residente" element={<LoginResidentePage />} />
        <Route path="/login/conserje" element={<LoginConserjePage />} />

        {/*REGISTERS*/}
        <Route path="/register/admin" element={<RegisterAdminPage />} />
        <Route path="/register/residente" element={<RegisterResidentePage />} />
        <Route path="/register/conserje" element={<RegisterConserjePage />} />

        <Route path="/admin/panel" element={<Admin />} />
        <Route path="/residente/agregarvisitas" element={<Agregarvisitas />} />
        <Route path="/conserje/panel" element={<Conserje />} />
        <Route path="/residente/panel" element={<Misvisitas />} />
      </Routes>
    </>
  );
}

export default App;
