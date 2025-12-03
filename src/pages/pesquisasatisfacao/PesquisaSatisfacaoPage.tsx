import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./PesquisaSatisfacaoPage.css";

export default function PesquisaSatisfacaoPage() {
  const { consultaId } = useParams();
  const navigate = useNavigate();

  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState("");
  const [enviado, setEnviado] = useState(false);

  const enviar = async () => {
    if (nota === 0) {
      alert("Selecione uma nota de 1 a 5.");
      return;
    }

    try {
      await api.post("/api/avaliacao/criar", {
        consultaId,
        nota,
        comentario
      });

      setEnviado(true);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.error || "Erro ao enviar avaliação.");
    }
  };

  if (enviado) {
    return (
      <div className="ps-container">
        <h2>Obrigado pela sua avaliação! 💜</h2>
        <p>Seu feedback ajuda a melhorar o MindCare.</p>

        <button className="ps-btn" onClick={() => navigate("/")}>
          Voltar para a Home
        </button>
      </div>
    );
  }

  return (
    <div className="ps-container">
      <h2>Pesquisa de Satisfação</h2>
      <p>Como foi sua experiência na consulta?</p>

      <div className="ps-stars">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={n <= nota ? "star active" : "star"}
            onClick={() => setNota(n)}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        className="ps-textarea"
        placeholder="Deixe um comentário (opcional)"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
      />

      <button className="ps-btn" onClick={enviar}>
        Enviar Avaliação
      </button>
    </div>
  );
}
