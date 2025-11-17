import React, { useEffect, useState, useCallback } from "react";
import { Navbar } from "../../components/navbar/Navbar";
import SidebarProfissional from "../../components/sidebarprofissional/SidebarProfissional";

import {
  listarPrescricoesPorUserNome,
  criarPrescricao,
  atualizarPrescricao,
  excluirPrescricao,
} from "../../services/appointmentService";

import "./Prescricoes.css";

const tiposPrescricao = ["RECEITA", "EXAME", "ATESTADO", "OUTRO"];

const Prescricoes: React.FC = () => {
  const nomeUsuario = localStorage.getItem("nome") || "Usuário";

  const [lista, setLista] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // estados da criação
  const [pacienteNome, setPacienteNome] = useState("");
  const [tipo, setTipo] = useState("RECEITA");
  const [conteudo, setConteudo] = useState("");

  // edição
  const [editando, setEditando] = useState<any | null>(null);

  // ===================================================
  // 🚀 CARREGAR PRESCRIÇÕES
  // ===================================================
  const carregar = useCallback(async () => {
    setErro(null);
    setLoading(true);

    try {
      const resp = await listarPrescricoesPorUserNome(nomeUsuario);
      setLista(resp || []);
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

  // ===================================================
  // ➕ CRIAR
  // ===================================================
  const handleCriar = async () => {
    if (!pacienteNome.trim() || !conteudo.trim()) {
      setErro("Preencha o nome do paciente e o conteúdo da prescrição.");
      return;
    }

    try {
      const nova = await criarPrescricao({
        pacienteNome,
        tipo,
        conteudo,
      });

      setLista((prev) => [nova, ...prev]);
      setPacienteNome("");
      setConteudo("");
      setErro(null);
    } catch (e) {
      console.error(e);
      setErro("Erro ao criar prescrição.");
    }
  };

  // ===================================================
  // ✏️ EDITAR
  // ===================================================
  const handleSalvarEdicao = async () => {
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
  };

  // ===================================================
  // 🗑️ EXCLUIR
  // ===================================================
  const handleExcluir = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir esta prescrição?"))
      return;

    try {
      await excluirPrescricao(id);
      setLista((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      console.error(e);
      setErro("Erro ao excluir prescrição.");
    }
  };

  // ===================================================
  // 🖨️ IMPRIMIR
  // ===================================================
  const handleImprimir = (prescricao: any) => {
    const pacientePrint = prescricao.paciente?.nome ?? "Paciente";
    const data = new Date().toLocaleDateString("pt-BR");

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8"/>
        <title>Prescrição - ${pacientePrint}</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap">
        <style>
          body {
            font-family: "Inter", sans-serif;
            margin: 30px;
            color: #222;
          }
          .topo {
            display: flex;
            justify-content: space-between;
            border-bottom: 2px solid #7d2ae8;
            padding-bottom: 10px;
            margin-bottom: 25px;
          }
          .titulo {
            text-align: center;
            font-size: 22px;
            font-weight: 600;
            margin: 25px 0;
          }
          .label {
            font-weight: 600;
          }
          .box {
            border: 1px solid #ccc;
            padding: 14px;
            border-radius: 8px;
            background: #fafafa;
            margin-top: 6px;
            white-space: pre-wrap;
          }
          .assinatura {
            margin-top: 70px;
            text-align: center;
          }
          .assinatura hr {
            width: 60%;
            border: none;
            border-top: 1px solid #444;
          }
        </style>
      </head>
      <body>
        <div class="topo">
          <div>
            <strong style="color:#7d2ae8;font-size:20px;">MindCare</strong>
            <div style="font-size:13px;margin-top:4px;">
              Profissional: ${nomeUsuario}<br/>
              Tipo: ${prescricao.tipo}
            </div>
          </div>
          <div style="font-size:13px;">Data: ${data}</div>
        </div>

        <div class="titulo">Prescrição</div>

        <div style="margin-bottom:16px;">
          <span class="label">Paciente:</span> ${pacientePrint}
        </div>

        <div style="margin-bottom:30px;">
          <span class="label">Conteúdo:</span>
          <div class="box">${prescricao.conteudo.replace(
            /(?:\r\n|\r|\n)/g,
            "<br/>"
          )}</div>
        </div>

        <div class="assinatura">
          <hr/>
          <span>Assinatura e carimbo do profissional</span>
        </div>

        <script>window.print();</script>
      </body>
      </html>
    `;

    const win = window.open("", "_blank", "width=800,height=600");
    if (!win) return;
    win.document.write(html);
    win.document.close();
  };

  // ===================================================
  // RENDER
  // ===================================================
  return (
    <div className="layout-dashboard">
      <Navbar />
      <SidebarProfissional />

      <main className="conteudo-prescricao">
        <h1>Prescrições</h1>

        {erro && <div className="erro-box">{erro}</div>}

        {/* ================= NOVA ================= */}
        <section className="card">
          <h2>Nova prescrição</h2>

          <div className="form-linha">
            <input
              placeholder="Nome do paciente"
              value={pacienteNome}
              onChange={(e) => setPacienteNome(e.target.value)}
            />
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              {tiposPrescricao.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          <textarea
            placeholder="Conteúdo da prescrição"
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
          />

          <button className="btn-principal" onClick={handleCriar}>
            Salvar
          </button>
        </section>

        {/* ================= LISTAGEM ================= */}
        <section className="card">
          <h2>Minhas prescrições</h2>

          {loading && <p>Carregando...</p>}
          {!loading && lista.length === 0 && <p>Nenhuma prescrição encontrada.</p>}

          <ul className="lista-prescricoes">
            {lista.map((p) => (
              <li key={p.id} className="item-prescricao">
                <div>
                  <strong>{p.tipo}</strong>
                  <p>Paciente: {p.paciente?.nome}</p>
                  <p className="conteudo">{p.conteudo}</p>
                </div>

                <div className="acoes">
                  <button onClick={() => setEditando(p)}>Editar</button>
                  <button className="btn-print" onClick={() => handleImprimir(p)}>
                    Imprimir
                  </button>
                  <button className="danger" onClick={() => handleExcluir(p.id)}>
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ================= MODAL ================= */}
        {editando && (
          <div className="modal-fundo" onClick={() => setEditando(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>Editar Prescrição</h3>

              <select
                value={editando.tipo}
                onChange={(e) =>
                  setEditando({ ...editando, tipo: e.target.value })
                }
              >
                {tiposPrescricao.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>

              <textarea
                value={editando.conteudo}
                onChange={(e) =>
                  setEditando({ ...editando, conteudo: e.target.value })
                }
              />

              <button onClick={handleSalvarEdicao}>Salvar alterações</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Prescricoes;

