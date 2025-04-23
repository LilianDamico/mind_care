import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  nome: string;
}

interface Props {
  onSelectUser: (user: User) => void;
}

const ChatSidebar: React.FC<Props> = ({ onSelectUser }) => {
  const [contatos, setContatos] = useState<User[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/mensagens/usuarios', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setContatos(res.data))
    .catch(err => console.error('Erro ao carregar contatos', err));
  }, []);

  return (
    <div className="chat-sidebar">
      <h3>Conversas</h3>
      <ul>
        {contatos.map(user => (
          <li key={user.id} onClick={() => onSelectUser(user)}>
            {user.nome}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;
