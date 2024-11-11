import React, { useState } from 'react';
import { createUser } from '../../services/usersService'; 
import './CadastroForm.css';

interface CadastroFormProps {
  onCadastroSuccess: () => void; 
}

const CadastroForm: React.FC<CadastroFormProps> = ({ onCadastroSuccess }) => {
  // Estados para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    endereco: '',
    telefone: '',
    profissao: '',
    especialidade: '',
    registro: '',
    comentarios: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createUser(formData);
      setSuccessMessage('Usuário criado com sucesso!');
      setErrorMessage('');
      console.log('Usuário criado:', response);
      onCadastroSuccess(); 
    } catch (error) {
      setErrorMessage('Erro ao criar o usuário.');
      setSuccessMessage('');
      console.error(error);
    }
  };

  return (
    <div className="cadastro-form">
      <h2>Cadastro de Usuário</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>CPF:</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleInputChange}
            required
            maxLength={11}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleInputChange}
            required
            minLength={6}
          />
        </div>
        <div className="form-group">
          <label>Endereço:</label>
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Telefone:</label>
          <input
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Profissão:</label>
          <input
            type="text"
            name="profissao"
            value={formData.profissao}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Especialidade:</label>
          <input
            type="text"
            name="especialidade"
            value={formData.especialidade}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Registro:</label>
          <input
            type="text"
            name="registro"
            value={formData.registro}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Comentários:</label>
          <textarea
            name="comentarios"
            value={formData.comentarios}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroForm;
