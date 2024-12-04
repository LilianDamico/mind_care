import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CadastroForm from './components/cadastroform/CadastroForm';
import Landingpage from './pages/landingpage/Landingpage';
import UsersList from './pages/userslist/UsersList';
import EditUserPage from './pages/edituserpage/EditUserPage';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import PasswordRecovery from './pages/password_recovery/PasswordRecovery';
import AgendaInteligente from './pages/agendainteligente/AgendaInteligente';
import CreateAgenda from './pages/createagenda/CreateAgenda';
import LoginUsers from './pages/loginusers/LoginUsers';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/cadastro" element={<CadastroForm />} />
        <Route path="/userslist" element={<UsersList />} />
        <Route path="/edituserpage/:id" element={<EditUserPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
        <Route path="/agendainteligente" element={<AgendaInteligente />} /> 
        <Route path="/createagenda" element={<CreateAgenda />} />
        <Route path="/loginusers" element={<LoginUsers />} />
      </Routes>
    </Router>
  );
};

export default App;
