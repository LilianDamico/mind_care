import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { agendarConsulta } from '../../services/appointmentService'; // Removido listarProfissionais
import { listarProfissionais, Profissional } from '../../services/professionalService'; // Assumindo um novo serviço para profissionais
import { useAuth } from '../../contexts/AuthContext';
import './NovaConsulta.css'; // se houver estilo

const NovaConsulta: React.FC = () => {
  const [dataHora, setDataHora] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [profissionalId, setProfissionalId] = useState<number | ''>(''); // Estado para o ID do profissional
  const [profissionais, setProfissionais] = useState<Profissional[]>([]); // Estado para a lista de profissionais
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Carrega a lista de profissionais ao montar o componente
    const fetchProfissionais = async () => {
      try {
        const data = await listarProfissionais();
        setProfissionais(data);
      } catch (error) {
        console.error('Erro ao listar profissionais:', error);
        setMensagem('Erro ao carregar profissionais.');
      }
    };
    fetchProfissionais();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user.id) {
      setMensagem('Você precisa estar logado para agendar uma consulta.');
      return;
    }

    if (!dataHora || !profissionalId) {
      setMensagem('Por favor, preencha a data/hora e selecione um profissional.');
      return;
    }

    try {
      await agendarConsulta({
        pacienteId: user.id,
        dataHora,
        observacoes,
        profissionalId: Number(profissionalId), // Garante que seja um número
      });
      setMensagem('Consulta agendada com sucesso!');
      setTimeout(() => navigate('/dashboard-paciente'), 1500);
    } catch (error) {
      console.error('Erro ao agendar consulta:', error);
      setMensagem('Erro ao agendar consulta. Verifique os dados.');
    }
  };

  return (
    <div className="nova-consulta-container">
      <h2>Agendar Nova Consulta</h2>
      <form onSubmit={handleSubmit} className="nova-consulta-form">
        <div className="form-group">
          <label htmlFor="dataHora">Data e Hora:</label>
          <input
            type="datetime-local"
            id="dataHora"
            value={dataHora}
            onChange={(e) => setDataHora(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="profissional">Profissional:</label>
          <select
            id="profissional"
            value={profissionalId}
            onChange={(e) => setProfissionalId(Number(e.target.value))}
            required
          >
            <option value="">Selecione um profissional</option>
            {profissionais.map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="observacoes">Observações (opcional):</label>
          <textarea
            id="observacoes"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Agendar Consulta</button>
        {mensagem && <p className="message">{mensagem}</p>}
      </form>
    </div>
  );
};

export default NovaConsulta;