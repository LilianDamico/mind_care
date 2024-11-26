import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CadastroForm from './components/cadastroform/CadastroForm';
import Landingpage from './pages/landingpage/Landingpage';
import UsersList from './pages/userslist/UsersList';
import EditUserPage from './pages/edituserpage/EditUserPage';
import Login from './pages/login/Login';
import ProtectedRoute from './components/protectedroute/ProtectedRoute';
import Signup from './pages/signup/Signup';
import PasswordRecovery from './pages/password_recovery/PasswordRecovery';

const App: React.FC = () => {

  const handleCadastroSuccess = () => {
    alert('Cadastro realizado com sucesso!');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route
          path="/cadastro"
          element={<CadastroForm onCadastroSuccess={handleCadastroSuccess} />}
        />
        <Route 
          path="/userslist" 
          element={<ProtectedRoute component={UsersList} />}
        />
        <Route
          path="/edituserpage/:id"
          element={<ProtectedRoute component={EditUserPage} />}
            
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
      </Routes>
    </Router>
  );
};

export default App;
