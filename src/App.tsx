// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Landingpage from "./pages/landingpage/Landingpage";
import LoginPage from "./pages/loginpage/LoginPage";
import DashboardProfissional from "./pages/dashboardprofissional/DashboardProfissional";
import DashboardCliente from "./pages/dashboardcliente/DashboardCliente";
import PrivateRoute from "./routes/PrivateRoute";
import { Navbar } from "./components/navbar/Navbar";
import CalendarioProfissional from "./pages/calendarioprofissional/CalendarioProfissional";
import Prescricoes from "./components/prescricoes/Prescricoes";
import Prontuarios from "./components/prontuarios/Prontuarios";
import ProfissionaisPage from "./pages/profissionaispage/ProfissionaisPage";
import AgendarCliente from "./pages/agendarcliente/AgendarCliente";
import LGPDPage from "./pages/lgpd/LGPDPage";
import SignupUserPage from "./pages/signupuserpage/SignupUserPage";
import LgpdModal from "./components/lgpd/LgpdModal";
import PlansPage from "./pages/planspage/PlansPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import ConsultasProfissional from "./pages/consultasprofissional/ConsultasProfissional";
import ConsultaInteracoes from "./components/consultainteracoes/ConsultaInteracoes";
import TriagemChatPage from "./pages/triagemchatpage/TriagemChatPage";
import AdminDashboard from "./pages/admindashboard/AdminDashboard";

const App: React.FC = () => {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/signupuserpage" element={<SignupUserPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/dashboard-profissional" element={<PrivateRoute role="PROFISSIONAL"><DashboardProfissional /></PrivateRoute>} />
        <Route path="/dashboard-cliente" element={<PrivateRoute role="CLIENTE"><DashboardCliente /></PrivateRoute>} />
        <Route path="/calendarioprofissional" element={<PrivateRoute role="PROFISSIONAL"><CalendarioProfissional /></PrivateRoute>} />
        <Route path="/prescricoes" element={<PrivateRoute role="PROFISSIONAL"><Prescricoes /></PrivateRoute>} />
        <Route path="/prontuarios" element={<PrivateRoute role="PROFISSIONAL"><Prontuarios /></PrivateRoute>} />
        <Route path="/profissionaispage" element={<ProfissionaisPage />} />
        <Route path="/agendarcliente" element={<PrivateRoute role="CLIENTE"><AgendarCliente /></PrivateRoute>} />
        <Route path="/lgpd" element={<LGPDPage />} />
        <Route path="/lgpdmodal" element={<LgpdModal open={false} onClose={function (): void {
          throw new Error("Function not implemented.");
        } } onAccept={function (): void {
          throw new Error("Function not implemented.");
        } } />} />
        <Route path="/planspage" element={<PlansPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/consultas/profissional" element={<PrivateRoute role="PROFISSIONAL"><ConsultasProfissional /></PrivateRoute>} />
        <Route path="consultainteracoes" element={<PrivateRoute role="PROFISSIONAL"><ConsultaInteracoes /></PrivateRoute>} />
        <Route path="/triagem" element={<TriagemChatPage />} />
        <Route path="/admindashboard" element={<PrivateRoute role="ADMIN"><AdminDashboard /></PrivateRoute>} />
      </Routes>
    </>
  );
};

export default App;
