import React, { useEffect, useState } from "react";
import "./ListaPrescricoes.css";
import {
  listarPrescricoesPorUserNome,
  excluirPrescricao,
} from "../../services/appointmentService";

interface Prescricao {
  id: string;
  descricao: string;
  criadoEm?: string;
}

interface Props {
  userNome: string; // Agora padronizamos para userNome
}

const ListaPrescricoes: React.FC<Props> = ({ userNome }) => {
  const [prescricoes, setPrescricoes] = useState<Prescricao[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // Carrega prescrições do usuário
  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);
        const data = await listarPrescricoesPorUserNome(userNome);
        setPrescricoes(data);
      } catch (e) {
        setErro("Falha ao carregar prescrições.");
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [userNome]);

  // Excluir prescrição
  async function handleExcluir(id: string) {
    try {
      await excluirPrescricao(id);
      setPrescricoes((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      alert("Erro ao excluir prescrição.");
    }
  }

  return (
    <div className="lista-prescricoes">
      <h2>Prescrições de {userNome}</h2>

      {loading && <p>Carregando...</p>}
      {erro && <p className="erro">{erro}</p>}

      {!loading && prescricoes.length === 0 && (
        <p>Nenhuma prescrição encontrada.</p>
      )}

      {!loading && prescricoes.length > 0 && (
        <ul>
          {prescricoes.map((p) => (
            <li key={p.id}>
              <div className="prescricao-item">
                <span>{p.descricao}</span>

                {p.criadoEm && (
                  <small className="data">
                    {new Date(p.criadoEm).toLocaleDateString("pt-BR")}
                  </small>
                )}

                <button
                  className="btn-excluir"
                  onClick={() => handleExcluir(p.id)}
                >
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
