// src/pages/consultafuturapaciente/ConsultaFuturaPaciente.tsx

import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../services/api';
import './ConsultaFuturaPaciente.css';

interface Consulta {
  id: number;
  dataHora: string;
  status: string;
}

const ConsultaFuturaPaciente: React.FC = () => {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregarConsultas() {
      try {
        const token = localStorage.getItem('token');
        const resposta = await apiUrl.get('/listaConsultas', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setConsultas(resposta.data);
      } catch (error) {
        console.error('Erro ao carregar consultas agendadas:', error);
        setErro('Erro ao carregar consultas agendadas.');
      }
    }

    carregarConsultas();
  }, []);

  async function desmarcarConsulta(id: number) {
    try {
      const token = localStorage.getItem('token');
      await apiUrl.delete(`/agendamentos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensagem('Consulta desmarcada com sucesso.');
      setConsultas(consultas.filter(consulta => consulta.id !== id));
    } catch (error) {
      console.error('Erro ao desmarcar consulta:', error);
      setErro('Erro ao desmarcar a consulta.');
    }
  }

  return (
    <div className="consultas-futuras">
      <h2>Minhas Consultas Futuras</h2>

      {erro && <div style={{ color: 'red' }}>{erro}</div>}
      {mensagem && <div style={{ color: 'green' }}>{mensagem}</div>}

      <ul>
        {consultas.length > 0 ? (
          consultas.map(consulta => (
            <li key={consulta.id}>
              {new Date(consulta.dataHora).toLocaleString('pt-BR')} - {consulta.status}
              <button onClick={() => desmarcarConsulta(consulta.id)}>Desmarcar</button>
            </li>
          ))
        ) : (
          <p>Você não possui consultas agendadas.</p>
        )}
      </ul>
    </div>
  );
};

export default ConsultaFuturaPaciente;
