// src/components/novaconsulta/NovaConsulta.tsx
import React, { useState } from "react";
import { buscarProfissionaisPorNome } from "../../services/professionalService";
import { listarHorariosPorNome } from "../../services/horarioService";
import { agendarConsulta } from "../../services/appointmentService";

import "./NovaConsulta.css";

interface Props {
  nomeCliente: string;
  onConsultaAgendada?: () => void;
}

interface Profissional {
  id: string;
  nome: string;
  especialidade?: string;
  cidade?: string;
}

interface Horario {
  id: string;        // ID do slot (deve bater com a FK do backend)
  dataHora: string;  // ISO string vinda da API
  disponivel: boolean;
}

const NovaConsulta: React.FC<Props> = ({ nomeCliente, onConsultaAgendada }) => {
  const [busca, setBusca] = useState("");
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [profSelecionado, setProfSelecionado] = useState<Profissional | null>(
    null
  );
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  // -------------------------------------------------------------
  // BUSCAR PROFISSIONAIS
  // -------------------------------------------------------------
  const handleBuscar = async () => {
    setMensagem("");
    setProfSelecionado(null);
    setHorarios([]);
    setProfissionais([]);

    const termo = busca.trim();

    if (termo.length < 2) {
      setMensagem("Digite ao menos 2 letras para buscar um profissional.");
      return;
    }

    try {
      setLoading(true);
      const resultado = await buscarProfissionaisPorNome(termo);

      if (!resultado || resultado.length === 0) {
        setMensagem("Nenhum profissional encontrado.");
        return;
      }

      setProfissionais(resultado);
    } catch (err) {
      console.error("Erro ao buscar profissionais:", err);
      setMensagem("Erro ao buscar profissionais.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // CARREGAR HORÁRIOS DO PROFISSIONAL
  // -------------------------------------------------------------
  const handleVerHorarios = async (p: Profissional) => {
    setProfSelecionado(p);
    setHorarios([]);
    setMensagem("");

    try {
      setLoading(true);

      const resultado = await listarHorariosPorNome(p.nome);

      if (!Array.isArray(resultado) || resultado.length === 0) {
        setMensagem("Profissional sem horários disponíveis.");
        return;
      }

      setHorarios(resultado);
    } catch (err) {
      console.error("Erro ao carregar horários:", err);
      setMensagem("Erro ao carregar horários.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // AGENDAR CONSULTA
  // -------------------------------------------------------------
  const handleAgendar = async (horarioId: string) => {
    if (!profSelecionado) return;

    try {
      setLoading(true);

      await agendarConsulta({
        clienteNome: nomeCliente,
        profissionalNome: profSelecionado.nome,
        horarioId,
      });

      setMensagem("✔ Consulta agendada com sucesso!");

      // reset visual
      setProfSelecionado(null);
      setHorarios([]);
      setProfissionais([]);
      setBusca("");

      // avisar o pai (DashboardCliente) para recarregar
      onConsultaAgendada?.();
    } catch (err) {
      console.error("Erro ao agendar consulta:", err);
      setMensagem("Erro ao agendar consulta.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // RENDER
  // -------------------------------------------------------------
  return (
    <div className="nova-consulta-container">
      {mensagem && (
        <div
          className={
            mensagem.startsWith("✔") ? "msg-sucesso" : "msg-erro"
          }
        >
          {mensagem}
        </div>
      )}

      {/* BUSCA DE PROFISSIONAL */}
      <div className="busca-box">
        <input
          type="text"
          placeholder="Digite o nome do profissional..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleBuscar()}
        />
        <button onClick={handleBuscar} disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {/* LISTA DE PROFISSIONAIS */}
      {profissionais.length > 0 && (
        <ul className="prof-lista">
          {profissionais.map((p) => (
            <li key={p.id} className="prof-item">
              <div>
                <strong>{p.nome}</strong>{" "}
                <span className="prof-extra">
                  {p.especialidade ? `— ${p.especialidade}` : ""}{" "}
                  {p.cidade ? `(${p.cidade})` : ""}
                </span>
              </div>

              <button
                className="btn-ver-horarios"
                onClick={() => handleVerHorarios(p)}
              >
                Ver horários
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* PROFISSIONAL SELECIONADO */}
      {profSelecionado && (
        <div className="selecionado-label">
          <span>Profissional selecionado:</span>{" "}
          <strong>{profSelecionado.nome}</strong>
        </div>
      )}

      {/* HORÁRIOS DISPONÍVEIS */}
      {horarios.length > 0 && (
        <ul className="horarios-lista">
          {horarios.map((h) => (
            <li key={h.id} className="horario-item">
              <span>
                {new Date(h.dataHora).toLocaleString("pt-BR")}
              </span>
              <button
                onClick={() => handleAgendar(h.id)}
                className="btn-agendar"
                disabled={loading}
              >
                Agendar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NovaConsulta;

