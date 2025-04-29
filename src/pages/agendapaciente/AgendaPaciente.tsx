// src/pages/agendapaciente/AgendaPaciente.tsx

import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../services/api'; // Usando sua configuração

interface HorarioDisponivel {
  id: number;
  dataHora: string;
}

const AgendaPaciente: React.FC = () => {
  const [horarios, setHorarios] = useState<HorarioDisponivel[]>([]);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregarHorarios() {
      try {
        const token = localStorage.getItem('token');
        const resposta = await apiUrl.get('/agendamentos/horarios-livres', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHorarios(resposta.data);
      } catch (error) {
        console.error('Erro ao buscar horários disponíveis:', error);
        setErro('Erro ao carregar horários disponíveis.');
      }
    }

    carregarHorarios();
  }, []);

  async function agendarConsulta(horarioId: number) {
    try {
      const token = localStorage.getItem('token');
      await apiUrl.post('/agendamentos', { horarioId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensagem('Consulta agendada com sucesso!');
    } catch (error) {
      console.error('Erro ao agendar consulta:', error);
      setErro('Erro ao agendar consulta.');
    }
  }

  return (
    <div className="agenda-paciente">
      <h2>Agendar Nova Consulta</h2>

      {erro && <div style={{ color: 'red' }}>{erro}</div>}
      {mensagem && <div style={{ color: 'green' }}>{mensagem}</div>}

      <ul>
        {horarios.length > 0 ? (
          horarios.map(horario => (
            <li key={horario.id}>
              {new Date(horario.dataHora).toLocaleString('pt-BR')}
              <button onClick={() => agendarConsulta(horario.id)}>Agendar</button>
            </li>
          ))
        ) : (
          <p>Não há horários disponíveis no momento.</p>
        )}
      </ul>
    </div>
  );
};

export default AgendaPaciente;
