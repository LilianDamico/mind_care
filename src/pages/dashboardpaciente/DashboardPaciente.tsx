import React, { useEffect, useState } from 'react';
import { listarConsultasPaciente, Appointment } from '../../services/appointmentService';
import './DashboardPaciente.css'; // Se tiver CSS específico

const DashboardPaciente: React.FC = () => {
  const [consultas, setConsultas] = useState<Appointment[]>([]);
  const [mensagem, setMensagem] = useState('');

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

  return (
    <div className="dashboard-paciente">
      <h1>Área do Paciente</h1>

      <section className="section">
        <h2>Consultas Futuras</h2>
        {mensagem && <p className="erro">{mensagem}</p>}
        {consultas.length === 0 ? (
          <p>Nenhuma consulta agendada.</p>
        ) : (
          <ul>
            {consultas.map((consulta) => (
              <li key={consulta.id}>
                Data: {new Date(consulta.dataHora).toLocaleString()}<br />
                Status: {consulta.status}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default DashboardPaciente;
