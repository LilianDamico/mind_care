import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CadastroForm from './components/cadastroform/CadastroForm';
import Landingpage from './pages/Landingpage';

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
      </Routes>
    </Router>
  );
};

export default App;
