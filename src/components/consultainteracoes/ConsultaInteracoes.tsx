import React, { useState } from "react";
import { consultarInteracoes } from "../../services/anvisaService";
import { marked } from "marked";
import "./ConsultaInteracoes.css";

interface InteracaoResponse {
  medicamento: string;
  fonte_principal: string;
  relatorio_clinico: string;   // saída IA em Markdown
}

export default function ConsultaInteracoes() {
  const [termo, setTermo] = useState("");
  const [resultado, setResultado] = useState<InteracaoResponse | null>(null);
  const [htmlRender, setHtmlRender] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const buscar = async () => {
    if (!termo.trim()) return;

    setErro("");
    setLoading(true);

    try {
      const resp = await consultarInteracoes(termo);

      if (
        resp &&
        typeof resp === "object" &&
        "relatorio_clinico" in resp &&
        "fonte_principal" in resp &&
        "medicamento" in resp
      ) {
        const data = resp as InteracaoResponse;

        const convertido = await marked.parse(data.relatorio_clinico || "");
        setResultado(data);
        setHtmlRender(convertido);

      } else {
        throw new Error("Formato inesperado do servidor.");
      }

    } catch (e) {
      console.error(e);
      setErro("❌ Não foi possível consultar interações no momento.");
      setResultado(null);
      setHtmlRender("");
    }

    setLoading(false);
  };

  return (
    <div className="consulta-interacoes">
      <h2>🔍 Verificar Interações Medicamentosas</h2>

      <div className="box-interacao">
        <input
          type="text"
          placeholder="Ex: Ibuprofeno, Amoxicilina..."
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
        />
        <button onClick={buscar} disabled={loading}>
          {loading ? "Carregando..." : "Buscar Interações"}
        </button>
      </div>

      {erro && <p className="msg-erro">{erro}</p>}

      {resultado && (
        <div className="resultado-box">
          <h3>🧠 Medicamento analisado: {resultado.medicamento}</h3>
          <p><b>📌 Fontes utilizadas:</b> {resultado.fonte_principal}</p>

          <hr />

          <h3>📊 Relatório Clínico</h3>
          <div
            className="markdown-output"
            dangerouslySetInnerHTML={{ __html: htmlRender }}
          />
        </div>
      )}
    </div>
  );
}
