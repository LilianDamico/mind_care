import React, { useState } from 'react';
import axios from 'axios';
import './cadastroForm.css'

interface Cadastro {
    nome: string;
    cpf: string;
    email: string;
    registro: string;
    endereco?: string;
    telefone?: string;
    profissao?: string;
    especialidade?: string;
    senha: string;
    comentarios?: string;
}

interface CadastroFormProps {
    onCadastroSuccess: () => void;
}

const CadastroForm: React.FC<CadastroFormProps> = ({ onCadastroSuccess }) => {
    const [formData, setFormData] = useState<Cadastro>({
        nome: '',
        cpf: '',
        email: '',
        registro: '',
        endereco: '',
        telefone: '',
        profissao: '',
        especialidade: '',
        senha: '',
        comentarios: ''
    });

    const [alertMessage, setAlertMessage] = useState<string>('');
    const [alertType, setAlertType] = useState<string>(''); // 'success' ou 'error'
    
    const apiUrl = 'https://vercel.com/liliandamicos-projects/api-node'; // URL da API

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post(apiUrl, formData);
            setAlertMessage('Cadastro realizado com sucesso!');
            setAlertType('success');
            setFormData({
                nome: '',
                cpf: '',
                email: '',
                registro: '',
                endereco: '',
                telefone: '',
                profissao: '',
                especialidade: '',
                senha: '',
                comentarios: ''
            }); // Limpa o formulário
            onCadastroSuccess(); // Notifica o componente pai para atualizar a lista
        } catch (error) {
            setAlertMessage(error.response?.data?.errors?.[0]?.msg || 'Erro ao cadastrar. Tente novamente.');
            setAlertType('error');
        }
    };

    return (
        <div>
            {alertMessage && (
                <div className={`alert ${alertType === 'error' ? 'alert-danger' : 'alert-success'}`}>
                    {alertMessage}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required />
                <input type="text" name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} required />
                <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} required />
                <input type="text" name="registro" placeholder="Registro" value={formData.registro} onChange={handleChange} required />
                <input type="text" name="endereco" placeholder="Endereço" value={formData.endereco} onChange={handleChange} />
                <input type="text" name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} />
                <input type="text" name="profissao" placeholder="Profissão" value={formData.profissao} onChange={handleChange} />
                <input type="text" name="especialidade" placeholder="Especialidade" value={formData.especialidade} onChange={handleChange} />
                <input type="password" name="senha" placeholder="Senha" value={formData.senha} onChange={handleChange} required />
                <textarea name="comentarios" placeholder="Comentários" value={formData.comentarios} onChange={handleChange}></textarea>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default CadastroForm;
