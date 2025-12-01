import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/navbar/Navbar";
import SidebarProfissional from "../../components/sidebarprofissional/SidebarProfissional";
import {
  calendarioMe,
  calendarioGerarDia,
  calendarioAtualizar,
  calendarioExcluir,
} from "../../services/calendarioService";
import "./CalendarioProfissional.css";

const CalendarioProfissional: React.FC = () => {
  const userNome = localStorage.getItem("userNome") || "Profissional";

  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");

  const [modalAberto, setModalAberto] = useState(false);
  const [slotEditando, setSlotEditando] = useState<any>(null);
  const [editObs, setEditObs] = useState("");
  const [editDisponivel, setEditDisponivel] = useState(true);

  const carregarAgenda = async () => {
    try {
      const resp = await calendarioMe();
      setSlots(resp?.slots || []);
    } catch (err) {
      console.error("Erro ao carregar agenda:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    carregarAgenda();
  }, []);

  const gerarHorarios = async () => {
    if (!data || !inicio || !fim) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      await calendarioGerarDia({
        data,
        inicio,
        fim,
        intervalo: 30,
      });

      carregarAgenda();
    } catch (err) {
      console.error("Erro ao gerar horários:", err);
    }
  };

  const abrirEditar = (slot: any) => {
    setSlotEditando(slot);
    setEditObs(slot.observacao || "");
    setEditDisponivel(slot.disponivel);
    setModalAberto(true);
  };

  const salvarEdicao = async () => {
    try {
      await calendarioAtualizar(slotEditando.id, editDisponivel);
      setModalAberto(false);
      carregarAgenda();
    } catch (err) {
      console.error("Erro ao salvar edição:", err);
    }
  };

  const excluirHorario = async (id: string) => {
    try {
      await calendarioExcluir(id);
      carregarAgenda();
    } catch (err) {
      console.error("Erro ao excluir:", err);
    }
  };

  return (
    <div className="layout-dashboard">
      <Navbar />
      <SidebarProfissional />

      <main className="conteudo">

        <h1 className="titulo">Minha Agenda</h1>
        <p className="subtitulo">
          Profissional: <strong>{userNome}</strong>
        </p>

        <section className="bloco-calendario">
          <h2>Gerar Horários (30 min)</h2>

          <div className="linha-form">
            <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
            <input type="time" value={inicio} onChange={(e) => setInicio(e.target.value)} />
            <input type="time" value={fim} onChange={(e) => setFim(e.target.value)} />

            <button onClick={gerarHorarios} className="btn-gerar">Gerar horários</button>
          </div>
        </section>

        <section className="bloco-calendario">
          <h2>Horários Criados</h2>

          {loading ? (
            <p>Carregando…</p>
          ) : slots.length === 0 ? (
            <p>Nenhum horário criado.</p>
          ) : (
            <ul className="lista-horarios">
              {slots.map((slot) => (
                <li key={slot.id} className="item-horario">
                  <div className="slot-info">
                    <strong>{new Date(slot.dataHora).toLocaleString("pt-BR")}</strong>

                    {slot.observacao && (
                      <span className="obs">({slot.observacao})</span>
                    )}

                    {!slot.disponivel && (
                      <span className="tag-indisponivel">Indisponível</span>
                    )}
                  </div>

                  <div className="botoes-acoes">
                    <button className="btn-editar" onClick={() => abrirEditar(slot)}>
                      Editar
                    </button>

                    <button className="btn-excluir" onClick={() => excluirHorario(slot.id)}>
                      Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {modalAberto && (
          <div className="modal">
            <div className="modal-inner">
              <h2>Editar Horário</h2>

              <label>Observação:</label>
              <input
                type="text"
                className="input-modal"
                value={editObs}
                onChange={(e) => setEditObs(e.target.value)}
              />

              <label className="checkbox-linha">
                <input
                  type="checkbox"
                  checked={editDisponivel}
                  onChange={(e) => setEditDisponivel(e.target.checked)}
                />
                Disponível
              </label>

              <div className="modal-botoes">
                <button className="btn-salvar" onClick={salvarEdicao}>
                  Salvar
                </button>

                <button className="btn-fechar" onClick={() => setModalAberto(false)}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CalendarioProfissional;
