import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { agendarConsulta } from '../../services/appointmentService';
import { listarProfissionais, Profissional } from '../../services/professionalService';
import { useAuth } from '../../contexts/AuthContext';
import './NovaConsulta.css';

const NovaConsulta: React.FC = () => {
  const [dataHora, setDataHora] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [profissionalId, setProfissionalId] = useState<number | ''>('');
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [mensagem, setMensagem] = useState('');
  const [loadingProfissionais, setLoadingProfissionais] = useState(true);

  const navigate = useNavigate();
  const { user, carregando } = useAuth();

  useEffect(() => {
    const fetchProfissionais = async () => {
      try {
        setLoadingProfissionais(true);
        const data = await listarProfissionais();
        setProfissionais(data);
      } catch (error) {
        setMensagem('Erro ao carregar profissionais.');
        setProfissionais([]);
      } finally {
        setLoadingProfissionais(false);
      }
    };
    fetchProfissionais();
  }, []);

  // Função que garante o formato YYYY-MM-DDTHH:mm:ss para o backend do Spring Boot
  function normalizaDataHora(valor: string) {
    // Se já vem no formato com segundos, só retorna.
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(valor)) return valor;
    // Se vier só com minutos, adiciona ":00"
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(valor)) return valor + ':00';
    // Qualquer outro formato, retorna vazio para forçar erro de validação
    return '';
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (carregando) return;

    if (!user || !user.id) {
      setMensagem('Você precisa estar logado para agendar uma consulta.');
      return;
    }

    if (!dataHora || !profissionalId) {
      setMensagem('Por favor, preencha a data/hora e selecione um profissional.');
      return;
    }

    const dataHoraFormatada = normalizaDataHora(dataHora);
    if (!dataHoraFormatada) {
      setMensagem('Formato de data/hora inválido.');
      return;
    }

    try {
      await agendarConsulta({
        pacienteId: user.id,
        dataHora: dataHoraFormatada,
        observacoes,
        profissionalId: Number(profissionalId),
      });
      setMensagem('Consulta agendada com sucesso!');
      setTimeout(() => navigate('/dashboard-paciente'), 1200);
    } catch (error: any) {
      setMensagem('Erro ao agendar consulta. Verifique os dados.');
    }
  };

  if (carregando) {
    return (
      <div className="nova-consulta-container">
        <div className="loader">Carregando usuário...</div>
      </div>
    );
  }

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
          {loadingProfissionais ? (
            <select id="profissional" disabled>
              <option>Carregando profissionais...</option>
            </select>
          ) : (
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
                  {prof.especialidade ? ` - ${prof.especialidade}` : ''}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="observacoes">Observações (opcional):</label>
          <textarea
            id="observacoes"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">
          Agendar Consulta
        </button>
        {mensagem && <p className="message">{mensagem}</p>}
      </form>
    </div>
  );
};

export default NovaConsulta;
