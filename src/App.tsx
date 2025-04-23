import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landingpage from './pages/landingpage/Landingpage';
import LoginPage from './pages/loginpage/LoginPage';
import DashboardProfissional from './pages/dashboardprofissional/DashboardProfissional';
import DashboardPaciente from './pages/dashboardpaciente/DashboardPaciente';
import PrivateRoute from './routes/PrivateRoute';
import { Navbar } from './components/navbar/Navbar';
import SignupPage from './pages/signuppage/SignupPage';
import Chat from './components/chat/Chat';
import MedicalRecordsList from './components/medicalrecordslist/MedicalRecordsList';
import ListaPrescricoes from './components/listaprescricoes/ListaPrescricaoes';
import ConsultaInteracoes from './components/consultainteracoes/ConsultaInteracoes';
import NovaPrescricao from './components/novaprescricao/NovaPrescricao';
import NovaConsulta from './components/novaconsulta/NovaConsulta';
import ListaConsultas from './components/listaconsultas/ListaConsultas';

const App: React.FC = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/signuppage" element={<SignupPage />} />
        <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path="/prontuarios" element={<PrivateRoute><MedicalRecordsList /></PrivateRoute>} />
        <Route path="/prescricoes" element={<PrivateRoute><ListaPrescricoes /></PrivateRoute>} />
        <Route path="/interacoes" element={<PrivateRoute><ConsultaInteracoes /></PrivateRoute>} />
        <Route path="/dashboard-profissional" element={<PrivateRoute><DashboardProfissional /></PrivateRoute>} />
        <Route path="/dashboard-paciente" element={<PrivateRoute><DashboardPaciente /></PrivateRoute>} />
        <Route path="/prescricoes/nova" element={<PrivateRoute><NovaPrescricao /></PrivateRoute>} />
        <Route path="/consultas/nova" element={<PrivateRoute><NovaConsulta /></PrivateRoute>} />
        <Route path="/consultas" element={<PrivateRoute><ListaConsultas /></PrivateRoute>} />
      </Routes>
    </>
  );
};

export default App;
