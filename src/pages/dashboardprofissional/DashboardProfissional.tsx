import React, { useEffect, useState, useCallback } from "react";
import { Navbar } from "../../components/navbar/Navbar";
import SidebarProfissional from "../../components/sidebarprofissional/SidebarProfissional";

import {
  listarConsultasPorCliente,
  listarPrescricoesPorUserNome,
  listarProntuariosPorUsuario,
} from "../../services/appointmentService";

import "./DashboardProfissional.css";

const DashboardProfissional: React.FC = () => {
  const nomeUsuario = localStorage.getItem("userNome") || "Profissional";

  const [consultasHoje, setConsultasHoje] = useState<any[]>([]);
  const [proximasConsultas, setProximasConsultas] = useState<any[]>([]);
  const [prescricoesRecentes, setPrescricoesRecentes] = useState<any[]>([]);
  const [prontuariosRecentes, setProntuariosRecentes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // 🚀 CARREGAR DADOS DO DASHBOARD
  // =====================================================
  const carregarDashboard = useCallback(async () => {
    setLoading(true);

    try {
      // consultas
      const consultas = await listarConsultasPorCliente(nomeUsuario);

      const hoje = new Date().toISOString().split("T")[0];
      const hojeLista = consultas.filter((c: any) => c.data === hoje);
      const futuras = consultas.filter((c: any) => c.data > hoje);

      setConsultasHoje(hojeLista);
      setProximasConsultas(futuras.slice(0, 5));

      // prescrições
      const prescricoes = await listarPrescricoesPorUserNome(nomeUsuario);
      setPrescricoesRecentes(prescricoes.slice(0, 5));

      // prontuários
      const prontuarios = await listarProntuariosPorUsuario(nomeUsuario);
      setProntuariosRecentes(prontuarios.slice(0, 5));
    } catch (e) {
      console.error("Erro ao carregar dashboard", e);
    } finally {
      setLoading(false);
    }
  }, [nomeUsuario]);

  useEffect(() => {
    carregarDashboard();
  }, [carregarDashboard]);

  // =====================================================
  // RENDER
  // =====================================================
  return (
    <div className="layout-dashboard">
      <Navbar />
      <SidebarProfissional />

      <main className="conteudo-dashboard">
        <h1>Visão Geral</h1>
        <p className="subtitulo">Bem-vindo(a), {nomeUsuario}. Aqui está sua visão geral.</p>

        {loading ? (
          <p className="loading">Carregando dados...</p>
        ) : (
          <>
            {/* CARDS SUPERIORES */}
            <section className="cards-topo">
              <div className="card-resumo">
                <h3>Consultas Hoje</h3>
                <p className="numero">{consultasHoje.length}</p>
              </div>

              <div className="card-resumo">
                <h3>Próximas Consultas</h3>
                <p className="numero">{proximasConsultas.length}</p>
              </div>

              <div className="card-resumo">
                <h3>Prescrições Recentes</h3>
                <p className="numero">{prescricoesRecentes.length}</p>
              </div>

              <div className="card-resumo">
                <h3>Prontuários Recentes</h3>
                <p className="numero">{prontuariosRecentes.length}</p>
              </div>
            </section>

            {/* CONSULTAS DE HOJE */}
            <section className="card bloco">
              <h2>Consultas de Hoje</h2>

              {consultasHoje.length === 0 ? (
                <p>Nenhuma consulta para hoje.</p>
              ) : (
                <ul>
                  {consultasHoje.map((c: any) => (
                    <li key={c.id}>
                      <strong>{c.paciente?.nome}</strong> — {c.horario}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* PRÓXIMAS CONSULTAS */}
            <section className="card bloco">
              <h2>Próximas Consultas</h2>

              {proximasConsultas.length === 0 ? (
                <p>Nenhuma consulta futura agendada.</p>
              ) : (
                <ul>
                  {proximasConsultas.map((c: any) => (
                    <li key={c.id}>
                      <strong>{c.paciente?.nome}</strong> — {c.data} às {c.horario}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* PRESCRIÇÕES RECENTES */}
            <section className="card bloco">
              <h2>Prescrições Recentes</h2>

              {prescricoesRecentes.length === 0 ? (
                <p>Nenhuma prescrição criada recentemente.</p>
              ) : (
                <ul>
                  {prescricoesRecentes.map((p: any) => (
                    <li key={p.id}>
                      <strong>{p.tipo}</strong> — {p.paciente?.nome}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* PRONTUÁRIOS RECENTES */}
            <section className="card bloco">
              <h2>Prontuários Recentes</h2>

              {prontuariosRecentes.length === 0 ? (
                <p>Nenhum prontuário adicionado recentemente.</p>
              ) : (
                <ul>
                  {prontuariosRecentes.map((pr: any) => (
                    <li key={pr.id}>
                      <strong>{pr.paciente?.nome}</strong> — {pr.data}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default DashboardProfissional;
