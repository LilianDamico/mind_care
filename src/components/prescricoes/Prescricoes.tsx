// src/components/prescricoes/Prescricoes.tsx
import React, { useEffect, useState, useCallback } from "react";
import { Navbar } from "../../components/navbar/Navbar";
import SidebarProfissional from "../../components/sidebarprofissional/SidebarProfissional";

import {
  listarPrescricoesPorUserNome,
  criarPrescricao,
  atualizarPrescricao,
  excluirPrescricao,
  TipoPrescricao,
  Prescricao,
} from "../../services/prescricaoService";

import "./Prescricoes.css";

const TIPOS: TipoPrescricao[] = ["RECEITA", "LAUDO", "RELATORIO"];

const Prescricoes: React.FC = () => {
  const nomeUsuario = localStorage.getItem("nome") || "Usuário";

  const [lista, setLista] = useState<Prescricao[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // criação
  const [pacienteNome, setPacienteNome] = useState("");
  const [tipo, setTipo] = useState<TipoPrescricao>("RECEITA");
  const [conteudo, setConteudo] = useState("");

  // edição
  const [editando, setEditando] = useState<Prescricao | null>(null);

  /** ================= CARREGAR ================= */
  const carregar = useCallback(async () => {
    setErro(null);
    setLoading(true);
    try {
      const dados = await listarPrescricoesPorUserNome(nomeUsuario);
      setLista(dados);
    } catch (e) {
      console.error(e);
      setErro("Erro ao carregar prescrições.");
    } finally {
      setLoading(false);
    }
  }, [nomeUsuario]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  /** ================= CRIAR ================= */
  async function handleCriar() {
    setErro(null);

    if (!pacienteNome.trim() || !conteudo.trim()) {
      setErro("Informe o paciente e o conteúdo da prescrição.");
      return;
    }

    try {
      const nova = await criarPrescricao({
        pacienteNome,
        profissionalNome: nomeUsuario,
        tipo,
        conteudo,
      });

      setLista((prev) => [nova, ...prev]);
      setPacienteNome("");
      setConteudo("");
      setTipo("RECEITA");
    } catch (e) {
      console.error(e);
      setErro("Erro ao criar prescrição.");
    }
  }

  /** ================= SALVAR EDIÇÃO ================= */
  async function handleSalvarEdicao() {
    if (!editando) return;

    try {
      const atualizada = await atualizarPrescricao(editando.id, {
        tipo: editando.tipo,
        conteudo: editando.conteudo,
      });

      setLista((prev) =>
        prev.map((p) => (p.id === atualizada.id ? atualizada : p))
      );
      setEditando(null);
      setErro(null);
    } catch (e) {
      console.error(e);
      setErro("Erro ao atualizar prescrição.");
    }
  }

  /** ================= EXCLUIR ================= */
  async function handleExcluir(id: string) {
    const ok = window.confirm("Tem certeza que deseja excluir esta prescrição?");
    if (!ok) return;

    try {
      await excluirPrescricao(id);
      setLista((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      console.error(e);
      setErro("Erro ao excluir prescrição.");
    }
  }

  /** ================= IMPRIMIR ================= */
  function handleImprimir(p: Prescricao) {
    const paciente = p.paciente?.nome ?? "Paciente";
    const data = new Date().toLocaleDateString("pt-BR");

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <title>Prescrição - ${paciente}</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap">
        <style>
          body { font-family:"Inter",sans-serif;margin:32px;color:#222;}
          .topo{display:flex;justify-content:space-between;border-bottom:2px solid #7d2ae8;padding-bottom:10px;margin-bottom:24px;}
          .titulo{text-align:center;font-size:22px;font-weight:600;margin:24px 0;}
          .label{font-weight:600;}
          .box{border:1px solid #ccc;padding:14px;border-radius:8px;background:#fafafa;margin-top:6px;white-space:pre-wrap;}
          .assinatura{margin-top:70px;text-align:center;}
          .assinatura hr{width:60%;border:none;border-top:1px solid #444;}
        </style>
      </head>
      <body>
        <div class="topo">
          <div>
            <strong style="color:#7d2ae8;font-size:20px;">MindCare</strong>
            <div style="font-size:13px;margin-top:4px;">
              Profissional: ${nomeUsuario}<br/>Tipo: ${p.tipo}
            </div>
          </div>
          <div style="font-size:13px;">Data: ${data}</div>
        </div>

        <div class="titulo">Prescrição</div>
        <div style="margin-bottom:16px;"><span class="label">Paciente:</span> ${paciente}</div>
        <div style="margin-bottom:30px;">
          <span class="label">Conteúdo:</span>
          <div class="box">${p.conteudo.replace(/(?:\r\n|\r|\n)/g,"<br/>")}</div>
        </div>

        <div class="assinatura"><hr/><span>Assinatura e carimbo do profissional</span></div>
        <script>window.print();</script>
      </body>
      </html>
    `;

    const win = window.open("", "_blank", "width=800,height=600");
    if (!win) return;
    win.document.write(html);
    win.document.close();
  }

  /** ================= RENDER ================= */
  return (
    <div className="layout-dashboard">
      <Navbar />
      <SidebarProfissional />

      <main className="presc-wrapper">
        <h1 className="presc-title">Prescrições</h1>
        {erro && <div className="presc-erro">{erro}</div>}

        {/* NOVA PRESCRIÇÃO */}
        <section className="presc-card">
          <h2 className="presc-subtitle">Nova Prescrição</h2>

          <div className="presc-form-row">
            <input
              className="presc-input"
              placeholder="Paciente"
              value={pacienteNome}
              onChange={(e) => setPacienteNome(e.target.value)}
            />

            <select
              className="presc-select"
              value={tipo}
              onChange={(e) => setTipo(e.target.value as TipoPrescricao)}
            >
              {TIPOS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <textarea
            className="presc-textarea"
            placeholder="Conteúdo"
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
          />
          
          <button className="presc-btn-primary" onClick={handleCriar}>
            Salvar
          </button>

          {/* 🚀 BOTÃO NOVO — Consulta Interações IA + ANVISA */}
          <button
            className="presc-btn-secondary"
            onClick={() => window.location.href = "/consultainteracoes"}
          >
            🔍 Pesquisar Interações Medicamentosas
          </button>
        </section>

        {/* LISTA DE PRESCRIÇÕES */}
        <section className="presc-card">
          <h2 className="presc-subtitle">Minhas Prescrições</h2>

          {loading && <p>Carregando...</p>}
          {!loading && lista.length === 0 && <p>Nada encontrado.</p>}

          <ul className="presc-list">
            {lista.map((p) => (
              <li key={p.id} className="presc-item">
                <div className="presc-item-info">
                  <span className="presc-tipo">{p.tipo}</span>
                  <span className="presc-paciente">Paciente: {p.paciente?.nome ?? "-"}</span>
                  <p className="presc-conteudo">{p.conteudo}</p>
                </div>

                <div className="presc-actions">
                  <button className="presc-btn" onClick={() => setEditando(p)}>Editar</button>
                  <button className="presc-btn" onClick={() => handleImprimir(p)}>Imprimir</button>
                  <button className="presc-btn danger" onClick={() => handleExcluir(p.id)}>Excluir</button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* MODAL EDITAR */}
        {editando && (
          <div className="presc-modal-backdrop" onClick={() => setEditando(null)}>
            <div className="presc-modal" onClick={(e) => e.stopPropagation()}>
              <h3>Editar Prescrição</h3>

              <select
                className="presc-select"
                value={editando.tipo}
                onChange={(e) => setEditando({ ...editando, tipo: e.target.value as TipoPrescricao })}
              >
                {TIPOS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <textarea
                className="presc-textarea"
                value={editando.conteudo}
                onChange={(e) => setEditando({ ...editando, conteudo: e.target.value })}
              />

              <button className="presc-btn-primary" onClick={handleSalvarEdicao}>
                Salvar alterações
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Prescricoes;
