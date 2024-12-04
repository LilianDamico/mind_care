import React, { useState } from 'react';
import './CadastroForm.css';
import { Navbar } from '../navbar/Navbar';

const CadastroForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    registro: '',
    endereco: '',
    telefone: '',
    profissao: '',
    especialidade: '',
    comentarios: '',
  });

  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clearMessage = () => {
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await fetch('https://api-node-lr3u.onrender.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Usuário cadastrado com sucesso!' });
        setFormData({
          nome: '',
          cpf: '',
          email: '',
          senha: '',
          registro: '',
          endereco: '',
          telefone: '',
          profissao: '',
          especialidade: '',
          comentarios: '',
        });
      } else {
        setMessage({ type: 'error', text: result.message || 'Erro ao cadastrar usuário.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao conectar ao servidor. Tente novamente mais tarde.' });
    } finally {
      clearMessage();
    }
  };

  const handleUpdate = async () => {
    if (!formData.cpf) {
      setMessage({ type: 'error', text: 'CPF é obrigatório para atualizar.' });
      return;
    }

    try {
      const response = await fetch(`https://api-node-lr3u.onrender.com/users/${formData.cpf}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Usuário atualizado com sucesso!' });
      } else {
        setMessage({ type: 'error', text: result.message || 'Erro ao atualizar usuário.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao conectar ao servidor. Tente novamente mais tarde.' });
    } finally {
      clearMessage();
    }
  };

  const handleDelete = async () => {
    if (!formData.cpf) {
      setMessage({ type: 'error', text: 'CPF é obrigatório para excluir.' });
      return;
    }

    try {
      const response = await fetch(`https://api-node-lr3u.onrender.com/users/${formData.cpf}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Usuário excluído com sucesso!' });
        setFormData({
          nome: '',
          cpf: '',
          email: '',
          senha: '',
          registro: '',
          endereco: '',
          telefone: '',
          profissao: '',
          especialidade: '',
          comentarios: '',
        });
      } else {
        const result = await response.json();
        setMessage({ type: 'error', text: result.message || 'Erro ao excluir usuário.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao conectar ao servidor. Tente novamente mais tarde.' });
    } finally {
      clearMessage();
    }
  };

  return (
    <div className="cadastro-container">
      <Navbar />
      <h2>Cadastro de Usuário</h2>
      <div className="grid-container">
        <form className="cadastro-form" onSubmit={handleSubmit}>
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
            />
          </div>
          <div className="form-group">
            <label>Registro:</label>
            <input
              type="text"
              name="registro"
              value={formData.registro}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Endereço:</label>
            <input
              type="text"
              name="endereco"
              value={formData.endereco}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Telefone:</label>
            <input
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Profissão:</label>
            <input
              type="text"
              name="profissao"
              value={formData.profissao}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Especialidade:</label>
            <input
              type="text"
              name="especialidade"
              value={formData.especialidade}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Comentários:</label>
            <textarea
              name="comentarios"
              value={formData.comentarios}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </form>

        <div className="button-box">
          <button className="submit-button" type="button" onClick={handleSubmit}>
            Cadastrar
          </button>
          <button className="update-button" type="button" onClick={handleUpdate}>
            Atualizar
          </button>
          <button className="delete-button" type="button" onClick={handleDelete}>
            Excluir
          </button>
          {message && (
            <div className="cadastro-message">
              <p className={message.type === 'success' ? 'success-message' : 'error-message'}>
                {message.text}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CadastroForm;
