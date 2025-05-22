import React, { useEffect, useState } from 'react';
import { listarContatos, buscarMensagens, enviarMensagem } from '../../services/messageService';
import './MensagensPage.css';
import { useAuth } from '../../contexts/AuthContext';

interface Contato {
  id: number;
  nome: string;
  email: string;
}

interface Mensagem {
  id: number;
  remetente: Contato;
  destinatario: Contato;
  content: string;
}

const MensagensPage: React.FC = () => {
  const { user } = useAuth();
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [mensagem, setMensagem] = useState('');
  const [contatoSelecionado, setContatoSelecionado] = useState<Contato | null>(null);

  useEffect(() => {
    carregarContatos();
  }, []);

  const carregarContatos = async () => {
    try {
      const data = await listarContatos();
      setContatos(data);
    } catch (error) {
      console.error('Erro ao carregar contatos:', error);
    }
  };

  const carregarMensagens = async (contato: Contato) => {
    try {
      setContatoSelecionado(contato);
      const data = await buscarMensagens(contato.id);
      setMensagens(data);
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
    }
  };

  const handleEnviarMensagem = async () => {
    if (!contatoSelecionado || !mensagem.trim()) return;

    try {
      await enviarMensagem(contatoSelecionado.id, mensagem);
      setMensagem('');
      carregarMensagens(contatoSelecionado);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  return (
    <div className="mensagens-container">
      <div className="contatos">
        <h2>Contatos</h2>
        {contatos.map((contato) => (
          <div
            key={contato.id}
            className={`contato ${contatoSelecionado?.id === contato.id ? 'ativo' : ''}`}
            onClick={() => carregarMensagens(contato)}
          >
            {contato.nome}
          </div>
        ))}
      </div>

      <div className="chat">
        {contatoSelecionado ? (
          <>
            <h2>Conversando com {contatoSelecionado.nome}</h2>
            <div className="mensagens">
              {mensagens.map((msg) => (
                <div
                  key={msg.id}
                  className={`mensagem ${
                    msg.remetente.id === user?.id ? 'enviada' : 'recebida'
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>

            <div className="enviar-mensagem">
              <input
                type="text"
                placeholder="Digite sua mensagem..."
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
              />
              <button onClick={handleEnviarMensagem}>Enviar</button>
            </div>
          </>
        ) : (
          <p>Selecione um contato para iniciar a conversa.</p>
        )}
      </div>
    </div>
  );
};

export default MensagensPage;
