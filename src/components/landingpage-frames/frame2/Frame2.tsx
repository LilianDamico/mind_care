import React from 'react';
import frametwo from '../../../assets/images/frametwo.png';
import './Frame2.css';

const Frame2: React.FC = () => {
  return (
    <div className="frame2-container">
      <div className="text-container">
        <h4>Otimize sua prática com nosso site!</h4>
        <h1>Gestão clínica</h1>
        <h2>Simplificada e eficiente</h2>
        <h4>
          Saiba mais sobre uma solução que promove uma maior conexão dos
          pacientes com os serviços de saúde.
        </h4>
      </div>
      <div className="image-box">
        <img src={frametwo} alt="Imagem ilustrativa de gestão clínica" />
      </div>
    </div>
  );
};

export default Frame2;
