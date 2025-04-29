import React, { useState, useEffect } from 'react';
import { apiUrl } from '../../services/api';
import './NovaConsulta.css';

interface Patient {
  id: number;
  nome: string;
}

const NovaConsulta: React.FC = () => {
  const [dataHora, setDataHora] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [pacienteId, setPacienteId] = useState<number | null>(null);
  const [pacientes, setPacientes] = useState<Patient[]>([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    apiUrl.get('/pacientes', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setPacientes(res.data))
    .catch(() => setMensagem('Erro ao carregar pacientes.'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await apiUrl.post('/consultas', {
        dataHora,
        observacoes,
        pacienteId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMensagem('Consulta agendada com sucesso!');
      setDataHora('');
      setObservacoes('');
      setPacienteId(null);
    } catch {
      setMensagem('Erro ao agendar consulta.');
    }
  };

  return (
    <div className="nova-consulta">
      <h2>Agendar Nova Consulta</h2>
      <form onSubmit={handleSubmit}>
        <label>Paciente:</label>
        <select
          value={pacienteId || ''}
          onChange={(e) => setPacienteId(Number(e.target.value))}
          required
        >
          <option value="" disabled>Selecione um paciente</option>
          {pacientes.map(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>

        <label>Data e Hora:</label>
        <input
          type="datetime-local"
          value={dataHora}
          onChange={(e) => setDataHora(e.target.value)}
          required
        />

        <label>Observações:</label>
        <textarea
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
        />

        <button type="submit">Agendar</button>
      </form>

      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
};

export default NovaConsulta;
