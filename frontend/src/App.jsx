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
function App() {
  return (
    <>
      {/*<Navbar />*/}
      <Routes>
        {/*LOGINS*/}
        <Route path="/login/admin" element={<LoginAdminPage />} />
        <Route path="/login/residente" element={<LoginResidentePage />} />
        <Route path="/login/conserje" element={<LoginConserjePage />} />

        {/*REGISTERS*/}
        <Route path="/register/admin" element={<RegisterAdminPage />} />
        <Route path="/register/residente" element={<RegisterResidentePage />} />
        <Route path="/register/conserje" element={<RegisterConserjePage />} />

        <Route path="/Admin" element={<Admin />} />
        <Route path="/Agregarvisitas" element={<Agregarvisitas />} />
        <Route path="/Conserje" element={<Conserje />} />
        <Route path="/Misvisitas" element={<Misvisitas />} />
      </Routes>
    </>
  );
}

export default App;