import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ControleLivros } from './controle/ControleLivros';
import { ControleEditora } from './controle/ControleEditora';

//Instanciar controladores de livros e editoras
const controleLivro = new ControleLivros();
const controleEditora = new ControleEditora();

const LivroDados = () => {
    //Definir vetor de opções, invocando getEditoras
    const opcoes = controleEditora.getEditoras().map(editora => ({
        value: editora.codEditora,
        text: editora.nome
    }));

    //Definir propriedades com useState
    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState(opcoes[0].value);

    //Atributo navigate recebendo useNavigate
    const navigate = useNavigate();

    //Método tratarCombo para definir a editora selecionada
    const tratarCombo = (evento) => {
        setCodEditora(Number(evento.target.value));
    };

    //Método incluir, que lida com o envio do formulário
    const incluir = (evento) => {
        evento.preventDefault(); // Impedir comportamento padrão do formulário

        // Instanciar novo livro
        const novoLivro = {
            codigo: 0, // código zero para um novo livro
            codEditora,
            titulo,
            resumo,
            autores: autores.split('\n') // Separar autores por linha
        };

        // Incluir o novo livro usando o controlador
        controleLivro.incluir(novoLivro);

        // Navegar para a página de listagem de livros
        navigate('/');
    };

    // Retornar o formulário para inclusão do livro
    return (
        <main className="container">
            <h1>Adicionar Livro</h1>
            <form onSubmit={incluir}>
                <div className="mb-3">
                    <label className="form-label">Título</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={titulo} 
                        onChange={(e) => setTitulo(e.target.value)} 
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Resumo</label>
                    <textarea 
                        className="form-control" 
                        rows="3"
                        value={resumo}
                        onChange={(e) => setResumo(e.target.value)} 
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Autores (um por linha)</label>
                    <textarea 
                        className="form-control"
                        rows="3"
                        value={autores}
                        onChange={(e) => setAutores(e.target.value)} 
                        required
                    />
                </div>
                {/* Combo box para seleção de editora */}
                <div className="mb-3">
                    <label className="form-label">Editora</label>
                    <select 
                        className="form-select" 
                        value={codEditora} 
                        onChange={tratarCombo}
                    >
                        {opcoes.map(editora => (
                            <option key={editora.value} value={editora.value}>
                                {editora.text}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Botão de submissão */}
                <button type="submit" className="btn btn-primary">Incluir</button>
            </form>
        </main>
    );
};

export default LivroDados;

