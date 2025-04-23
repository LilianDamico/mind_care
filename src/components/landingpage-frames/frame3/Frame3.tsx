import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faCircleCheck,
  faCommentDots,
  faLightbulb,
} from '@fortawesome/free-regular-svg-icons';
import { faList, faSquareEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Frame3.css';

const Frame3: React.FC = () => {
  const navigate = useNavigate();

  // Adiciona a rota associada a cada recurso
  const features = [
    { icon: faLightbulb, text: 'Agenda inteligente', route: '/consultas/nova' },
    { icon: faCircleCheck, text: 'Confirmação de agendamento', route: '/confirmacao-agendamento' },
    { icon: faCommentDots, text: 'Chat interno', route: '/chat-interno' },
    { icon: faList, text: 'Gestão de tarefas', route: '/gestao-tarefas' },
    { icon: faStar, text: 'Pesquisa de satisfação', route: '/pesquisa-satisfacao' },
    { icon: faSquareEnvelope, text: 'E-mail marketing', route: '/email-marketing' },
  ];

  return (
    <div className="frame3-container">
      {features.map((feature, index) => (
        <div
          className="feature-box"
          key={index}
          onClick={() => navigate(feature.route)} // Redireciona ao clicar
          style={{ cursor: 'pointer' }} // Adiciona um indicador visual de interatividade
        >
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
