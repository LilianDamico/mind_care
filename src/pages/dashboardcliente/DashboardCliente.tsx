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
  // 🧩 Tenta recuperar o nome real do cliente gravado no login
  const rawData = localStorage.getItem("data");
  let nomeCliente =
    localStorage.getItem("userNome") ||
    localStorage.getItem("nome") ||
    "Cliente";

  try {
    if (rawData) {
      const parsed = JSON.parse(rawData);
      if (parsed?.nome) {
        nomeCliente = parsed.nome;
      }
    }
  } catch {
    // se der erro no JSON, ignora e usa o que já temos
  }

  const [consultas, setConsultas] = useState<any[]>([]);
  const [mensagem, setMensagem] = useState<string>("");

  // =====================================================
  // 🔹 Carregar Consultas do Cliente
  // =====================================================
  const carregarConsultas = useCallback(async () => {
    try {
      const response = await listarConsultasPorCliente(nomeCliente);

      const lista = Array.isArray(response)
        ? response
        : Array.isArray(response?.consultas)
        ? response.consultas
        : [];

      setConsultas(lista);
      setMensagem("");
    } catch (err) {
      console.error("Erro ao carregar consultas:", err);
      setMensagem("❌ Erro ao carregar suas consultas.");
    }
  }, [nomeCliente]);

  useEffect(() => {
    carregarConsultas();
  }, [carregarConsultas]);

  // =====================================================
  // 🔹 Cancelar Consulta
  // =====================================================
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

  // =====================================================
  // 🔹 Renderização
  // =====================================================
  return (
    <div className="layout-dashboard">
      <Navbar />
      <SidebarCliente nomeUsuario={nomeCliente} />

      <main className="conteudo">
        <h1>Dashboard do Paciente</h1>

        {mensagem && (
          <p
            className={
              mensagem.startsWith("✔") ? "mensagem-sucesso" : "mensagem-erro"
            }
          >
            {mensagem}
          </p>
        )}

        {/* Consultas do Cliente */}
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

        {/* Marcar Consulta */}
        <section className="bloco">
          <h2>➕ Marcar Nova Consulta</h2>
          <NovaConsulta nomeCliente={nomeCliente} />
        </section>
      </main>
    </div>
  );
};

export default DashboardCliente;
