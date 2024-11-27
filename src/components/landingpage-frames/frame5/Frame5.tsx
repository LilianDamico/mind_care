import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser, faGear } from '@fortawesome/free-solid-svg-icons';
import './Frame5.css';

const Frame5: React.FC = () => {
  const features = [
    { icon: faClock, text: 'Disponibilidade 24h' },
    { icon: faUser, text: 'Aplicativo do paciente' },
    { icon: faGear, text: 'Escalas configuráveis' },
  ];

  return (
    <div className="frame5-container">
      {features.map((feature, index) => (
        <div className="feature-box" key={index}>
          <FontAwesomeIcon
            icon={feature.icon}
            size="3x"
            style={{ color: '#9900f5' }}
          />
          <p>{feature.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Frame5;

