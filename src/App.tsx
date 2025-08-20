import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landingpage from './pages/landingpage/Landingpage';
import LoginPage from './pages/loginpage/LoginPage';
import DashboardProfissional from './pages/dashboardprofissional/DashboardProfissional';
import DashboardPaciente from './pages/dashboardpaciente/DashboardPaciente';
import PrivateRoute from './routes/PrivateRoute';
import { Navbar } from './components/navbar/Navbar';
import Chat from './components/chat/Chat';
import MedicalRecordsList from './components/medicalrecordslist/MedicalRecordsList';
import ListaPrescricoes from './components/listaprescricoes/ListaPrescricaoes';
import ConsultaInteracoes from './components/consultainteracoes/ConsultaInteracoes';
import NovaPrescricao from './components/novaprescricao/NovaPrescricao';
import NovaConsulta from './components/novaconsulta/NovaConsulta';
import ListaConsultas from './components/listaconsultas/ListaConsultas';
import MensagensPage from './pages/mensagenspage/MensagensPage';
import SignupPage from './pages/signuppage/SignupPage';
import SignupPacientePage from './pages/signuppacientepage/SignupPacientePage';
import SignupProfissionalPage from './pages/signupprofissionalpage/SignupProfissionalPage';
import PlansPage from './pages/planspage/PlansPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import SubscriptionPage from './pages/subscription/SubscriptionPage';

const App: React.FC = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/signuppage" element={<SignupPage />} />
        <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path="/prontuarios" element={<PrivateRoute><MedicalRecordsList patientId={0} /></PrivateRoute>} />
        <Route path="/prescricoes" element={<PrivateRoute><ListaPrescricoes /></PrivateRoute>} />
        <Route path="/interacoes" element={<PrivateRoute><ConsultaInteracoes /></PrivateRoute>} />
        <Route path="/dashboard-profissional" element={<PrivateRoute><DashboardProfissional /></PrivateRoute>} />
        <Route path="/dashboard-paciente" element={<PrivateRoute><DashboardPaciente /></PrivateRoute>} />
        <Route path="/prescricoes/nova" element={<PrivateRoute><NovaPrescricao /></PrivateRoute>} />
        <Route path="/consultas/nova" element={<PrivateRoute><NovaConsulta /></PrivateRoute>} />
        <Route path="/consultas" element={<PrivateRoute><ListaConsultas /></PrivateRoute>} />
        <Route path="/mensagens" element={<MensagensPage />} />
        <Route path="/signuppacientepage" element={<SignupPacientePage />} />
        <Route path="/signupprofissionalpage" element={<SignupProfissionalPage />} />
        <Route path="/medicalrecordslist" element={<MedicalRecordsList patientId={1} />} />
        <Route path="/plans" element={<PrivateRoute><PlansPage /></PrivateRoute>} />
        <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
        <Route path="/subscription" element={<PrivateRoute><SubscriptionPage /></PrivateRoute>} />
      </Routes>
    </>
  );
};

export default App;
