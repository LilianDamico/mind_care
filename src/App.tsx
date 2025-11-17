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

const App: React.FC = () => {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/loginpage" element={<LoginPage />} />

        <Route
          path="/dashboard-profissional"
          element={
            <PrivateRoute role="PROFISSIONAL">
              <DashboardProfissional />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard-cliente"
          element={
            <PrivateRoute role="CLIENTE">
              <DashboardCliente />
            </PrivateRoute>
          }
        />

        <Route
          path="/calendarioprofissional"
          element={
            <PrivateRoute role="PROFISSIONAL">
              <CalendarioProfissional />
            </PrivateRoute>
          }
        />

        <Route
          path="/prescricoes"
          element={
            <PrivateRoute role="PROFISSIONAL">
              <Prescricoes />
            </PrivateRoute>
          }
        />

        <Route
          path="/prontuarios"
          element={
            <PrivateRoute role="PROFISSIONAL">
              <Prontuarios />
            </PrivateRoute>
          }
        />

        <Route
          path="/profissionaispage"
          element={<ProfissionaisPage />}
        />
      </Routes>
    </>
  );
};

export default App;
