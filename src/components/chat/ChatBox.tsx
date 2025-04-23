import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Message {
  id: number;
  content: string;
  timestamp: string;
  remetente: { nome: string };
}

interface Props {
  destinatarioId: number;
}

const ChatBox: React.FC<Props> = ({ destinatarioId }) => {
  const [mensagens, setMensagens] = useState<Message[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:8080/mensagens/conversa/${destinatarioId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setMensagens(res.data))
    .catch(err => console.error('Erro ao carregar mensagens', err));
  }, [destinatarioId]);

  return (
    <div className="chat-box">
      <h4>Mensagens</h4>
      <div className="mensagens">
        {mensagens.map(m => (
          <div key={m.id} className="mensagem">
            <strong>{m.remetente.nome}:</strong> {m.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBox;
