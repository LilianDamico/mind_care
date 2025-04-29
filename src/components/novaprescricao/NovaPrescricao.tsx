import React, { useState } from 'react';
import { apiUrl } from '../../services/api';
import { consultarInteracoes } from '../../services/anvisaService';
import './NovaPrescricao.css';

const NovaPrescricao: React.FC = () => {
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [indicacoes, setIndicacoes] = useState('');
  const [contraIndicacoes, setContraIndicacoes] = useState('');
  const [efeitosColaterais, setEfeitosColaterais] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [interacoes, setInteracoes] = useState('');

  const handleDescricaoBlur = async () => {
    if (descricao.length > 3) {
      try {
        const resultado = await consultarInteracoes(descricao);
        setInteracoes(resultado);
      } catch {
        setInteracoes('Erro ao consultar interações.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await apiUrl.post('/prescricoes', {
        descricao,
        data,
        indicacoes,
        contraIndicacoes,
        efeitosColaterais,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMensagem('Prescrição cadastrada com sucesso!');
      setDescricao('');
      setData('');
      setIndicacoes('');
      setContraIndicacoes('');
      setEfeitosColaterais('');
      setInteracoes('');
    } catch {
      setMensagem('Erro ao cadastrar prescrição.');
    }
  };

  return (
    <div className="nova-prescricao">
      <h2>Nova Prescrição</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome do medicamento:</label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          onBlur={handleDescricaoBlur}
          required
        />

        <label>Data:</label>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />

        <label>Indicações:</label>
        <textarea
          value={indicacoes}
          onChange={(e) => setIndicacoes(e.target.value)}
        />

        <label>Contraindicações:</label>
        <textarea
          value={contraIndicacoes}
          onChange={(e) => setContraIndicacoes(e.target.value)}
        />

        <label>Efeitos Colaterais:</label>
        <textarea
          value={efeitosColaterais}
          onChange={(e) => setEfeitosColaterais(e.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </form>

      {interacoes && (
        <div className="alerta-interacoes">
          <strong>Interações medicamentosas detectadas:</strong>
          <pre>{interacoes}</pre>
        </div>
      )}

      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
};

export default NovaPrescricao;
