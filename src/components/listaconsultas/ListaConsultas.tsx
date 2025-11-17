import React from "react";
import { cancelarConsulta } from "../../services/appointmentService";
import "./ListaConsultas.css";

interface Consulta {
  id: string;
  dataHora: string;
  profissional: { nome: string };
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
  
  const handleCancelar = async (id: string) => {
    try {
      await cancelarConsulta(id);
      if (onDesmarcar) onDesmarcar(id);
    } catch (error) {
      console.error("Erro ao cancelar consulta:", error);
    }
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

              <button
                className="btn-cancelar"
                onClick={() => handleCancelar(c.id)}
              >
                Cancelar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaConsultas;
