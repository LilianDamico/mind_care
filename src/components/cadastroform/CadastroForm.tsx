import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createUser } from '../../services/usersService'; // Importe o serviço
import './CadastroForm.css';
import { Navbar } from '../navbar/Navbar';

// Definição da interface para os inputs do formulário
interface UserFormInputs {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  registro: string;
  endereco: string;
  telefone: string;
  profissao: string;
  especialidade: string;
  comentarios?: string;
}

// Definição da interface para as props do CadastroForm, incluindo a função onCadastroSuccess
interface CadastroFormProps {
  onCadastroSuccess: () => void;
}

// Esquema de validação usando Yup
const userSchema = yup.object({
  nome: yup.string().required('O nome é obrigatório.'),
  cpf: yup
    .string()
    .length(11, 'O CPF deve conter exatamente 11 caracteres.')
    .required('O CPF é obrigatório.'),
  email: yup.string().email('E-mail inválido.').required('O e-mail é obrigatório.'),
  senha: yup
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres.')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, 'A senha deve conter letras e números.')
    .required('A senha é obrigatória.'),
  registro: yup.string().required('O registro é obrigatório.'),
  endereco: yup.string().required('O endereço é obrigatório.'),
  telefone: yup
    .string()
    .length(11, 'O telefone deve conter exatamente 11 caracteres.')
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

  // Função chamada ao submeter o formulário
  const onSubmit: SubmitHandler<UserFormInputs> = async (data) => {
    try {
      const response = await createUser(data); // Usando o serviço usersService para criar o usuário
      alert(response.message || 'Usuário cadastrado com sucesso!');
      onCadastroSuccess(); // Chama a função onCadastroSuccess após o cadastro
    } catch (error: any) {
      console.error('Erro ao enviar formulário:', error.message);
      alert(error.response?.data?.message || 'Erro ao cadastrar o usuário.');
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit(onSubmit)} className="cadastro-form">
        <div>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" {...register('nome')} />
          {errors.nome && <span className="error">{errors.nome.message}</span>}
        </div>

        <div>
          <label htmlFor="cpf">CPF:</label>
          <input type="text" id="cpf" {...register('cpf')} />
          {errors.cpf && <span className="error">{errors.cpf.message}</span>}
        </div>

        <div>
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" {...register('email')} />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div>
          <label htmlFor="senha">Senha:</label>
          <input type="password" id="senha" {...register('senha')} />
          {errors.senha && <span className="error">{errors.senha.message}</span>}
        </div>

        <div>
          <label htmlFor="registro">Registro:</label>
          <input type="text" id="registro" {...register('registro')} />
          {errors.registro && <span className="error">{errors.registro.message}</span>}
        </div>

        <div>
          <label htmlFor="endereco">Endereço:</label>
          <input type="text" id="endereco" {...register('endereco')} />
          {errors.endereco && <span className="error">{errors.endereco.message}</span>}
        </div>

        <div>
          <label htmlFor="telefone">Telefone:</label>
          <input type="text" id="telefone" {...register('telefone')} />
          {errors.telefone && <span className="error">{errors.telefone.message}</span>}
        </div>

        <div>
          <label htmlFor="profissao">Profissão:</label>
          <input type="text" id="profissao" {...register('profissao')} />
          {errors.profissao && <span className="error">{errors.profissao.message}</span>}
        </div>

        <div>
          <label htmlFor="especialidade">Especialidade:</label>
          <input type="text" id="especialidade" {...register('especialidade')} />
          {errors.especialidade && <span className="error">{errors.especialidade.message}</span>}
        </div>

        <div>
          <label htmlFor="comentarios">Comentários:</label>
          <textarea id="comentarios" {...register('comentarios')} />
          {errors.comentarios && <span className="error">{errors.comentarios.message}</span>}
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroForm;