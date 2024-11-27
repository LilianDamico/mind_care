import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faCircleCheck,
  faCommentDots,
  faLightbulb,
} from '@fortawesome/free-regular-svg-icons';
import { faList, faSquareEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Frame3.css';

const Frame3: React.FC = () => {
  const features = [
    { icon: faLightbulb, text: 'Agenda inteligente' },
    { icon: faCircleCheck, text: 'Confirmação de agendamento' },
    { icon: faCommentDots, text: 'Chat interno' },
    { icon: faList, text: 'Gestão de tarefas' },
    { icon: faStar, text: 'Pesquisa de satisfação' },
    { icon: faSquareEnvelope, text: 'E-mail marketing' },
  ];

  return (
    <div className="frame3-container">
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

export default Frame3;
