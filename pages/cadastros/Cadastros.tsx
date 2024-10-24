import React from 'react';
import CadastroForm from '../../components/cadastroform/CadastroForm.tsx';
import CadastroList from '../cadastrolist/CadastroList.tsx';
import Menu from '../../components/menu/Menu.tsx';

const Cadastros: React.FC = () => {
    const handleCadastroSuccess = () => {
        // Aqui você pode, por exemplo, atualizar a lista de cadastros
        console.log('Cadastro realizado com sucesso!');
    };

    return (
        <div>
            <Menu />
            <CadastroForm onCadastroSuccess={handleCadastroSuccess} />
            <CadastroList />
        </div>
    );
};

export default Cadastros;
