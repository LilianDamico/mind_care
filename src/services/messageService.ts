// src/services/messageService.ts
import { apiUrlLocal } from './api'; // ⬅️ Importação correta

// Buscar lista de contatos
export const listarContatos = async () => {
  const response = await apiUrlLocal.get('/usuarios');
  return response.data;
};

// Buscar mensagens de uma conversa
export const buscarMensagens = async (destinatarioId: number) => {
  const response = await apiUrlLocal.get(`/conversa/${destinatarioId}`);
  return response.data;
};

// Enviar nova mensagem
export const enviarMensagem = async (destinatarioId: number, conteudo: string) => {
  const response = await apiUrlLocal.post('/mensagens', {
    destinatarioId,
    content: conteudo
  });
  return response.data;
};
