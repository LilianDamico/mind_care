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

  return (
    <div className="navbar-container">
      <div className="logo" onClick={() => handleNavigation('/')}>
        <img src={logo} alt="logo" />
      </div>

      <div className="menu">
        <div className="inicial" onClick={() => handleNavigation('/')}>
          <p>Página Inicial</p>
        </div>

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
            <button
              className="mensagens-button"
              onClick={() => handleNavigation('/mensagens')}
            >
              Mensagens
            </button>

            <span className="bemvindo">Olá, {usuario.nome.split(' ')[0]}</span>
            <button className="logout-button" onClick={logout}>Sair</button>
          </>
        )}
      </div>
    </div>
  );
};
