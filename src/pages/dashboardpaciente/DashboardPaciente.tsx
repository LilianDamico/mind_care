import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarConsultasPaciente, Appointment } from '../../services/appointmentService';
import { useAuth } from '../../contexts/AuthContext';
import './DashboardPaciente.css';

const DashboardPaciente: React.FC = () => {
  const [consultas, setConsultas] = useState<Appointment[]>([]);
  const [mensagem, setMensagem] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const carregarConsultas = async () => {
      try {
        if (!user?.id) return;
        const resultado = await listarConsultasPaciente(user.id);
        setConsultas(resultado);
      } catch (error) {
        setMensagem('Erro ao carregar consultas.');
      }
    };
    carregarConsultas();
  }, [user]);

  const marcarConsulta = () => navigate('/consultas/nova');
  const desmarcarConsulta = (id: number) => {
    // lógica para desmarcar consulta
  };

  const futuras = consultas.filter(c => c.status !== 'REALIZADA');
  const historico = consultas.filter(c => c.status === 'REALIZADA');

  return (
    <div className="dashboard-paciente-wrapper">
      <aside className="dashboard-paciente-sidebar">
        
        <nav>
          <ul>
            <li>
              <button className="dashboard-paciente-agendar-btn" onClick={marcarConsulta}>
                + Marcar Consulta
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="dashboard-paciente-main">
        <header className="dashboard-paciente-header">
          <h1>Olá, {user?.nome || 'Paciente'}!</h1>
        </header>

        {mensagem && <div className="dashboard-paciente-erro">{mensagem}</div>}

        <section className="dashboard-paciente-card-proximas">
          <h2>Próximas Consultas</h2>
          {futuras.length === 0 ? (
            <p className="dashboard-paciente-vazio">Nenhuma consulta agendada.</p>
          ) : (
            <ul>
              {futuras.map(consulta => (
                <li key={consulta.id} className="dashboard-paciente-consulta-item">
                  <div>
                    <span className="dashboard-paciente-data">{new Date(consulta.dataHora).toLocaleString()}</span>
                    <span className="dashboard-paciente-profissional">
                      {consulta.profissional?.nome || 'Atribuição pendente'}
                    </span>
                  </div>
                  <span className="dashboard-paciente-status">{consulta.status}</span>
                  <button
                    className="dashboard-paciente-cancelar-btn"
                    onClick={() => desmarcarConsulta(consulta.id)}
                  >
                    Desmarcar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="dashboard-paciente-card-historico">
          <h2>Histórico de Consultas</h2>
          {historico.length === 0 ? (
            <p className="dashboard-paciente-vazio">Ainda não há consultas realizadas.</p>
          ) : (
            <ul>
              {historico.map(c => (
                <li key={c.id}>
                  <span className="dashboard-paciente-data">{new Date(c.dataHora).toLocaleString()}</span>
                  <span className="dashboard-paciente-profissional">{c.profissional?.nome || '---'}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default DashboardPaciente;
