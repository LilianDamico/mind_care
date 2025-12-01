import React, { useState } from "react";
import { buscarProfissionaisPorNome } from "../../services/professionalService";
import { listarHorariosPorNome } from "../../services/horarioService";
import { agendarConsulta } from "../../services/appointmentService";
import "./AgendarCliente.css";

const AgendarCliente: React.FC = () => {
  const clienteNome = localStorage.getItem("userNome") || "";
  const [busca, setBusca] = useState("");
  const [profissionais, setProfissionais] = useState<any[]>([]);
  const [profSelecionado, setProfSelecionado] = useState<any>(null);
  const [horarios, setHorarios] = useState<any[]>([]);
  const [msg, setMsg] = useState("");

  const handleBuscar = async () => {
    const res = await buscarProfissionaisPorNome(busca);
    setProfissionais(res);
  };

  const verHorarios = async (p: any) => {
    setProfSelecionado(p);
    const res = await listarHorariosPorNome(p.nome);
    setHorarios(res);
  };

  const reservar = async (horarioId: string) => {
    try {
      await agendarConsulta({
        clienteNome,
        profissionalNome: profSelecionado.nome,
        horarioId,
      });

      setMsg("✔ Consulta reservada com sucesso!");
      setHorarios([]);
      setProfissionais([]);
      setProfSelecionado(null);

    } catch {
      setMsg("Erro ao reservar");
    }
  };

  return (
    <div className="agendar-container">

      {msg && <div className="msg">{msg}</div>}

      <h1>Agendar Consulta</h1>

      <input 
        type="text"
        value={busca}
        placeholder="Nome do profissional"
        onChange={(e)=>setBusca(e.target.value)}
      />
      <button onClick={handleBuscar}>Buscar</button>

      {profissionais.length > 0 && (
        <ul className="lista-prof">
          {profissionais.map((p)=>(
            <li key={p.id}>
              <strong>{p.nome}</strong>
              <button onClick={()=>verHorarios(p)}>Ver horários</button>
            </li>
          ))}
        </ul>
      )}

      {horarios.length > 0 && (
        <ul className="lista-horarios">
          {horarios.map((h)=>(
            <li key={h.id}>
              <span>{new Date(h.dataHora).toLocaleString("pt-BR")}</span>
              <button onClick={()=>reservar(h.id)}>Reservar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AgendarCliente;
