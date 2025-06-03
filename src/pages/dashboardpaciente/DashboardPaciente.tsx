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
        console.error('Erro ao carregar consultas:', error);
        setMensagem('Erro ao carregar consultas.');
      }
    };

    carregarConsultas();
  }, [user]);

  const marcarConsulta = () => {
    navigate('/consultas/nova');
  };

  const desmarcarConsulta = (id: number) => {
    console.log(`Desmarcar consulta ID: ${id}`);
    // Aqui você pode implementar a chamada à API para deletar a consulta
  };

  return (
    <div className="dashboard-paciente">
      <h2>Minhas Consultas Futuras</h2>
      {mensagem && <p className="mensagem-erro">{mensagem}</p>}
      <ul>
        {consultas
          .filter((c) => c.status !== 'REALIZADA')
          .map((consulta) => (
            <li key={consulta.id}>
              <p><strong>Data:</strong> {new Date(consulta.dataHora).toLocaleString()}</p>
              <p><strong>Status:</strong> {consulta.status}</p>
              <p><strong>Profissional:</strong> {consulta.profissional?.nome || 'Atribuição pendente'}</p>
              <button className="cancelar-btn" onClick={() => desmarcarConsulta(consulta.id)}>Desmarcar</button>
            </li>
          ))}
      </ul>

      <button onClick={marcarConsulta}>Marcar Consulta</button>

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
    </div>
  );
};

export default DashboardPaciente;
