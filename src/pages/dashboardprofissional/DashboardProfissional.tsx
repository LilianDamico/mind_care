import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarConsultasProfissional, Appointment } from '../../services/appointmentService';
import { useAuth } from '../../contexts/AuthContext';
import MedicalRecordsList from '../../components/medicalrecordslist/MedicalRecordsList';
import './DashboardProfissional.css';
import checar from '../../assets/images/checar.png';

const DashboardProfissional: React.FC = () => {
  const [consultas, setConsultas] = useState<Appointment[]>([]);
  const [mensagem, setMensagem] = useState('');
  const [showProntuario, setShowProntuario] = useState(false);
  const [prontuarioNome, setProntuarioNome] = useState<string>('');
  const [pacienteSelecionadoId, setPacienteSelecionadoId] = useState<number | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const carregarConsultas = async () => {
      try {
        if (!user?.id) return;
        const resultado = await listarConsultasProfissional(user.id);
        setConsultas(resultado);
      } catch (error) {
        setMensagem('Erro ao carregar agenda.');
      }
    };
    carregarConsultas();
  }, [user]);

  const abrirProntuario = (pacienteId: number, nomePaciente: string) => {
    setPacienteSelecionadoId(pacienteId);
    setProntuarioNome(nomePaciente);
    setShowProntuario(true);
  };

  const fecharProntuario = () => {
    setShowProntuario(false);
    setPacienteSelecionadoId(null);
    setProntuarioNome('');
  };

  const agenda = consultas.filter(c => c.status !== 'REALIZADA');
  const historico = consultas.filter(c => c.status === 'REALIZADA');

  return (
    <div className="dashboard-profissional-wrapper">
      <aside className="dashboard-profissional-sidebar">
        <div className="dashboard-profissional-logo">
          <img src={checar} alt="MindCare" />
        </div>
        <nav>
          <ul>
            <li>
              <button className="dashboard-profissional-agenda-btn" onClick={() => navigate('/agenda/novo')}>
                + Novo Horário
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="dashboard-profissional-main">
        <header className="dashboard-profissional-header">
          <h1>Bem-vindo(a), {user?.nome || 'Profissional'}!</h1>
        </header>

        {mensagem && <div className="dashboard-profissional-erro">{mensagem}</div>}

        <section className="dashboard-profissional-card-agenda">
          <h2>Agenda</h2>
          {agenda.length === 0 ? (
            <p className="dashboard-profissional-vazio">Nenhum atendimento agendado.</p>
          ) : (
            <ul>
              {agenda.map(consulta => (
                <li key={consulta.id} className="dashboard-profissional-consulta-item">
                  <div>
                    <span className="dashboard-profissional-data">
                      {new Date(consulta.dataHora).toLocaleString()}
                    </span>
                    <span className="dashboard-profissional-paciente">
                      {consulta.paciente?.nome || 'Paciente'}
                    </span>
                    {/* Botão para ver prontuário */}
                    {consulta.pacienteId && (
                      <button
                        className="dashboard-profissional-prontuario-btn"
                        onClick={() =>
                          abrirProntuario(
                            consulta.pacienteId,
                            consulta.paciente?.nome || 'Paciente'
                          )
                        }
                      >
                        Ver Prontuário
                      </button>
                    )}
                  </div>
                  <span className="dashboard-profissional-status">{consulta.status}</span>
                  <button
                    className="dashboard-profissional-atender-btn"
                    onClick={() => { /* lógica para marcar como realizada */ }}
                  >
                    Marcar como Realizada
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Modal de Prontuário */}
        {showProntuario && pacienteSelecionadoId && (
          <div className="prontuario-modal">
            <div className="prontuario-modal-content">
              <h2>Prontuário de {prontuarioNome}</h2>
              <button className="prontuario-modal-fechar" onClick={fecharProntuario}>
                Fechar
              </button>
              <MedicalRecordsList patientId={pacienteSelecionadoId} />
            </div>
          </div>
        )}

        <section className="dashboard-profissional-card-historico">
          <h2>Histórico de Atendimentos</h2>
          {historico.length === 0 ? (
            <p className="dashboard-profissional-vazio">Ainda não há atendimentos realizados.</p>
          ) : (
            <ul>
              {historico.map(c => (
                <li key={c.id}>
                  <span className="dashboard-profissional-data">{new Date(c.dataHora).toLocaleString()}</span>
                  <span className="dashboard-profissional-paciente">{c.paciente?.nome || '---'}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default DashboardProfissional;
