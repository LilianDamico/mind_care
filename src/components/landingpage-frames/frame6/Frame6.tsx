import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import './Frame6.css';

const Frame6: React.FC = () => {
  const features = [
    { icon: faCircleCheck, text: 'Confirmação automática' },
    { icon: faCreditCard, text: 'Integração pelo pagamento online' },
  ];

  return (
    <div className="frame6-container">
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

export default Frame6;
