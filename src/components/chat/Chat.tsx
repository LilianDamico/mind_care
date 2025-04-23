import React, { useState } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatBox from './ChatBox';
import NewMessageForm from './NewMessageForm';
import './Chat.css'; 

interface User {
  id: number;
  nome: string;
}

const Chat: React.FC = () => {
  const [destinatario, setDestinatario] = useState<User | null>(null);
  const [reload, setReload] = useState(false);

  const atualizarMensagens = () => setReload(!reload);

  return (
    <div className="chat-container">
      <ChatSidebar onSelectUser={setDestinatario} />
      {destinatario && (
        <div className="chat-content">
          <h2>Conversando com {destinatario.nome}</h2>
          <ChatBox key={reload.toString()} destinatarioId={destinatario.id} />
          <NewMessageForm destinatarioId={destinatario.id} onMessageSent={atualizarMensagens} />
        </div>
      )}
    </div>
  );
};

export default Chat;
