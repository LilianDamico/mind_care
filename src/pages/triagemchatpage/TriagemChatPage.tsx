// src/pages/TriagemChatPage/TriagemChatPage.tsx
import React, { useState, useRef, useEffect } from "react";
import api from "../../services/api"; // ajusta o caminho se for diferente
import "./TriagemChatPage.css";

type Risco = "risco_baixo" | "risco_moderado" | "risco_alto";
type Acao = "continuar" | "sugerir_agendamento" | "direcionar_emergencia";

interface TriagemResponse {
  risco: Risco;
  resposta: string;
  acao: Acao;
}

type Autor = "usuario" | "bot";

interface Mensagem {
  id: string;
  autor: Autor;
  texto: string;
  risco?: Risco;
  acao?: Acao;
}

const TriagemChatPage: React.FC = () => {
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    {
      id: "boas-vindas",
      autor: "bot",
      texto:
        "Olá, eu sou o assistente de triagem do MindCare. Como você está se sentindo hoje?",
    },
  ]);
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // scroll automático pro fim
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [mensagens]);

  async function handleSend() {
    const conteudo = texto.trim();
    if (!conteudo || loading) return;

    setErro(null);

    const msgUsuario: Mensagem = {
      id: `user-${Date.now()}`,
      autor: "usuario",
      texto: conteudo,
    };

    setMensagens((prev) => [...prev, msgUsuario]);
    setTexto("");
    setLoading(true);

    try {
      const response = await api.post<TriagemResponse>(
        "/api/public/triagem",
        {
          mensagem: conteudo,
        }
      );

      const data = response.data;

      const msgBot: Mensagem = {
        id: `bot-${Date.now()}`,
        autor: "bot",
        texto: data.resposta,
        risco: data.risco,
        acao: data.acao,
      };

      setMensagens((prev) => [...prev, msgBot]);
    } catch (e) {
      console.error("Erro ao chamar triagem:", e);
      setErro(
        "Não consegui processar sua mensagem agora. Tente novamente em alguns instantes."
      );
      const msgBotErro: Mensagem = {
        id: `bot-erro-${Date.now()}`,
        autor: "bot",
        texto:
          "Tive um problema técnico aqui, mas você pode tentar novamente em alguns segundos.",
      };
      setMensagens((prev) => [...prev, msgBotErro]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  // pega a última mensagem do bot para ver risco/ação atuais
  const ultimaMensagemBot = [...mensagens]
    .reverse()
    .find((m) => m.autor === "bot" && m.risco);

  return (
    <div className="triagem-page">
      <div className="triagem-card">
        <header className="triagem-header">
          <div className="triagem-logo">MindCare</div>
          <div className="triagem-subtitle">Triagem emocional por IA</div>
        </header>

        {ultimaMensagemBot?.risco && (
          <div
            className={`triagem-alert triagem-alert-${ultimaMensagemBot.risco}`}
          >
            {ultimaMensagemBot.risco === "risco_alto" && (
              <p>
                🚨 Sinais de risco elevado identificados. Caso seja uma situação
                real, oriente sempre a buscar ajuda imediata: CVV 188 ou
                pronto-socorro.
              </p>
            )}
            {ultimaMensagemBot.risco === "risco_moderado" && (
              <p>
                ⚠ Sofrimento emocional significativo detectado. É recomendável
                sugerir acompanhamento com profissional.
              </p>
            )}
            {ultimaMensagemBot.risco === "risco_baixo" && (
              <p>
                ℹ Conversa em nível de risco baixo. Acolhimento e acompanhamento
                são importantes.
              </p>
            )}
          </div>
        )}

        <div className="triagem-chat">
          {mensagens.map((msg) => (
            <div
              key={msg.id}
              className={`triagem-message triagem-message-${msg.autor}`}
            >
              <div className="triagem-bubble">
                <p>{msg.texto}</p>
                {msg.autor === "bot" && msg.risco && (
                  <span className={`triagem-tag triagem-tag-${msg.risco}`}>
                    {msg.risco.replace("risco_", "Risco ")}
                  </span>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {erro && <div className="triagem-error">{erro}</div>}

        <div className="triagem-input-row">
          <input
            type="text"
            placeholder="Digite como você está se sentindo..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button onClick={handleSend} disabled={loading || !texto.trim()}>
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>

        <footer className="triagem-footer">
          <small>
            Este chat não substitui atendimento de emergência. Em situação de
            risco iminente, ligue 188 ou procure um pronto-socorro.
          </small>
        </footer>
      </div>
    </div>
  );
};

export default TriagemChatPage;
