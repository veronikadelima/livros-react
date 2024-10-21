import React, { useState, useEffect } from 'react';
import { ControleLivros } from './controle/ControleLivros';
import { ControleEditora } from './controle/ControleEditora';

// Instanciar controladores
const controleLivro = new ControleLivros();
const controleEditora = new ControleEditora();

const LivroLista = () => {
    // Definir estado para livros e carregado
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);

    // useEffect para carregar os livros quando "carregado" mudar
    useEffect(() => {
        if (!carregado) {
            setLivros(controleLivro.getLivros());
            setCarregado(true);
        }
    }, [carregado]);

    // Função para excluir livro
    const excluir = (codigo) => {
        controleLivro.excluir(codigo);
        setCarregado(false); // Força o recarregamento dos livros
    };

    // Função auxiliar para criar as linhas de tabela
    const LinhaLivro = (props) => {
        const { livro, excluir } = props;
        const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

        return (
            <tr>
                <td>{livro.titulo}</td>
                <td>{nomeEditora}</td>
                <td>{livro.resumo}</td>
                <td>
                    <ul>
                        {livro.autores.map((autor, index) => (
                            <li key={index}>{autor}</li>
                        ))}
                    </ul>
                </td>
                <td>
                    <button className="btn btn-danger" onClick={() => excluir(livro.codigo)}>
                        Excluir
                    </button>
                </td>
            </tr>
        );
    };

    // Retornar a tabela de livros
    return (
        <main className="container">
            <h1>Lista de Livros</h1>
            <table className="table table-secondary table-striped">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Editora</th>
                        <th>Resumo</th>
                        <th>Autores</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro) => (
                        <LinhaLivro
                            key={livro.codigo}
                            livro={livro}
                            excluir={excluir}
                        />
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default LivroLista;