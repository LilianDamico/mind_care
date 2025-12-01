import React, { useEffect, useState, useCallback } from "react";
import { Navbar } from "../../components/navbar/Navbar";
import SidebarProfissional from "../../components/sidebarprofissional/SidebarProfissional";

import { listarConsultasPorCliente } from "../../services/appointmentService";
import { listarPrescricoesPorUserNome } from "../../services/prescricaoService";
import { listarProntuariosPorUsuario } from "../../services/prontuarioService";

import "./DashboardProfissional.css";

interface Consulta {
  id: string;
  paciente?: { nome: string };
  data: string;
  horario: string;
}

interface Prescricao {
  id: string;
  tipo: string;
  paciente?: { nome: string };
}

interface Prontuario {
  id: string;
  paciente?: { nome: string };
  data: string;
}

const DashboardProfissional: React.FC = () => {
  const nomeUsuario = localStorage.getItem("userNome") ?? "Profissional";

  const [consultasHoje, setConsultasHoje] = useState<Consulta[]>([]);
  const [proximasConsultas, setProximasConsultas] = useState<Consulta[]>([]);
  const [prescricoesRecentes, setPrescricoesRecentes] = useState<Prescricao[]>([]);
  const [prontuariosRecentes, setProntuariosRecentes] = useState<Prontuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ==========================================================
  // 🚀 Carregar Dados
  // ==========================================================
  const carregarDashboard = useCallback(async () => {
    setLoading(true);

    try {

      // ===== CONSULTAS =====
      const consultas: Consulta[] = await listarConsultasPorCliente(nomeUsuario);

      const hoje = new Date().toISOString().split("T")[0];

      const hojeLista = consultas.filter((c: Consulta) => c.data === hoje);
      const futuras = consultas.filter((c: Consulta) => c.data > hoje);

      setConsultasHoje(hojeLista);
      setProximasConsultas(futuras.slice(0, 5));

      // ===== PRESCRIÇÕES =====
      const prescricoes: Prescricao[] = await listarPrescricoesPorUserNome(nomeUsuario);
      setPrescricoesRecentes(prescricoes.slice(0, 5));

      // ===== PRONTUÁRIOS =====
      const prontuarios: Prontuario[] = await listarProntuariosPorUsuario(nomeUsuario);
      setProntuariosRecentes(prontuarios.slice(0, 5));

    } catch (e) {
      console.error("Erro ao carregar dashboard:", e);
    } finally {
      setLoading(false);
    }
  }, [nomeUsuario]);


  useEffect(() => {
    carregarDashboard();
  }, [carregarDashboard]);

  // ==========================================================
  // RENDER
  // ==========================================================
  return (
    <div className="layout-dashboard">
      <Navbar />
      <SidebarProfissional />

      <main className="conteudo-dashboard">

        <h1>Visão Geral</h1>
        <p className="subtitulo">Bem-vindo(a), {nomeUsuario}.</p>

        {loading ? (
          <p className="loading">Carregando dados...</p>
        ) : (
          <>
            {/* CARDS */}
            <section className="cards-topo">
              <div className="card-resumo"><h3>Consultas Hoje</h3><p className="numero">{consultasHoje.length}</p></div>
              <div className="card-resumo"><h3>Próximas</h3><p className="numero">{proximasConsultas.length}</p></div>
              <div className="card-resumo"><h3>Prescrições</h3><p className="numero">{prescricoesRecentes.length}</p></div>
              <div className="card-resumo"><h3>Prontuários</h3><p className="numero">{prontuariosRecentes.length}</p></div>
            </section>


            {/* CONSULTAS HOJE */}
            <section className="card bloco">
              <h2>Consultas de Hoje</h2>
              {
                consultasHoje.length === 0 ? <p>Sem consultas hoje.</p> :
                  <ul>
                    {consultasHoje.map((c: Consulta) => (
                      <li key={c.id}>
                        <strong>{c.paciente?.nome ?? "Paciente"}</strong> — {c.horario}
                      </li>
                    ))}
                  </ul>
              }
            </section>


            {/* FUTURAS */}
            <section className="card bloco">
              <h2>Próximas Consultas</h2>
              {
                proximasConsultas.length === 0 ? <p>Nenhuma consulta futura.</p> :
                  <ul>
                    {proximasConsultas.map((c: Consulta) => (
                      <li key={c.id}>
                        <strong>{c.paciente?.nome ?? "Paciente"}</strong> — {c.data} às {c.horario}
                      </li>
                    ))}
                  </ul>
              }
            </section>


            {/* PRESCRIÇÕES */}
            <section className="card bloco">
              <h2>Prescrições Recentes</h2>
              {
                prescricoesRecentes.length === 0 ? <p>Nenhuma prescrição recente.</p> :
                  <ul>
                    {prescricoesRecentes.map((p: Prescricao) => (
                      <li key={p.id}>
                        <strong>{p.tipo}</strong> — {p.paciente?.nome ?? "Paciente"}
                      </li>
                    ))}
                  </ul>
              }
            </section>


            {/* PRONTUÁRIOS */}
            <section className="card bloco">
              <h2>Prontuários Recentes</h2>
              {
                prontuariosRecentes.length === 0 ? <p>Nenhum prontuário recente.</p> :
                  <ul>
                    {prontuariosRecentes.map((pr: Prontuario) => (
                      <li key={pr.id}>
                        <strong>{pr.paciente?.nome ?? "Paciente"}</strong> — {pr.data}
                      </li>
                    ))}
                  </ul>
              }
            </section>
          </>
        )}

      </main>
    </div>
  );
};

export default DashboardProfissional;
