import React, { useState } from "react";
import "./Horarios.css";

interface Horario {
  id: string;
  dataHora: string;
  disponivel: boolean;
  profissionalId: string;
}

interface HorariosProps {
  horarios: Horario[];
  onAgendar: (horario: Horario) => void;
}

const Horarios: React.FC<HorariosProps> = ({ horarios, onAgendar }) => {
  const [reservados, setReservados] = useState<string[]>([]);

  const handleAgendar = (horario: Horario) => {
    if (!horario.disponivel) return;
    setReservados((prev) => [...prev, horario.id]);
    onAgendar(horario);
  };

  return (
    <div className="horarios-container">
      <h3>Horários Disponíveis</h3>
      <ul className="horarios-list">
        {horarios.map((h) => {
          const reservado = !h.disponivel || reservados.includes(h.id);
          return (
            <li
              key={h.id}
              className={`horario-item ${reservado ? "reservado" : ""}`}
              onClick={() => handleAgendar(h)}
            >
              <span>{new Date(h.dataHora).toLocaleString("pt-BR")}</span>
              {reservado && <span className="tarja">⛔ Reservado</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Horarios;
