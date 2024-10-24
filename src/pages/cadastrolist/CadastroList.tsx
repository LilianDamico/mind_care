import React, { useState, useEffect } from 'react';
import './CadastroList.css'
import axios from 'axios';

interface Cadastro {
    id?: number;
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

const CadastroList: React.FC = () => {
    const [cadastros, setCadastros] = useState<Cadastro[]>([]);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [alertType, setAlertType] = useState<string>(''); // 'success' ou 'error'
    
    const apiUrl = 'http://localhost:8081/cadastros'; // URL da API

    useEffect(() => {
        fetchCadastros();
    }, []);

    const fetchCadastros = async () => {
        try {
            const response = await axios.get(apiUrl);
            setCadastros(response.data.cadastros);
        } catch (error) {
            setAlertMessage('Erro ao buscar cadastros.');
            setAlertType('error');
        }
    };

    const handleUpdate = async (id: number) => {
        try {
            // Adicione a lógica para atualizar o cadastro se necessário
            setAlertMessage('Cadastro atualizado com sucesso!');
            setAlertType('success');
            fetchCadastros();
        } catch (error) {
            setAlertMessage('Erro ao atualizar. Tente novamente.');
            setAlertType('error');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${apiUrl}/${id}`);
            setAlertMessage('Cadastro deletado com sucesso!');
            setAlertType('success');
            fetchCadastros();
        } catch (error) {
            setAlertMessage('Erro ao deletar. Tente novamente.');
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
            <h2>Cadastros</h2>
            <ul>
                {cadastros.map(cadastro => (
                    <li key={cadastro.id} className="cadastro-item">
                        <div className="cadastro-info">
                            
                            <span className="cadastro-nome">{cadastro.nome}</span>
                            <span className="cadastro-cpf">CPF: {cadastro.cpf}</span>
                            <span className="cadastro-email">Email: {cadastro.email}</span>
                        </div>
                        <div className="cadastro-actions">
                            <button onClick={() => handleUpdate(cadastro.id!)}>Atualizar</button>
                            <button onClick={() => handleDelete(cadastro.id!)}>Deletar</button>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default CadastroList;
