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
        <div className='artigo'><Link to="/"><p>Artigos</p></Link></div>
        <Link to="/cadastros">
          <button className='signin'>Sign In</button>
        </Link>
        <Link to="/contato">
          <button className='signup'>Sign Up</button>
        </Link>          
      </div>      
    </div>
  );
}


