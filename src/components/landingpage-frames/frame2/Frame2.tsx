import React from 'react';
import frametwo from '../../../assets/images/frametwo.png';
import './Frame2.css';

const Frame2: React.FC = () => {
  return (
    <div className="frame2-container">
      <div className="text-container">
        <p>Otimize sua prática com nosso site</p>
        <h1>Gestão clínica</h1>
        <h2>Simplificada e eficiente</h2>
        <p>
          Saiba mais sobre uma solução que promove uma maior conexão dos
          pacientes com os serviços de saúde.
        </p>
      </div>
      <div className="image-box">
        <img src={frametwo} alt="Imagem ilustrativa de gestão clínica" />
      </div>
    </div>
  );
};

export default Frame2;
