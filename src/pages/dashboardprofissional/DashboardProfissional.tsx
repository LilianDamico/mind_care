import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../services/api'; // ✅ Aqui usamos a instância centralizada
import './DashboardProfissional.css';

interface Profissional {
  nome: string;
  email: string;
  tipo: string;
  telefone?: string;
}

interface Consulta {
  id: number;
  dataHora: string;
  paciente: {
    id: number;
    nome: string;
  };
}

interface Historico {
  id: number;
  paciente: {
    nome: string;
  };
  data: string;
  diagnostico: string;
  observacoes: string;
}

const DashboardProfissional: React.FC = () => {
  const [profissional, setProfissional] = useState<Profissional | null>(null);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [historicos, setHistoricos] = useState<Historico[]>([]);
  const [diagnostico, setDiagnostico] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [pacienteId, setPacienteId] = useState<number | null>(null);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const token = localStorage.getItem('token');
  const config = useMemo(() => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }), [token]);

  const carregarDados = useCallback(async () => {
    try {
      const resProf = await apiUrl.get('/usuarios/me', config);
      setProfissional(resProf.data);

      const resCons = await apiUrl.get('/agendamentos/profissional', config);
      setConsultas(resCons.data);

      const resHist = await apiUrl.get('/historico/profissional', config);
      setHistoricos(resHist.data);
    } catch (err) {
      console.error('Erro ao carregar dados do profissional:', err);
    }
  }, [config]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const registrarAtendimento = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pacienteId || !diagnostico) {
      setMensagem('Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      await apiUrl.post('/historico', {
        pacienteId,
        diagnostico,
        observacoes,
      }, config);

      setDiagnostico('');
      setObservacoes('');
      setPacienteId(null);
      setMensagem('Atendimento registrado com sucesso.');
      carregarDados();
    } catch (err) {
      console.error('Erro ao registrar atendimento:', err);
      setMensagem('Erro ao registrar atendimento.');
    }
  };

  return (
    <div className="dashboard-profissional">
      <h1>Área do Profissional</h1>

      {profissional && (
        <div className="card">
          <h2>Seus Dados</h2>
          <p><strong>Nome:</strong> {profissional.nome}</p>
          <p><strong>Email:</strong> {profissional.email}</p>
          <p><strong>Tipo:</strong> {profissional.tipo}</p>
          {profissional.telefone && <p><strong>Telefone:</strong> {profissional.telefone}</p>}
        </div>
      )}

      <div className="card">
        <h2>Consultas Agendadas</h2>
        {consultas.length === 0 ? (
          <p>Você não possui consultas agendadas.</p>
        ) : (
          consultas.map(c => (
            <div key={c.id} className="consulta-item">
              <p><strong>Data:</strong> {new Date(c.dataHora).toLocaleString('pt-BR')}</p>
              <p><strong>Paciente:</strong> {c.paciente.nome}</p>
              <button className="btn" onClick={() => setPacienteId(c.paciente.id)}>
                Registrar Atendimento
              </button>
              <button className="dashboard-button" onClick={() => handleNavigation('/consultas')}>
                Consultas
              </button>
            </div>
          ))
        )}
      </div>

      {pacienteId && (
        <div className="card">
          <h2>Novo Atendimento</h2>
          <form onSubmit={registrarAtendimento}>
            <label>Diagnóstico*</label>
            <input
              value={diagnostico}
              onChange={(e) => setDiagnostico(e.target.value)}
              required
            />

            <label>Observações</label>
            <textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              rows={4}
            />

            <button className="btn verde" type="submit">Salvar Atendimento</button>
          </form>
        </div>
      )}

      <div className="card">
        <h2>Histórico de Atendimentos</h2>
        {historicos.length === 0 ? (
          <p>Nenhum atendimento registrado.</p>
        ) : (
          historicos.map(h => (
            <div key={h.id} className="historico">
              <p><strong>Paciente:</strong> {h.paciente.nome}</p>
              <p><strong>Data:</strong> {new Date(h.data).toLocaleDateString()}</p>
              <p><strong>Diagnóstico:</strong> {h.diagnostico}</p>
              <p><strong>Observações:</strong> {h.observacoes}</p>
              <a
                className="relatorio-btn"
                href={`${apiUrl.defaults.baseURL}/relatorio/registro/${h.id}/pdf`}
                target="_blank"
                rel="noopener noreferrer"
              >
                📄 Ver Relatório
              </a>
            </div>
          ))
        )}
      </div>

      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
};

export default DashboardProfissional;
