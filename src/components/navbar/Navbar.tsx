import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../assets/images/logoImage.png';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const primeiroNome = user?.nome ? user.nome.split(' ')[0] : 'Usuário';

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/loginpage');
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        <img src={logoImage} alt="MindCare Logo" className="navbar-logo" />
      </div>
      <div className="navbar-right">
        <span>Olá, {primeiroNome}!</span>
        <button onClick={() => handleNavigation('/')} className="navbar-btn">Página Inicial</button>
        <button onClick={() => handleNavigation('/dashboard-paciente')} className="navbar-btn">Dashboard</button>
        <button onClick={handleLogout} className="navbar-btn logout-btn">Sair</button>
      </div>
    </nav>
  );
};
