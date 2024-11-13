import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CadastroForm from './components/cadastroform/CadastroForm';
import Landingpage from './pages/landingpage/Landingpage';
import UsersList from './pages/userslist/UsersList';

const App: React.FC = () => {

  const handleCadastroSuccess = () => {
    alert('Cadastro realizado com sucesso!');
  };

  const handleUsersListLoad = () => {
    alert('Lista de usuários carregada com sucesso!');
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
          element={<UsersList onUsersListLoad={handleUsersListLoad} />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
