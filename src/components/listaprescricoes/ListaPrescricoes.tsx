import React, { useEffect, useState } from "react";
import "./ListaPrescricoes.css";
import {
  listarPrescricoesPorUserNome,
  excluirPrescricao,
} from "../../services/prescricaoService";

// Modelo correto baseado no que o backend realmente envia
interface Prescricao {
  id: string;
  tipo: string;
  conteudo: string;
  criadoEm?: string;
  paciente?: { nome: string };
  profissional?: { nome: string };
}

interface Props {
  userNome: string;
}

const ListaPrescricoes: React.FC<Props> = ({ userNome }) => {
  const [prescricoes, setPrescricoes] = useState<Prescricao[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // ================== Carregar prescrições ==================
  useEffect(() => {
    async function carregar() {
      try {
        setErro(null);
        setLoading(true);

        const data = await listarPrescricoesPorUserNome(userNome);
        setPrescricoes(data ?? []);
      } catch {
        setErro("Falha ao carregar prescrições.");
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [userNome]);

  // ================== Excluir ==================
  async function handleExcluir(id: string) {
    const confirmar = window.confirm("Excluir definitivamente?");
    if (!confirmar) return;

    try {
      await excluirPrescricao(id);
      setPrescricoes((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setErro("Erro ao excluir prescrição.");
    }
  }

  // ================== Render ==================
  return (
    <div className="lista-prescricoes">
      <h2>Prescrições de {userNome}</h2>

      {erro && <p className="erro">{erro}</p>}
      {loading && <p>Carregando...</p>}

      {!loading && prescricoes.length === 0 && (
        <p>Nenhuma prescrição encontrada.</p>
      )}

      {!loading && prescricoes.length > 0 && (
        <ul>
          {prescricoes.map((p) => (
            <li key={p.id}>
              <div className="prescricao-item">
                <strong>{p.tipo}</strong>
                <p className="conteudo">{p.conteudo}</p>

                <div className="meta">
                  {p.paciente && <span>👤 {p.paciente.nome}</span>}
                  {p.criadoEm && (
                    <small>{new Date(p.criadoEm).toLocaleDateString("pt-BR")}</small>
                  )}
                </div>

                <button className="btn-excluir" onClick={() => handleExcluir(p.id)}>
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaPrescricoes;
