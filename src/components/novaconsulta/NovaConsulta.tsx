// src/components/novaconsulta/NovaConsulta.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { agendarConsulta } from '../../services/appointmentService';
import { useAuth } from '../../contexts/AuthContext';
import './NovaConsulta.css'; // se houver estilo

const NovaConsulta: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [dataHora, setDataHora] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleAgendar = async () => {
    if (!dataHora || !user?.id) {
      setMensagem('Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      await agendarConsulta({
        pacienteId: user.id,
        dataHora,
        observacoes,
      });
      setMensagem('Consulta agendada com sucesso!');
      setTimeout(() => navigate('/dashboard-paciente'), 1500);
    } catch (error) {
      console.error('Erro ao agendar consulta:', error);
      setMensagem('Erro ao agendar consulta.');
    }
  };

  return (
    <div className="nova-consulta">
      <h2>Agendar Nova Consulta</h2>
      {mensagem && <p className="mensagem-feedback">{mensagem}</p>}

      <form onSubmit={(e) => { e.preventDefault(); handleAgendar(); }}>
        <div>
          <label>Data e Hora:</label>
          <input
            type="datetime-local"
            value={dataHora}
            onChange={(e) => setDataHora(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Observações:</label>
          <textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            placeholder="Descreva detalhes importantes..."
          />
        </div>

        <button type="submit" className="botao-agendar">Agendar</button>
      </form>
    </div>
  );
};

export default NovaConsulta;
