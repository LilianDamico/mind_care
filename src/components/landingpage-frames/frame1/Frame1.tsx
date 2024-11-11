import React from 'react';
import { useNavigate } from 'react-router-dom';
import headImage from '../../../assets/images/headImage.png';
import './Frame1.css'; 

const Frame1: React.FC = () => {
  const navigate = useNavigate();

  const handleCadastroClick = () => {
    navigate('/cadastro'); 
  };

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  return (
    <div className="frame1-container">
      <div className="text-container">
        <h1>Bem-vindo ao MindCare</h1>
        <h2>Cuidando da sua saúde mental</h2>
        <p>
          No MindCare, oferecemos suporte emocional e psicológico para quem precisa. 
          Cadastre-se para ter acesso a uma rede de profissionais de saúde que podem te ajudar a manter o equilíbrio mental e emocional.
        </p>
        <div className="button-box">
          <button className="inscrever" onClick={handleCadastroClick}>Inscrever-se</button>
          <button className="login" onClick={handleLoginClick}>Login</button>
        </div>
      </div>
      <div className="image-box">
        <img src={headImage} alt="Imagem MindCare" />
      </div>
    </div>
  );
};

export default Frame1;
