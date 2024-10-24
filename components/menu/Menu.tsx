import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import logo from '../../assets/images/logo.png';

function Menu() {
  return (
    <div className='menu-container'>
      <div className='logo'>
        <img src={logo} alt="logo" />
      </div>
      <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cadastros">Cadastros</Link></li>
            <li><Link to="/contato">Contato</Link></li>
        </ul>      
      </nav>
    </div>
    
  )
}

export default Menu;
