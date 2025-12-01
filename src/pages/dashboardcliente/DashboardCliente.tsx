// src/pages/dashboardcliente/DashboardCliente.tsx
import React, { useEffect, useState, useCallback } from "react";
import {
  listarConsultasPorCliente,
  cancelarConsulta,
} from "../../services/appointmentService";

import SidebarCliente from "../../components/sidebarcliente/SidebarCliente";
import ListaConsultas from "../../components/listaconsultas/ListaConsultas";
import NovaConsulta from "../../components/novaconsulta/NovaConsulta";
import { Navbar } from "../../components/navbar/Navbar";

import "./DashboardCliente.css";

const DashboardCliente: React.FC = () => {
  // ---------------------------------------------------------
  // Obter nome do cliente (token / localStorage)
  // ---------------------------------------------------------
  let nomeCliente = "Cliente";
  const rawData = localStorage.getItem("data");

  try {
    if (rawData) {
      const parsed = JSON.parse(rawData);
      if (parsed?.nome) nomeCliente = parsed.nome;
    }
  } catch {}

  nomeCliente =
    localStorage.getItem("userNome") ||
    localStorage.getItem("nome") ||
    nomeCliente;

  // ---------------------------------------------------------
  // Estados
  // ---------------------------------------------------------
  const [consultas, setConsultas] = useState<any[]>([]);
  const [mensagem, setMensagem] = useState("");

  // ---------------------------------------------------------
  // Carregar consultas
  // ---------------------------------------------------------
  const carregarConsultas = useCallback(async () => {
    try {
      const data = await listarConsultasPorCliente(nomeCliente);

      const lista = Array.isArray(data)
        ? data
        : Array.isArray((data as any)?.consultas)
        ? (data as any).consultas
        : [];

      setConsultas(lista);
      setMensagem("");
    } catch (err) {
      console.error("Erro ao carregar consultas:", err);
      setConsultas([]);
      setMensagem("Nenhuma consulta encontrada.");
    }
  }, [nomeCliente]);

  useEffect(() => {
    carregarConsultas();
  }, [carregarConsultas]);

  // ---------------------------------------------------------
  // Cancelar consulta
  // ---------------------------------------------------------
  const handleDesmarcar = async (id: string) => {
    try {
      await cancelarConsulta(id);

      setConsultas((prev) => prev.filter((c) => c.id !== id));

      setMensagem("✔ Consulta cancelada com sucesso!");
      setTimeout(() => setMensagem(""), 3000);
    } catch (err) {
      console.error("Erro ao cancelar consulta:", err);
      setMensagem("❌ Não foi possível cancelar a consulta.");
    }
  };

  // ---------------------------------------------------------
  // Atualizar após agendar
  // ---------------------------------------------------------
  const handleConsultaAgendada = () => {
    carregarConsultas();
  };

  // ---------------------------------------------------------
  // Render
  // ---------------------------------------------------------
  return (
    <div className="layout-dashboard">
      <Navbar />
      <SidebarCliente nomeUsuario={nomeCliente} />

      <main className="conteudo">
        <h1>Dashboard do Paciente</h1>

        {mensagem && (
          <p
            className={
              mensagem.startsWith("✔")
                ? "mensagem-sucesso"
                : "mensagem-erro"
            }
          >
            {mensagem}
          </p>
        )}

        {/* Lista de Consultas */}
        <section className="bloco">
          <h2>📅 Minhas Consultas</h2>

          {consultas.length > 0 ? (
            <ListaConsultas
              nomeUsuario={nomeCliente}
              consultas={consultas}
              onDesmarcar={handleDesmarcar}
            />
          ) : (
            <p className="mensagem-vazia">
              Nenhuma consulta encontrada. Agende uma nova!
            </p>
          )}
        </section>

        {/* Nova Consulta */}
        <section className="bloco">
          <h2>➕ Marcar Nova Consulta</h2>
          <NovaConsulta
            nomeCliente={nomeCliente}
            onConsultaAgendada={handleConsultaAgendada}
          />
        </section>
      </main>
    </div>
  );
};

export default DashboardCliente;
