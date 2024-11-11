import React, { useState } from 'react';
import { createUser } from '../../services/usersService'; // Certifique-se de que o caminho está correto
import './CadastroForm.css';

const CadastroForm = ({ onCadastroSuccess }: { onCadastroSuccess: () => void }) => {
  // Definindo os estados para armazenar os valores do formulário
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [profissao, setProfissao] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [registro, setRegistro] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [error, setError] = useState('');

  // Função para enviar os dados do formulário
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validação simples para garantir que os campos obrigatórios estão preenchidos
    if (!nome || !cpf || !email || !senha || !telefone || !profissao) {
      setError('Todos os campos obrigatórios devem ser preenchidos');
      return;
    }

    try {
      // Criar o usuário chamando o serviço
      const userData = {
        nome,
        cpf,
        email,
        senha,
        endereco,
        telefone,
        profissao,
        especialidade,
        registro,
        comentarios,
      };

      // Envia os dados para a API
      const response = await createUser(userData);

      if (response.error) {
        setError(response.message); // Exibe a mensagem de erro
      } else {
        onCadastroSuccess(); // Chama o callback após o sucesso
      }
    } catch (err) {
      console.error('Erro ao cadastrar usuário:', err);
      setError('Ocorreu um erro ao criar o usuário. Tente novamente.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Cadastro de Usuário</h1>
        {error && <p className="error-message">{error}</p>}
        {/* Campos do Formulário */}
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            maxLength={11}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endereco">Endereço:</label>
          <input
            type="text"
            id="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="text"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            maxLength={11}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="profissao">Profissão:</label>
          <input
            type="text"
            id="profissao"
            value={profissao}
            onChange={(e) => setProfissao(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="especialidade">Especialidade:</label>
          <input
            type="text"
            id="especialidade"
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="registro">Registro:</label>
          <input
            type="text"
            id="registro"
            value={registro}
            onChange={(e) => setRegistro(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="comentarios">Comentários:</label>
          <textarea
            id="comentarios"
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroForm;
