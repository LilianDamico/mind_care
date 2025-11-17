// src/pages/profissionais/ProfissionaisPage.tsx
import React, { useEffect, useState } from "react";
import { listarProfissionaisPublicos } from "../../services/publicService";
import { useNavigate } from "react-router-dom";
import "./ProfissionaisPage.css";

interface Profissional {
  id: string;
  nome: string;
  especialidade: string | null;
  cidade: string | null;
  bio: string | null;
}

const ProfissionaisPage: React.FC = () => {
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfissionais = async () => {
      try {
        const data = await listarProfissionaisPublicos();
        setProfissionais(data);
      } catch (error) {
        console.error("Erro ao buscar profissionais:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfissionais();
  }, []);

  return (
    <div className="profissionais-container">
      <h2>Profissionais Cadastrados</h2>
      <p className="descricao">
        Encontre o profissional ideal e realize seu cadastro para marcar uma consulta!
      </p>

      {loading ? (
        <p className="loading">Carregando profissionais...</p>
      ) : profissionais.length === 0 ? (
        <p className="vazio">Nenhum profissional encontrado.</p>
      ) : (
        <div className="lista-profissionais">
          {profissionais.map((p) => (
            <div key={p.id} className="card-profissional">
              <div className="card-content">
                <h3>{p.nome}</h3>
                <p>
                  <strong>Especialidade:</strong>{" "}
                  {p.especialidade || "Não informada"}
                </p>
                <p>
                  <strong>Cidade:</strong> {p.cidade || "Não informada"}
                </p>
                {p.bio && <p className="bio">{p.bio}</p>}
                <button
                  className="btn-agendar"
                  onClick={() => navigate("/signupuserpage")}
                >
                  Fazer Cadastro e Agendar Consulta
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfissionaisPage;
