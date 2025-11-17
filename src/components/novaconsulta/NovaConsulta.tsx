import React, { useState } from "react";
import {
  buscarProfissionaisPorNome,
  listarHorariosPorNome,
  agendarConsulta,
} from "../../services/appointmentService";
import "./NovaConsulta.css";

interface Props {
  /** Nome do cliente logado (por nome mesmo, não id) */
  nomeCliente: string;
  /** Callback opcional pra recarregar a lista no dashboard */
  onConsultaAgendada?: () => void;
}

interface Profissional {
  id: string;
  nome: string;
  especialidade?: string;
  cidade?: string;
}

interface Horario {
  id: string;
  dataHora: string;
  disponivel?: boolean;
}

const NovaConsulta: React.FC<Props> = ({ nomeCliente, onConsultaAgendada }) => {
  const [busca, setBusca] = useState("");
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [profSelecionado, setProfSelecionado] = useState<Profissional | null>(null);
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBuscar = async () => {
    setMensagem("");
    setProfSelecionado(null);
    setHorarios([]);
    if (!busca || busca.trim().length < 2) {
      setMensagem("Digite pelo menos 2 letras para buscar.");
      return;
    }
    try {
      setLoading(true);
      const data = await buscarProfissionaisPorNome(busca.trim());
      setProfissionais(data || []);
      if (!data || data.length === 0) setMensagem("Nenhum profissional encontrado.");
    } catch (e) {
      setMensagem("Erro ao buscar profissionais.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerHorarios = async (p: Profissional) => {
    setMensagem("");
    setProfSelecionado(p);
    setHorarios([]);
    try {
      setLoading(true);
      const res = await listarHorariosPorNome(p.nome);
      setHorarios(res?.horarios || []);
      if (!res?.horarios || res.horarios.length === 0) {
        setMensagem("Profissional sem horários disponíveis no momento.");
      }
    } catch (e) {
      setMensagem("Erro ao carregar horários.");
    } finally {
      setLoading(false);
    }
  };

  const handleAgendar = async (horarioId: string) => {
    if (!profSelecionado) {
      setMensagem("Selecione um profissional antes de agendar.");
      return;
    }
    try {
      setLoading(true);
      await agendarConsulta({
        clienteNome: nomeCliente,
        profissionalNome: profSelecionado.nome,
        horarioId, // ✅ backend espera horarioId (não dataHora)
      });
      setMensagem("✅ Consulta marcada com sucesso!");
      // limpa UI
      setProfSelecionado(null);
      setHorarios([]);
      setProfissionais([]);
      setBusca("");
      // notifica pai
      onConsultaAgendada?.();
    } catch (e) {
      setMensagem("Erro ao marcar consulta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nova-consulta">
      {mensagem && <p className="mensagem">{mensagem}</p>}

      <div className="busca-prof">
        <input
          type="text"
          placeholder="Busque pelo nome do profissional…"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleBuscar()}
        />
        <button onClick={handleBuscar} disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {profissionais.length > 0 && (
        <ul className="lista-prof">
          {profissionais.map((p) => (
            <li key={p.id}>
              <div className="prof-info">
                <strong>{p.nome}</strong>
                <span>
                  {p.especialidade ? ` — ${p.especialidade}` : ""}{" "}
                  {p.cidade ? ` (${p.cidade})` : ""}
                </span>
              </div>
              <button onClick={() => handleVerHorarios(p)} disabled={loading}>
                Ver horários
              </button>
            </li>
          ))}
        </ul>
      )}

      {profSelecionado && (
        <div className="selecionado-head">
          <span>Profissional selecionado:</span>{" "}
          <strong>{profSelecionado.nome}</strong>
        </div>
      )}

      {horarios.length > 0 && (
        <ul className="lista-horarios">
          {horarios.map((h) => (
            <li key={h.id}>
              <span>{new Date(h.dataHora).toLocaleString("pt-BR")}</span>
              <button onClick={() => handleAgendar(h.id)} disabled={loading}>
                {loading ? "Agendando..." : "Agendar"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NovaConsulta;
