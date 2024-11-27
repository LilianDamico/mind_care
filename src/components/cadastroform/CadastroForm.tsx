import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createUser, updateUser, deleteUser } from '../../services/usersService';
import './CadastroForm.css';
import { Navbar } from '../navbar/Navbar';

// Interface para os inputs do formulário
interface UserFormInputs {
  nome: string;
  cpf: string;
  email: string;
  senha?: string;
  registro: string;
  endereco: string;
  telefone: string;
  profissao: string;
  especialidade: string;
  comentarios?: string;
}

// Interface para as props do componente CadastroForm
interface CadastroFormProps {
  onCadastroSuccess: () => void; // Função chamada após o cadastro ser bem-sucedido
}

// Esquema de validação com Yup
const userSchema = yup.object({
  nome: yup.string().required('O nome é obrigatório.'),
  cpf: yup
    .string()
    .matches(/^\d{11}$/, 'O CPF deve conter exatamente 11 dígitos.')
    .required('O CPF é obrigatório.'),
  email: yup.string().email('Formato de e-mail inválido.').required('O e-mail é obrigatório.'),
  senha: yup
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres.')
    .optional(),
  registro: yup.string().required('O registro é obrigatório.'),
  endereco: yup.string().required('O endereço é obrigatório.'),
  telefone: yup
    .string()
    .matches(/^\d{11}$/, 'O telefone deve conter exatamente 11 dígitos.')
    .required('O telefone é obrigatório.'),
  profissao: yup.string().required('A profissão é obrigatória.'),
  especialidade: yup.string().required('A especialidade é obrigatória.'),
  comentarios: yup.string().optional(),
});

const CadastroForm: React.FC<CadastroFormProps> = ({ onCadastroSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormInputs>({
    resolver: yupResolver(userSchema),
  });

  const onSubmit: SubmitHandler<UserFormInputs> = async (data) => {
    try {
      const response = await createUser(data);
      alert(response.message || 'Usuário cadastrado com sucesso!');
      onCadastroSuccess();
    } catch (error: any) {
      if (error.response?.data?.details) {
        alert(`Erro: ${error.response.data.details.join(', ')}`);
      } else {
        alert('Erro inesperado ao cadastrar o usuário.');
      }
    }
  };

  const handleUpdate = async (data: UserFormInputs) => {
    try {
      const response = await updateUser(data.cpf, data);
      alert(response.message || 'Usuário atualizado com sucesso!');
    } catch (error: any) {
      alert('Erro ao atualizar o usuário.');
    }
  };

  const handleDelete = async () => {
    const cpf = window.prompt('Digite o CPF do usuário a ser excluído:');
    if (cpf) {
      try {
        const response = await deleteUser(cpf);
        alert(response.message || 'Usuário excluído com sucesso!');
      } catch (error: any) {
        alert('Erro ao excluir o usuário.');
      }
    }
  };

  return (
    <div className="cadastro-container">
      <Navbar />
      <div className="grid-container">
        <form onSubmit={handleSubmit(onSubmit)} className="cadastro-form">
          <h2>Cadastro de Usuários</h2>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input type="text" id="nome" {...register('nome')} />
            {errors.nome && <span className="error">{errors.nome.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input type="text" id="cpf" {...register('cpf')} />
            {errors.cpf && <span className="error">{errors.cpf.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" {...register('email')} />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input type="password" id="senha" {...register('senha')} />
            {errors.senha && <span className="error">{errors.senha.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="registro">Registro</label>
            <input type="text" id="registro" {...register('registro')} />
            {errors.registro && <span className="error">{errors.registro.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="endereco">Endereço</label>
            <input type="text" id="endereco" {...register('endereco')} />
            {errors.endereco && <span className="error">{errors.endereco.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input type="text" id="telefone" {...register('telefone')} />
            {errors.telefone && <span className="error">{errors.telefone.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="profissao">Profissão</label>
            <input type="text" id="profissao" {...register('profissao')} />
            {errors.profissao && <span className="error">{errors.profissao.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="especialidade">Especialidade</label>
            <input type="text" id="especialidade" {...register('especialidade')} />
            {errors.especialidade && <span className="error">{errors.especialidade.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="comentarios">Comentários</label>
            <textarea id="comentarios" {...register('comentarios')} />
          </div>
        </form>

        <div className="button-group">
          <button type="submit" className="submit-button" onClick={handleSubmit(onSubmit)}>
            Cadastrar
          </button>
          <button type="button" className="update-button" onClick={handleSubmit(handleUpdate)}>
            Atualizar
          </button>
          <button type="button" className="delete-button" onClick={handleDelete}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default CadastroForm;
