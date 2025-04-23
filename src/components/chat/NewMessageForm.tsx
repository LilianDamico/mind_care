import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  destinatarioId: number;
  onMessageSent: () => void;
}

const NewMessageForm: React.FC<Props> = ({ destinatarioId, onMessageSent }) => {
  const [mensagem, setMensagem] = useState('');

  const enviar = () => {
    const token = localStorage.getItem('token');
    axios.post('http://localhost:8080/mensagens', {
      destinatarioId,
      content: mensagem
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setMensagem('');
      onMessageSent();
    })
    .catch(err => console.error('Erro ao enviar mensagem', err));
  };

  return (
    <div className="new-message-form">
      <textarea
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        rows={3}
        placeholder="Digite sua mensagem..."
      />
      <button onClick={enviar}>Enviar</button>
    </div>
  );
};

export default NewMessageForm;
