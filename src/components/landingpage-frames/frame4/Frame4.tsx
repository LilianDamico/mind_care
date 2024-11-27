import React from 'react';
import pic8 from '../../../assets/images/pic8.png';
import './Frame4.css';

const Frame4: React.FC = () => {
  return (
    <div className="frame4-container">
      <div className="image-box">
        <img src={pic8} alt="Agendamento online" />
      </div>
      <div className="text-container">
        <p className="highlight">Destaque sua clínica!</p>
        <h1>
          Aumente a visibilidade <br />
          <span className="highlight-pink">da sua clínica</span> com nosso <br />
          agendamento online
        </h1>
        <p className="description">
          Permita que seus pacientes agendem consultas a qualquer momento, todos
          os dias da semana!
        </p>
      </div>
    </div>
  );
};

export default Frame4;
