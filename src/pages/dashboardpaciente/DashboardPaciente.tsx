import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarConsultasPaciente, Appointment } from '../../services/appointmentService';
import './DashboardPaciente.css';

const DashboardPaciente: React.FC = () => {
  const [consultas, setConsultas] = useState<Appointment[]>([]);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const carregarConsultas = async () => {
      try {
        const resultado = await listarConsultasPaciente();
        setConsultas(resultado);
      } catch (error) {
        console.error('Erro ao carregar consultas:', error);
        setMensagem('Erro ao carregar consultas.');
      }
    };

    carregarConsultas();
  }, []);

  const marcarConsulta = () => {
    navigate('/consultas/nova');
  };

  const desmarcarConsulta = (id: number) => {
    console.log(`Desmarcar consulta ID: ${id}`);
    // Aqui você deve implementar a lógica real de desmarcar (chamada de serviço)
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      
      {/* Sidebar */}
      <aside style={{
        width: '250px',
        background: '#f7f0fb',
        padding: '2rem 1rem',
        borderRight: '1px solid #eee'
      }}>
        <h2 style={{ color: '#5e239d' }}>Paciente</h2>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="/dashboard-paciente">Dashboard</a></li>
            <li><a href="/consultas">Consultas Futuras</a></li>
            <li><a href="/consultas/nova">Marcar Consulta</a></li>
            <li><a href="/prontuarios">Prontuários</a></li>
            <li><a href="/prescricoes">Prescrições</a></li>
            <li><a href="/interacoes">Interações</a></li>
            <li><a href="/mensagens">Mensagens</a></li>
          </ul>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main style={{ flex: 1, padding: '2rem', background: '#fcf9ff' }}>
        <h1>Área do Paciente</h1>

        <section className="card">
          <h2>Consultas Futuras</h2>
          {mensagem && <p className="erro">{mensagem}</p>}
          {consultas.length === 0 ? (
            <p>Nenhuma consulta agendada.</p>
          ) : (
            <ul>
              {consultas.map((consulta) => (
                <li key={consulta.id}>
                  <p><strong>Data:</strong> {new Date(consulta.dataHora).toLocaleString()}</p>
                  <p><strong>Status:</strong> {consulta.status}</p>
                  <p><strong>Profissional:</strong> {consulta.profissional?.nome || 'Atribuição pendente'}</p>
                  <button className="cancelar-btn" onClick={() => desmarcarConsulta(consulta.id)}>Desmarcar</button>
                </li>
              ))}
            </ul>
          )}
          <button onClick={marcarConsulta}>Marcar Consulta</button>
        </section>

        <section className="card">
          <h2>Histórico de Consultas</h2>
          <ul>
            {consultas
              .filter((c) => c.status === 'REALIZADA')
              .map((c) => (
                <li key={c.id}>
                  <p><strong>Data:</strong> {new Date(c.dataHora).toLocaleString()}</p>
                  <p><strong>Profissional:</strong> {c.profissional?.nome || '---'}</p>
                </li>
              ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default DashboardPaciente;
