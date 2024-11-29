import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import './Frame7.css';

const Frame7: React.FC = () => {
  const navigate = useNavigate(); // Inicializa o hook para navegação

  const handleNavigate = () => {
    navigate('/userslist'); // Redireciona para a página UsersList
  };

  return (
    <div className="frame7-container">
      <button className="cta-button" onClick={handleNavigate}>
        Conheça nossos profissionais!
      </button>
      <p className="footer-text">
        MindCare - Todos os direitos reservados - © 2024 - Agende agora sua consulta!
      </p>
    </div>
  );
};

export default Frame7;
