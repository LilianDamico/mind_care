// src/services/messageService.ts
import api from './api';

// Buscar lista de contatos
export const listarContatos = async () => {
  const response = await api.get('/usuarios');
  return response.data;
};

// Buscar mensagens de uma conversa
export const buscarMensagens = async (destinatarioId: number) => {
  const response = await api.get(`/conversa/${destinatarioId}`);
  return response.data;
};

// Enviar nova mensagem
export const enviarMensagem = async (destinatarioId: number, conteudo: string) => {
  const response = await api.post('/mensagens', {
    destinatarioId,
    content: conteudo
  });
  return response.data;
};