import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logoImage.png';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

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
        <div className="artigo" onClick={() => handleNavigation('/articles')}>
          <p>Artigos</p>
        </div>
        <button
          className="signin-button"
          onClick={() => handleNavigation('/signin')}
        >
          Signin
        </button>
        <button
          className="signup-button"
          onClick={() => handleNavigation('/signup')}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};
