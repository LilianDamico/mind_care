import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logoImage.png';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const irParaDashboard = () => {
    if (usuario?.tipo === 'PROFISSIONAL') {
      navigate('/dashboard-profissional');
    } else if (usuario?.tipo === 'PACIENTE') {
      navigate('/dashboard-paciente');
    }
  };

  return (
    <div className="navbar-container">
      <div className="logo" onClick={() => handleNavigation('/')}>
        <img src={logo} alt="logo" />
      </div>

      <div className="menu">
        <div className="inicial" onClick={() => handleNavigation('/')}>
          <p>Página Inicial</p>
        </div>
        <button className="dashboard-button" onClick={() => handleNavigation('/prontuarios')}>
          Prontuários
        </button>
        
        {usuario && (
              <>
                <span className="bemvindo">Olá, {usuario.nome.split(' ')[0]}</span>
                <button className="logout-button" onClick={logout}>Sair</button>
                <button className="chat-button" onClick={() => handleNavigation('/chat')}>Mensagens</button>
              </>
            )}


        {!usuario ? (
          <>
            <button
              className="signin-button"
              onClick={() => handleNavigation('/loginpage')}
            >
              Signin
            </button>
            <button
              className="signup-button"
              onClick={() => handleNavigation('/signuppage')}
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <button className="dashboard-button" onClick={irParaDashboard}>
              Dashboard
            </button>
            <span className="bemvindo">Olá, {usuario.nome.split(' ')[0]}</span>
            <button className="logout-button" onClick={logout}>Sair</button>
          </>
        )}
      </div>
    </div>
  );
};
