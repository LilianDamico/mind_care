// src/pages/consultasprofissional/ConsultasProfissional.tsx
import React, { useEffect, useState } from "react";
import SidebarProfissional from "../../components/sidebarprofissional/SidebarProfissional";
import { listarConsultasDoProfissional } from "../../services/consultaService";
import "./ConsultasProfissional.css";

interface Consulta {
  id: string;
  dataHora: string;
  status: string;
  cliente?: { nome: string };
}

export default function ConsultasProfissional() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function carregarConsultas() {
      try {
        const dados = await listarConsultasDoProfissional(); // 🔥 FINAL
        setConsultas(dados ?? []);
      } catch {
        setConsultas([]);
      } finally {
        setLoading(false);
      }
    }

    carregarConsultas();
  }, []);

  return (
    <div className="layout-dashboard">
      <SidebarProfissional />

      <main className="cp-wrapper">
        <h1 className="cp-title">Consultas Agendadas</h1>

        
        {loading && <p className="cp-msg">Carregando...</p>}
        {!loading && consultas.length === 0 && <p className="cp-msg">Nenhuma consulta encontrada.</p>}

        {consultas.length > 0 && (
          <table className="cp-table">
            <thead>
              <tr>
                <th>Data/Hora</th>
                <th>Paciente</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {consultas.map((c) => (
                <tr key={c.id}>
                  <td>{new Date(c.dataHora).toLocaleString("pt-BR")}</td>
                  <td>{c.cliente?.nome ?? "—"}</td>
                  <td>{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}
