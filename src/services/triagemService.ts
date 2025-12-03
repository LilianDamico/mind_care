// src/services/triagemService.ts
import api from "./api";

export interface TriagemResponse {
  risco: "risco_baixo" | "risco_moderado" | "risco_alto";
  resposta: string;
  acao: "continuar" | "sugerir_agendamento" | "direcionar_emergencia";
}

/**
 * Envia uma mensagem para o endpoint de triagem por IA.
 */
export const enviarMensagemTriagem = async (mensagem: string) => {
  const response = await api.post<TriagemResponse>("/api/public/triagem", {
    mensagem,
  });

  return response.data;
};
