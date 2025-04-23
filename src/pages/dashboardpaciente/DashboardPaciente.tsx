import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DashboardPaciente.css';

interface Paciente {
  nome: string;
  email: string;
  telefone: string;
  contatoEmergencia: string;
  genero: string;
  dataNascimento: string;
}

interface Consulta {
  id: number;
  dataHora: string;
  profissional: {
    nome: string;
  };
}

interface Historico {
  id: number;
  data: string;
  diagnostico: string;
  observacoes: string;
}

const DashboardPaciente: React.FC = () => {
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [historicos, setHistoricos] = useState<Historico[]>([]);
  const [editando, setEditando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [dadosEditados, setDadosEditados] = useState<Paciente | null>(null);

  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const pacienteRes = await axios.get('http://localhost:8080/pacientes/me', config);
      setPaciente(pacienteRes.data);
      setDadosEditados(pacienteRes.data);

      const consultasRes = await axios.get('http://localhost:8080/agendamentos/me', config);
      setConsultas(consultasRes.data);

      const historicosRes = await axios.get('http://localhost:8080/historico/me', config);
      setHistoricos(historicosRes.data);
    } catch (err) {
      console.error('Erro ao carregar dados do paciente:', err);
    }
  };

  const cancelarConsulta = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/agendamentos/${id}`, config);
      setConsultas(prev => prev.filter(c => c.id !== id));
      setMensagem('Consulta cancelada com sucesso.');
    } catch (err) {
      console.error('Erro ao cancelar consulta:', err);
      setMensagem('Erro ao cancelar consulta.');
    }
  };

  const salvarEdicao = async () => {
    try {
      await axios.put('http://localhost:8080/pacientes/me', dadosEditados, config);
      setEditando(false);
      setMensagem('Dados atualizados com sucesso.');
      carregarDados();
    } catch (err) {
      console.error('Erro ao atualizar paciente:', err);
      setMensagem('Erro ao salvar alterações.');
    }
  };

  const handleChange = (campo: keyof Paciente, valor: string) => {
    if (dadosEditados) {
      setDadosEditados({ ...dadosEditados, [campo]: valor });
    }
  };

  return (
    <div className="paciente-dashboard">
      <h1>Área do Paciente</h1>

      <div className="card">
        <h2>Seus Dados</h2>
        {editando ? (
          <>
            <input
              type="text"
              value={dadosEditados?.nome || ''}
              onChange={e => handleChange('nome', e.target.value)}
              placeholder="Nome"
            />
            <input
              type="text"
              value={dadosEditados?.email || ''}
              onChange={e => handleChange('email', e.target.value)}
              placeholder="Email"
            />
            <input
              type="text"
              value={dadosEditados?.telefone || ''}
              onChange={e => handleChange('telefone', e.target.value)}
              placeholder="Telefone"
            />
            <input
              type="text"
              value={dadosEditados?.contatoEmergencia || ''}
              onChange={e => handleChange('contatoEmergencia', e.target.value)}
              placeholder="Contato de Emergência"
            />
            <button className="save-btn" onClick={salvarEdicao}>Salvar</button>
          </>
        ) : paciente && (
          <>
            <p><strong>Nome:</strong> {paciente.nome}</p>
            <p><strong>Email:</strong> {paciente.email}</p>
            <p><strong>Telefone:</strong> {paciente.telefone}</p>
            <p><strong>Gênero:</strong> {paciente.genero}</p>
            <p><strong>Nascimento:</strong> {new Date(paciente.dataNascimento).toLocaleDateString()}</p>
            <p><strong>Contato de Emergência:</strong> {paciente.contatoEmergencia}</p>
            <button onClick={() => setEditando(true)}>Editar</button>
          </>
        )}
      </div>

      <div className="card">
        <h2>Consultas Futuras</h2>
        {consultas.length === 0 ? (
          <p>Nenhuma consulta agendada.</p>
        ) : (
          consultas.map(c => (
            <div key={c.id} className="consulta-item">
              <p><strong>Data:</strong> {new Date(c.dataHora).toLocaleString('pt-BR')}</p>
              <p><strong>Profissional:</strong> {c.profissional.nome}</p>
              <button className="cancelar-btn" onClick={() => cancelarConsulta(c.id)}>Cancelar</button>
            </div>
          ))
        )}
      </div>

      <div className="card">
        <h2>Histórico Médico</h2>
        {historicos.length === 0 ? (
          <p>Nenhum registro disponível.</p>
        ) : (
          historicos.map(h => (
            <div key={h.id} className="historico">
              <p><strong>Data:</strong> {new Date(h.data).toLocaleDateString()}</p>
              <p><strong>Diagnóstico:</strong> {h.diagnostico}</p>
              <p><strong>Observações:</strong> {h.observacoes}</p>
              <a
                className="relatorio-btn"
                href={`http://localhost:8080/relatorio/registro/${h.id}/pdf`}
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

export default DashboardPaciente;
