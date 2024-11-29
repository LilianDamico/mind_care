import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createUser, updateUser, deleteUser } from '../../services/usersService';
import './CadastroForm.css';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../navbar/Navbar';

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

const userSchema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório.'),
  cpf: yup
    .string()
    .matches(/^\d{11}$/, 'O CPF deve conter exatamente 11 dígitos.')
    .required('O CPF é obrigatório.'),
  email: yup.string().email('Formato de e-mail inválido.').required('O e-mail é obrigatório.'),
  senha: yup.string().min(8, 'A senha deve ter no mínimo 8 caracteres.').optional(),
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

const CadastroForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormInputs>({
    resolver: yupResolver(userSchema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<UserFormInputs> = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
  
      const response = await createUser(formData);
      alert(response.message || 'Usuário cadastrado com sucesso!');
      navigate('/userslist');
    } catch (error: any) {
      alert(error.response?.data?.details || 'Erro inesperado ao cadastrar o usuário.');
    }
  };
  
  const handleUpdate: SubmitHandler<UserFormInputs> = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
  
      const response = await updateUser(data.cpf, formData);
      alert(response.message || 'Usuário atualizado com sucesso!');
      navigate('/userslist');
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
        navigate('/userslist');
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
          {[
            { id: 'nome', label: 'Nome', type: 'text' },
            { id: 'cpf', label: 'CPF', type: 'text' },
            { id: 'email', label: 'E-mail', type: 'email' },
            { id: 'senha', label: 'Senha', type: 'password' },
            { id: 'registro', label: 'Registro', type: 'text' },
            { id: 'endereco', label: 'Endereço', type: 'text' },
            { id: 'telefone', label: 'Telefone', type: 'tel' },
            { id: 'profissao', label: 'Profissão', type: 'text' },
            { id: 'especialidade', label: 'Especialidade', type: 'text' },
          ].map(({ id, label, type }) => (
            <div key={id} className="form-group">
              <label htmlFor={id}>{label}</label>
              <input type={type} id={id} {...register(id as keyof UserFormInputs)} />
              {errors[id as keyof UserFormInputs] && (
                <span className="error">{errors[id as keyof UserFormInputs]?.message}</span>
              )}
            </div>
          ))}

          <div className="form-group">
            <label htmlFor="comentarios">Comentários</label>
            <textarea id="comentarios" {...register('comentarios')} />
          </div>
        </form>

        <div className="button-box">
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
