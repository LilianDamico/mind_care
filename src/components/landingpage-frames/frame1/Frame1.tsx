import React from 'react';
import { useNavigate } from 'react-router-dom';
import headImage from '../../../assets/images/headImage.png';
import './Frame1.css'; 

const Frame1: React.FC = () => {
  const navigate = useNavigate();

  const handleCadastroClick = () => {
    navigate('/signuppage'); 
  };

  const handleLoginClick = () => {
    navigate('/loginpage'); 
  };

  return (
    <div className="frame1-container">
      <div className="text-container">
        <h1>MindCare</h1>
        <h2>Onde médicos, pacientes e familiares se encontram!</h2>
        <p>
          Cuidar da sua saúde mental nunca foi tão acessível e seguro. Na MindCare,
          médicos especialistas e pacientes se encontram em um ambiente online
          dedicado ao bem-estar emocional e psicológico. Inscreva-se e faça parte
          dessa jornada de cuidado e acolhimento. Venha para a MindCare!
        </p>
        <div className="button-boxx">
          <button className="inscrever" onClick={handleCadastroClick}>Inscreva-se</button>
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
