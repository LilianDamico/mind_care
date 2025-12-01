import React, { useCallback, useEffect, useState } from "react";
import { listarProntuariosPorUsuario } from "../../services/prontuarioService";
import SidebarProfissional from "../../components/sidebarprofissional/SidebarProfissional";
import "./Prontuarios.css";

const Prontuarios: React.FC = () => {
  const [itens, setItens] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const carregar = useCallback(async () => {
    setLoading(true);
    setMsg("");

    const nome = localStorage.getItem("userNome") || "";

    if (!nome) {
      setMsg("Nome do usuário não encontrado.");
      setLoading(false);
      return;
    }

    try {
      const lista = await listarProntuariosPorUsuario(nome);

      if (!lista || lista.length === 0) {
        setItens([]);
        setMsg("Nenhum prontuário encontrado.");
      } else {
        setItens(lista);
      }
    } catch (error) {
      console.error(error);
      setMsg("Erro ao carregar prontuários.");
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return (
    <div className="layout-dashboard">
      <SidebarProfissional />

      <main className="pr-wrapper">
        <h1 className="pr-title">Prontuários</h1>

        {loading && <p className="pr-msg">Carregando…</p>}
        {!loading && msg && <p className="pr-msg">{msg}</p>}

        {!loading && itens.length > 0 && (
          <div className="pr-table-wrapper">
            <table className="pr-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Profissional</th>
                  <th>Paciente</th>
                  <th>Descrição</th>
                </tr>
              </thead>

              <tbody>
                {itens.map((p) => (
                  <tr key={p.id}>
                    <td>
                      {new Date(
                        p.consulta?.dataHora || p.criadoEm
                      ).toLocaleString("pt-BR")}
                    </td>
                    <td>{p.consulta?.profissional?.nome ?? "-"}</td>
                    <td>{p.consulta?.cliente?.nome ?? "-"}</td>
                    <td>{p.descricao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Prontuarios;
