import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCircleCheck,
  faCommentDots,
  faLightbulb,
} from "@fortawesome/free-regular-svg-icons";
import { faList, faSquareEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./Frame3.css";

const Frame3: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: faLightbulb,
      text: "Agenda inteligente",
      action: () => navigate("/profissionaispage"),
    },
    {
      icon: faCircleCheck,
      text: "Confirmação de agendamento",
      action: () => alert("Função em desenvolvimento!"),
    },
    {
      icon: faCommentDots,
      text: "Chat interno",
      action: () => alert("Chat público em breve!"),
    },
    {
      icon: faList,
      text: "Gestão de tarefas",
      action: () => alert("Área restrita a profissionais cadastrados!"),
    },
    {
      icon: faStar,
      text: "Pesquisa de satisfação",
      action: () => alert("Formulário de pesquisa será aberto."),
    },
    {
      icon: faSquareEnvelope,
      text: "E-mail marketing",
      action: () => alert("Entre em contato para mais informações."),
    },
  ];

  return (
    <div className="frame3-container">
      {features.map((feature, index) => (
        <div
          key={index}
          className="feature-box"
          onClick={feature.action}
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon
            icon={feature.icon}
            size="3x"
            style={{ color: "#9900f5", marginBottom: "10px" }}
          />
          <p>{feature.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Frame3;
