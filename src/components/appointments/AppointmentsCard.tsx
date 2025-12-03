import React from "react";
import "./AppointmentsCard.css";
import { AdminAppointment } from "../../services/adminDashboardApi";

type Props = {
  appointments: AdminAppointment[];
  loading?: boolean;
};

export default function AppointmentsCard({ appointments, loading }: Props) {
  const statusClass = (s: AdminAppointment["status"]) => {
    if (s === "Confirmado") return "adm-badge adm-confirm";
    if (s === "Pendente") return "adm-badge adm-pending";
    return "adm-badge adm-cancel";
  };

  return (
    <section className="adm-card">
      <h3 className="adm-card-title">Próximos Agendamentos</h3>

      {loading && <div>Carregando agendamentos...</div>}

      {!loading && appointments.length === 0 && (
        <div>Nenhum agendamento futuro encontrado.</div>
      )}

      {!loading && appointments.length > 0 && (
        <div className="adm-list">
          {appointments.map((a, idx) => (
            <div key={idx} className="adm-item">
              <div className="adm-item-left">
                <div className="adm-timeblock">
                  <span className="adm-time">{a.time}</span>
                  <span className="adm-period">{a.period}</span>
                </div>
                <span className="adm-patient">{a.patient}</span>
              </div>

              <div className={statusClass(a.status)}>
                <span className="adm-dot"></span>
                <span>{a.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
