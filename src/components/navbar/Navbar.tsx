import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logoImage.png';
import './Navbar.css';

export const Navbar: React.FC = () => {
  return (
    <div className='navbar-container'>
      <div className='logo'>
        <img src={logo} alt='logo' />           
      </div>
      <div className='menu'>
        <div className='inicial'>
          <Link to="/">
          <p>Página Inicial</p>
          </Link>
        </div>
        <div className='artigo'>
          <Link to="/">
            <p>Artigos</p>
          </Link>
        </div>

        <Link to="/login">
          <button className='signin-button'>Signin</button>
        </Link>

        <Link to="/signup">
          <button className='signup-button'>Sign Up</button>
        </Link>          
      </div>      
    </div>
  );
}


