import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Frame6.css';

const Frame6: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    { icon: faCircleCheck, text: 'Confirmação automática', route: '/planspage' },
    { icon: faCreditCard, text: 'Integração com pagamento online', route: '/planspage' },
  ];

  return (
    <div className="frame6-container">
      {features.map((feature, i) => (
        <div
          key={i}
          className="feature-box"
          onClick={() => navigate(feature.route)}
        >
          <FontAwesomeIcon icon={feature.icon} size="3x" style={{ color: '#9900f5' }} />
          <p>{feature.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Frame6;
