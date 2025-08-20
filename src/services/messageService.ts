// src/services/messageService.ts
import { apiUrl } from './api';

// Buscar lista de contatos
export const listarContatos = async () => {
  const response = await apiUrl.get('/usuarios');
  return response.data;
};

// Buscar mensagens de uma conversa
export const buscarMensagens = async (destinatarioId: number) => {
  const response = await apiUrl.get(`/conversa/${destinatarioId}`);
  return response.data;
};

// Enviar nova mensagem
export const enviarMensagem = async (destinatarioId: number, conteudo: string) => {
  const response = await apiUrl.post('/mensagens', {
    destinatarioId,
    content: conteudo
  });
  return response.data;
};