import React, { useState } from 'react';
import { consultarInteracoes } from '../../services/anvisaService';
import './ConsultaInteracoes.css';

const ConsultaInteracoes: React.FC = () => {
  const [termo, setTermo] = useState('');
  const [resultado, setResultado] = useState('');
  const [erro, setErro] = useState('');

  const buscar = async () => {
    try {
      setErro('');
      const data = await consultarInteracoes(termo);
      setResultado(data);
    } catch {
      setErro('Erro ao consultar a API da ANVISA.');
    }
  };

  return (
    <div className="consulta-interacoes">
      <h2>Verificar Interações Medicamentosas</h2>

      <input
        type="text"
        placeholder="Digite o nome do medicamento"
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
      />

      <button className="dashboard-button" onClick={buscar}>
        Buscar Interações
      </button>

      {erro && <p className="erro">{erro}</p>}

      {resultado && (
        <div className="resultado">
          <h4>Resultado:</h4>
          <pre>{resultado}</pre>
        </div>
      )}
    </div>
  );
};

export default ConsultaInteracoes;
