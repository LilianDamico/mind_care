import React from "react";
import { cancelarConsulta } from "../../services/appointmentService";
import { useNavigate } from "react-router-dom";
import "./ListaConsultas.css";

interface Consulta {
  id: string;
  dataHora: string;
  status: string;
  profissional: { nome: string };
  avaliacoes?: { id: string }[]; // <-- importante
}

interface Props {
  nomeUsuario: string;
  consultas: Consulta[];
  onDesmarcar?: (id: string) => void;
}

const ListaConsultas: React.FC<Props> = ({
  nomeUsuario,
  consultas,
  onDesmarcar,
}) => {
  const navigate = useNavigate();

  const handleCancelar = async (id: string) => {
    try {
      await cancelarConsulta(id);
      onDesmarcar?.(id);
    } catch (error) {
      console.error("Erro ao cancelar consulta:", error);
    }
  };

  const handlePesquisa = (id: string) => {
    navigate(`/pesquisa-satisfacao/${id}`);
  };

  const jaAvaliada = (c: Consulta) => {
    return c.avaliacoes && c.avaliacoes.length > 0;
  };

  return (
    <div className="lista-consultas">
      {consultas.length === 0 ? (
        <p>Nenhuma consulta encontrada para {nomeUsuario}.</p>
      ) : (
        <ul>
          {consultas.map((c) => (
            <li key={c.id} className="consulta-item">
              <p>
                <strong>Data:</strong>{" "}
                {new Date(c.dataHora).toLocaleString("pt-BR")}
              </p>

              <p>
                <strong>Profissional:</strong> {c.profissional.nome}
              </p>

              <p>
                <strong>Status:</strong> {c.status}
              </p>

              {/* Botão Cancelar — somente se ainda está agendada */}
              {c.status === "AGENDADA" && (
                <button
                  className="btn-cancelar"
                  onClick={() => handleCancelar(c.id)}
                >
                  Cancelar
                </button>
              )}

              {/* Botão Pesquisa de Satisfação — consulta concluída e sem avaliação */}
              {c.status === "CONCLUIDA" && !jaAvaliada(c) && (
                <button
                  className="btn-pesquisa"
                  onClick={() => handlePesquisa(c.id)}
                >
                  ⭐ Fazer Pesquisa de Satisfação
                </button>
              )}

              {/* Indicar que já foi avaliada */}
              {c.status === "CONCLUIDA" && jaAvaliada(c) && (
                <p className="avaliada-tag">⭐ Avaliação já enviada</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaConsultas;
